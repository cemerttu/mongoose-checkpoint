const mongoose = require('mongoose');

// Define the schema for a Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // name is required
  age: Number,
  favoriteFoods: [String], // array of strings
});

// Create the model from the schema
const Person = mongoose.model('Person', personSchema);

// Export the model
module.exports = Person;
