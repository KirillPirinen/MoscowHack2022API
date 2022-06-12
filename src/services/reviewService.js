const { Users, Reviews } = require('../../db/models')
const ApiError = require('../errors/apiError')

const calculateRating = (prevTimes, prevAvg, newScore, prevScore) => {
  const currentSum = prevTimes * prevAvg

  if(prevScore) {
    return (currentSum + (newScore - prevScore)) / prevTimes
  }

  return (currentSum + newScore) / (prevTimes + 1)
}

module.exports = class ReviewsService {

  static add = async (receiver_id, user_id, score, review) => {
    
    if(await Reviews.findOne({ where: { receiver_id, user_id }})) {
      throw new ApiError.BadRequest(403, 'Отзыв можно оставить только один раз, но вы можете скорректировать ранее оставленный либо удалить его')
    }

    return await sequelize.transaction(async (t) => {

      const receiver = await Users.findByPk(receiver_id)

      const newReview = receiver.createReceiver({ score, review, user_id }, { transaction: t })

      receiver.rating = calculateRating(receiver.rated_times, receiver.rating, score)
      receiver.rated_times++
      await receiver.save({ transaction: t })

      return await newReview

    })
  } 

  static update = async (props, reviewInstance) => {

    return await sequelize.transaction(async (t) => {

      if(props.score && reviewInstance.score !== props.score) {
        const receiver = await reviewInstance.getReciever({ transaction: t })
        receiver.rating = calculateRating(receiver.rated_times, receiver.rating, props.score, reviewInstance.score)
        receiver.save({ transaction: t })
      }

      return await reviewInstance.update(props, { transaction: t })

    })
  } 
  
}
