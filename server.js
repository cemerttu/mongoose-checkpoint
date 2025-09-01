require("dotenv").config();
const mongoose = require("mongoose");
const Person = require("./models/person");

// ---------------------
// Check if .env is loading correctly
// ---------------------
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI not found in .env file");
  process.exit(1);
}
console.log("🔑 MONGO_URI loaded:", process.env.MONGO_URI);

// 1️⃣ Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ---------------------
// 2️⃣ Create and Save a Person
// ---------------------
const createAndSavePerson = async () => {
  try {
    const person = new Person({
      name: "John Doe",
      age: 25,
      favoriteFoods: ["Pizza", "Pasta"],
    });

    const data = await person.save();
    console.log("Saved person:", data);
  } catch (err) {
    console.error(err);
  }
};

// ---------------------
// 3️⃣ Create Many People
// ---------------------
const createManyPeople = async (arrayOfPeople) => {
  try {
    const people = await Person.create(arrayOfPeople);
    console.log("People created:", people);
  } catch (err) {
    console.error(err);
  }
};

// ---------------------
// 4️⃣ Find people by name
// ---------------------
const findPeopleByName = async (personName) => {
  try {
    const data = await Person.find({ name: personName });
    console.log("People with name", personName, ":", data);
  } catch (err) {
    console.error(err);
  }
};

// ---------------------
// 5️⃣ Find one person by favorite food
// ---------------------
const findOneByFood = async (food) => {
  try {
    const data = await Person.findOne({ favoriteFoods: food });
    console.log("Person who likes", food, ":", data);
  } catch (err) {
    console.error(err);
  }
};

// ---------------------
// 6️⃣ Find person by ID
// ---------------------
const findPersonById = async (personId) => {
  try {
    const data = await Person.findById(personId);
    console.log("Found by ID:", data);
  } catch (err) {
    console.error(err);
  }
};

// ---------------------
// 7️⃣ Find, Edit, then Save
// ---------------------
const findEditThenSave = async (personId) => {
  try {
    const person = await Person.findById(personId);
    person.favoriteFoods.push("hamburger");
    const updatedPerson = await person.save();
    console.log("Updated person:", updatedPerson);
  } catch (err) {
    console.error(err);
  }
};

// ---------------------
// 8️⃣ Find one and update
// ---------------------
const findAndUpdate = async (personName) => {
  try {
    const updatedDoc = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    console.log("Updated doc:", updatedDoc);
  } catch (err) {
    console.error(err);
  }
};

// ---------------------
// 9️⃣ Delete one by ID
// ---------------------
const removeById = async (personId) => {
  try {
    const removedDoc = await Person.findByIdAndRemove(personId);
    console.log("Removed doc:", removedDoc);
  } catch (err) {
    console.error(err);
  }
};

// 🔟 Delete many
const removeManyPeople = async () => {
  try {
    const result = await Person.deleteMany({ name: "Mary" });
    console.log("Deleted all Marys:", result);
  } catch (err) {
    console.error(err);
  }
};

// 1️⃣1️⃣ Chain query helpers
const queryChain = async () => {
  try {
    const data = await Person.find({ favoriteFoods: "burritos" })
      .sort("name")
      .limit(2)
      .select("-age");
    console.log("Query chain result:", data);
  } catch (err) {
    console.error(err);
  }
};

// ---------------------
// Run functions for testing
// ---------------------
(async () => {
  await createAndSavePerson();
  await createManyPeople([
    { name: "Mary", age: 18, favoriteFoods: ["Burgers"] },
    { name: "Peter", age: 22, favoriteFoods: ["burritos", "Salad"] },
    { name: "Sarah", age: 30, favoriteFoods: ["burritos", "Fries"] },
  ]);

  // Uncomment one at a time to test:
  // await findPeopleByName("Mary");
  // await findOneByFood("burritos");
  // await findPersonById("PUT_VALID_ID_HERE");
  // await findEditThenSave("PUT_VALID_ID_HERE");
  // await findAndUpdate("John Doe");
  // await removeById("PUT_VALID_ID_HERE");
  // await removeManyPeople();
  // await queryChain();
})();
