require('dotenv').config();

const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String]
  }
});
 

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({ name: 'Mark', age: 11, favoriteFoods: ['asd', 'sds']  })
  
  person.save(function(err, data) {
    if (err) console.log(err)
    done(null, data);
  })
};

let arrayOfPeople = [
  {name: 'Ace', age: 22, favoriteFoods: ['Meat', 'Booze']},
  {name: 'Luffy', age: 20, favoriteFoods: ['Meat'] },
  {name: 'Sabo', age: 21, favoriteFoods: ['Berry'] }
];

const createManyPeople = (arrayOfPeople, done) => {
  
  Person.create(arrayOfPeople, (error, data) => {
    if (error)  console.log(error)
      done(null, data) 
  }) 
};

const findPeopleByName = (personName, done) => {
  
  Person.find({name: personName}, (error, data) => {
    if(error) console.log(error)
      done(null, data);
  }) 
};

const findOneByFood = (food, done) => {
  
  Person.findOne({favoriteFoods: {$all: [food]}}, (error, data) => {
    if (error) console.log(error)
    done(null, data)    
  });
};

const findPersonById = (personId, done) => {
  
  Person.findById(personId, (err, data) => {
    if (err) console.log(err)
    done(null, data)
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  Person.findById(personId, (err, data) => {
    if(err) { 
      console.log(err)
    } else {
        data.favoriteFoods.push(foodToAdd);
    
        
        data.save((err, updatedData) => {
            if (err) { 
              console.log(err)
            } else {
              done(null, updatedData)
            }
        }) 
    }
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  Person.findOneAndUpdate({ name: personName }, {$set: { age: ageToSet }}, { new: true }, (err, data) => {
    if (err) console.log(err)
    done(null, data);   
  })
};

const removeById = (personId, done) => {
  
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) console.log(err)
    done(null, data);
  });
};
 
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  
  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) console.log(err)
    done(null, data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  Person.find({favoriteFoods: {$all: [foodToSearch]}})
        .sort('name')
        .limit(2)
        .select('-age')
        .exec((err,data) => {
        if(err) console.log(err);   
        done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
