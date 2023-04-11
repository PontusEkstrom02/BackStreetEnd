const mongoose = require('mongoose');

/*Sure! Mongoose is a popular Object-Document Mapping (ODM) library for Node.js and MongoDB. 
It provides a higher-level abstraction for interacting with MongoDB in a backend context, making it easier to work with MongoDB collections, documents, and queries using JavaScript.

Mongoose allows you to define data models in your Node.js application, which represent the structure of your documents in MongoDB. 
You can then use these models to interact with your MongoDB database, perform CRUD (Create, Read, Update, Delete) operations, and handle complex queries and data validation.

Here's a step-by-step overview of how you can use Mongoose in a backend context:*/

/*Connect to MongoDB: You can connect to your MongoDB database using the mongoose.connect() method, 
passing in the connection string as the first argument:*/

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});

/*Define a data model: You can define a data model using the mongoose.Schema and mongoose.model methods. 
A schema defines the structure of your documents, and a model represents a collection in MongoDB based on that schema. 
Here's an example:*/
// Define a schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pass: { type: String, required: true },
    key: { type: String, required: true, unique: true },
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

/*Use the model to perform CRUD operations: 
Once you have defined a data model, you can use it to perform CRUD operations on your MongoDB collection. 
For example, you can create a new document, retrieve documents, update documents, and delete documents using methods provided by the model. 
Here are some examples:*/
// Create a new document
const newUser = new User({ name: 'John', pass: '123', key: 'idk' });
newUser.save()
  .then(() => {
    console.log('User created:', newUser);
  })
  .catch((err) => {
    console.error('Failed to create user:', err);
  });

// Retrieve documents
User.find({ pass: { $gte: 123 } })
  .then((users) => {
    console.log('Users:', users);
  })
  .catch((err) => {
    console.error('Failed to retrieve users:', err);
  });

// Update documents
User.findOneAndUpdate({ name: 'John' }, { pass: 123 })
  .then((user) => {
    console.log('User updated:', user);
  })
  .catch((err) => {
    console.error('Failed to update user:', err);
  });

// Delete documents
User.findOneAndDelete({ key: 'idk' })
  .then((user) => {
    console.log('User deleted:', user);
  })
  .catch((err) => {
    console.error('Failed to delete user:', err);
  });
/*These are some basic examples of how you can use Mongoose in a backend context to interact with MongoDB. Mongoose also provides many other features, such as middleware, validation,*/