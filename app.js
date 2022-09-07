//jshint esversion:6

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Kindly add name"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  rating: 7,
  review: "Good"
});

// const fruit = new Fruit({
//   name: "Apple",
//   rating: 7,
//   review: "Good"
// });

// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "John",
  age: 37,
});

// const pineapple = new Fruit({
//   name: "Pineapple",
//   score: 9,
//   review: "Great Fruit"
// });

const mango = new Fruit({
  name: "Mango",
  score: 9,
  review: "Great Fruit"
});

// mango.save();

// const person = new Person({
//   name: "Amy",
//   age: 12,
//   favouriteFruit: pineapple
// });

person.save();

Person.updateOne({name: "John"},{favouriteFruit: mango},function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully updated the document");
  }
});

// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 8,
//   review: "Good"
// });

// const orange = new Fruit({
//   name: "Orange",
//   rating: 7,
//   review: "Sour"
// });

// const banana = new Fruit({
//   name: "Banana",
//   rating: 8,
//   review: "Good"
// });

// Fruit.insertMany([kiwi,orange,banana],function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully inserted the fruits in fruitsDB");
//   }
// });

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }else{
    // console.log(fruits);
    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});

// Fruit.updateOne({_id:"62c16ef21e99c214dbbefabd"},{name: "Peach"},function (err) {
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully updated");
//   }
// });

// Fruit.deleteOne({name: "Peach"},function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully deleted");
//   }
// });

Person.deleteMany({name: "John"},function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully deleted");
  }
});