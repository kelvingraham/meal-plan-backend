const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nutrition: [String]
})

module.exports = mongoose.model('Ingredient', ingredientSchema)
