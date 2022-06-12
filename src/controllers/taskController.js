const {
  Tasks,
  Tokens,
  Users,
  Skills,
  Tags,
  TasksTags,
  TasksSkills,
  UserTasks,
  Categories,
  Comments,
  Sequelize: { Op },
  sequelize
} = require('../../db/models');
const methodsWrapper = require('../utils/helpers/methodsWrapper');
const SearchService = require('../services/searchService');
const TaskDto = require('../dtos/tasksDto');
const checkValidationErrors = require('../utils/helpers/checkValidationErrors');

class TaskController {

  getTasks = async (req, res) => {
    const { id } = req.params

    const include = req.include?.concat([{ model: Users, as: 'Creator' }]) || { model: Users, as: 'Creator' }

    if(id) {
      const rawEvent = await Tasks.findOne({include:[
        ...include,
        { model: Comments, include: { model: Users } }
      ], where: { id }})
      const parsedEvent = new TaskDto(rawEvent)
      return res.json(parsedEvent)
    }

    const rawEvents = await Tasks.findAll({...req.searchParams, include })
    const parsedEvents = rawEvents.map(event => new TaskDto(event))
    return res.json(parsedEvents)
  }

  findTasksByQuery = async (req, res) => {
    checkValidationErrors(req);
    const tasks = await SearchService.findTasksByString(req.query.text || '');
    res.json(tasks.map((task) => new TaskDto(task)));
  };

  sendCategories = async (req, res) => {
    const categories = await Categories.findAll();
    const dataToFront = categories.map((el) => ({
      value: el.id,
      item: el.text,
    }));
    res.json(dataToFront);
  };

  getAllTasksByCategory = async (req, res) => {
    checkValidationErrors(req)
    const { CategoryId } = req.params
    const rawTasks = await Tasks.findAll({...req.searchParams, include:{ model: Users, as: 'Creator' }, where: {
      CategoryId
    } })
    return res.json(rawTasks.map(task => new TaskDto(task)))
  };

  getAllUserTasks = async (req, res) => {
    const UserId = 1;
    const allTasks = await Tasks.findAll({
      where: { UserId },
      include: [{ model: Tags }, { model: Skills }],
    });
    res.json(allTasks);
  };

  createNewTask = async (req, res) => {
    const { title, description, CategoryId, tags, skills, deadline } = req.body;
    const t = await sequelize.transaction();
    try {
      const image = req?.file?.filename || ''
      const UserId = req.user.id;
      const newTask = await Tasks.create(
        {
          title,
          description,
          deadline,
          UserId,
          CategoryId,
          responses: 0,
          status: 'Search',
          image
        },
        { transaction: t }
      );
      if (tags) {
        const tagToCreate = tags.map((el) => ({
          id: el.replace(/\s/g, ''),
          tag: el,
        }));
        const newTags = await Tags.bulkCreate(
          tagToCreate,
          { ignoreDuplicates: true },
          { returning: true },
          { transaction: t }
        );
        const tagTaskRelaition = newTags.map((el) => ({
          TaskId: newTask.id,
          tag_id: el.id,
        }));
        await TasksTags.bulkCreate(tagTaskRelaition, { transaction: t });
      }
      if (skills) {
        const skillToCreate = skills.map((el) => ({
          id: el.replace(/\s/g, ''),
          skill: el,
        }));
        const newSkills = await Skills.bulkCreate(
          skillToCreate,
          { ignoreDuplicates: true },
          { returning: true },
          { transaction: t }
        );
        const skillTaskRelaition = newSkills.map((el) => ({
          TaskId: newTask.id,
          skill_id: el.id,
        }));
        await TasksSkills.bulkCreate(skillTaskRelaition, { transaction: t });
      }
      await UserTasks.create(
        {
          UserId,
          TaskId: newTask.id,
        },
        { transaction: t }
      );

      await t.commit();

      const user = await Users.findOne({where: { id: UserId}})

      const taskInstance = await Tasks.findOne({
        where: { id: newTask.id },
        include: [{ model: Tags }, { model: Skills }],
      });

      taskInstance.Creator = user
      taskInstance.location = 'Москва'

      const taskToFront = new TaskDto(taskInstance)

      res.json(taskToFront);
    } catch (error) {
      console.log(error);
      res.json(error)
      await t.rollback();
    }
  };
}

module.exports = methodsWrapper(new TaskController());
