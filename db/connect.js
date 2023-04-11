const mongoose = require('mongoose');

/*Connect to MongoDB: You can connect to your MongoDB database using the mongoose.connect() method, 
passing in the connection string as the first argument:*/
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});

const mongoose = require('mongoose');

/*Define a data model: You can define a data model using the mongoose.Schema and mongoose.model methods. 
A schema defines the structure of your documents, and a model represents a collection in MongoDB based on that schema. 
Here's an example:*/
// Define a schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

/*Use the model to perform CRUD operations: 
Once you have defined a data model, you can use it to perform CRUD operations on your MongoDB collection. 
For example, you can create a new document, retrieve documents, update documents, and delete documents using methods provided by the model. 
Here are some examples:*/
// Create a new document
const newUser = new User({ name: 'John Doe', age: 30, email: 'johndoe@example.com' });
newUser.save()
  .then(() => {
    console.log('User created:', newUser);
  })
  .catch((err) => {
    console.error('Failed to create user:', err);
  });

// Retrieve documents
User.find({ age: { $gte: 18 } })
  .then((users) => {
    console.log('Users:', users);
  })
  .catch((err) => {
    console.error('Failed to retrieve users:', err);
  });

// Update documents
User.findOneAndUpdate({ name: 'John Doe' }, { age: 31 })
  .then((user) => {
    console.log('User updated:', user);
  })
  .catch((err) => {
    console.error('Failed to update user:', err);
  });

// Delete documents
User.findOneAndDelete({ email: 'johndoe@example.com' })
  .then((user) => {
    console.log('User deleted:', user);
  })
  .catch((err) => {
    console.error('Failed to delete user:', err);
  });
/*These are some basic examples of how you can use Mongoose in a backend context to interact with MongoDB. Mongoose also provides many other features, such as middleware, validation,*/