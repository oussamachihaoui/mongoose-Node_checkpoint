import mongoose from "mongoose";

const personSchema = mongoose.Schema({
  name: { type: String, require: true, length: 10 },
  age: { type: Number, require: true },
  favoriteFoods: [
    {
      type: String,
    },
  ],
});

const Person = mongoose.model("Person", personSchema);

export default Person;
