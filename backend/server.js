import mongoose from "mongoose";
import Person from "./models/personModel";

const connect = async function () {
  try {
    const connectoDB = await mongoose.connect(process.env.DB_URL);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// connect();

// Create and Save a Record of a Model
const createAndSavePerson = (name, age, favoriteFoods) => {
  const person = new Person({ name, age, favoriteFoods });
  person.save((err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
};

// Create Many Records with model.create()
const createManyPeople = (arrayOfPeople) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
};

// Use model.find() to Search Your Database
const findPeopleByName = (name) => {
  Person.find({ name }, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
};

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
};

// Use model.findById() to Search Your Database By _id
const findPersonById = (personId) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) {
      console.error(err);
    } else {
      person.favoriteFoods.push("hamburger");
      person.save((err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(data);
        }
      });
    }
  });
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
      }
    }
  );
};

// Delete One Document Using model.findByIdAndRemove
const deleteOnePerson = (personId) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
};

// Delete Many Documents with model.remove()
const deleteManyPeople = (name) => {
  Person.remove({ name }, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
};

// Chain Search Query Helpers to Narrow Search Results
const queryPeople = () => {
  Person.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
      }
    });
};
