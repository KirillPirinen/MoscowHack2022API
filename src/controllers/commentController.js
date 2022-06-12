const { Users, Comments } = require("../../db/models")
const CommentDTO = require("../dtos/commentDto")
const checkValidationErrors = require("../utils/helpers/checkValidationErrors")
const methodsWrapper = require("../utils/helpers/methodsWrapper")

class CommentController {

  getAllByTaskId = async (req, res) => {
    checkValidationErrors(req)

    const { task_id } = req.params

    const comments = await Comments.findAll({ where: { task_id }, include: { model: Users } })

    const parsedComments = comments.map(comment => new CommentDTO(comment))
    res.json(parsedComments)
  }

  add = async (req, res) => {
    checkValidationErrors(req)

    const { params: { task_id }, body: { comment }, user: { id: user_id }} = req

    const newComment = await Comments.create({ task_id, comment, user_id })
    res.json(new CommentDTO(newComment))
  }

  update = async (req, res) => {
    checkValidationErrors(req)

    res.locals.Comments.review = req.body.review
    await res.locals.Comments.save()

    return res.json(new CommentDTO(res.locals.Comments))
  }

  delete = async (req, res) => {
    await res.locals.Comments?.destroy()
    return res.sendStatus(200)
  }
}

module.exports = methodsWrapper(new CommentController())
