const mongoose = require('mongoose')
const Recipe = require('./recipe.js')
const User = require('./user.js')

const mealPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  }],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }]
})

module.exports = mongoose.model('Meal Plan', mealPlanSchema)
