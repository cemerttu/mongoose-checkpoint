const mongoose = require("mongoose");

// Define the schema for Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // required field
  age: { type: Number },
  favoriteFoods: [String], // array of strings
});

// Create model
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
