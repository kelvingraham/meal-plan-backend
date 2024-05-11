const mongoose = require('mongoose')
const Ingredient = require('./recipe.js')

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  shared: {
    type: Enumerator,
    required: true
  },
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient',
    required: true
  }],
  steps: [{
    type: String,
    required: true
  }]
})

module.exports = mongoose.model('Recipe', recipeSchema)
