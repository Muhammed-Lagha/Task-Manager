// CRUD Create Read Update Delete
const { MongoClient , ObjectId} = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'task-manager';



async function main() {

    // Use connect method to connect to the server
  await client.connect({ useNewUrlParser : true });
 
  const db = client.db(dbName);
  
  const collection = db.collection('tasks')

  // update a document
  // const filter = { _id : new ObjectId('645d54f147a13c2290099174') }
  // const update = { $inc : { age: 1 } }
  // const updateDoc = await collection.updateOne( filter ,update)
  // console.log('Updated documents =>' ,updateDoc)
  
  // const filter = { completed : false };
  // const update = { $set: { completed : true } };

  // const updateDoc = await collection.updateMany(filter ,update)
  // console.log('Updated documents =>' ,updateDoc)
 
  const filter = { description : "Create User interface" }
  const deleteDoc = await collection.deleteOne(filter)
  console.log(deleteDoc)

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)


