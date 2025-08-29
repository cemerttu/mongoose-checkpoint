// myApp.js
// Import mongoose
const mongoose = require('mongoose');

// Load environment variables from .env
require('dotenv').config();

// Connect to MongoDB Atlas using MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// -------------------
// Person Schema
// -------------------
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create the Model
const Person = mongoose.model('Person', personSchema);

// -------------------
// Create and Save a Record of a Model
// -------------------
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["pizza", "pasta"]
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// -------------------
// Create Many Records with Model.create()
// -------------------
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

// -------------------
// Use Model.find() to Search Your Database
// -------------------
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

// -------------------
// Use Model.findOne()
// -------------------
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};

// -------------------
// Use Model.findById()
// -------------------
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};

// -------------------
// Perform Classic Updates
// -------------------
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

// -------------------
// Perform New Updates with findOneAndUpdate()
// -------------------
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    }
  );
};

// -------------------
// Delete One Document Using findByIdAndRemove
// -------------------
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    done(null, removedPerson);
  });
};

// -------------------
// Delete Many Documents with remove()
// -------------------
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return console.error(err);
    done(null, result);
  });
};

// -------------------
// Chain Search Query Helpers
// -------------------
const queryChain = (done) => {
  const foodToSearch = "burritos";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, people) => {
      if (err) return console.error(err);
      done(null, people);
    });
};

// Export all functions for FCC tests
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
