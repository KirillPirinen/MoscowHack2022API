const ApiError = require("../errors/apiError")
const ReviewsService = require("../services/reviewService")
const checkValidationErrors = require("../utils/helpers/checkValidationErrors")
const methodsWrapper = require("../utils/helpers/methodsWrapper")
const ReviewDTO = require('../dtos/reviewDto')

class ReviewController {

  getAllByRoleId = async (req, res) => {
    checkValidationErrors(req)

    let where = {}

    const { receiver_id, user_id } = req.params

    if(reciver_id) where.receiver_id = receiver_id
    else where.user_id = user_id

    const reviews = await Reviews.findAll({ where, include: 'Reviewer' })

    const parsedReviews = reviews.map(review => new ReviewDTO(review))

    res.json(parsedReviews)
  }

  add = async (req, res) => {
    checkValidationErrors(req)
    const { score, review } = req.body

    if(req.params.receiver === req.user.id) throw ApiError.BadRequest('Нельзя поставить оценку самому себе')

    const newRating = await ReviewsService.newScore(
      req.params.receiver_id, req.user.id, score, review
    )

    res.json(newRating)
  }

  update = async (req, res) => {
    await ReviewsService.update(req.body, res.locals.Reviews)
    return res.sendStatus(200)
  }

  delete = async (req, res) => {
    await res.locals.Reviews.destroy()
    return res.sendStatus(200)
  }
}

module.exports = methodsWrapper(new ReviewController())
