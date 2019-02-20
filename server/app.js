const express = require('express'),
  app = express(),
  graphqlHTTP = require('express-graphql'),
  schema = require('./schema/schema'),
  mongoose = require('mongoose'),
  MongoClient = require('mongodb').MongoClient,
  // Allows cross origin request between servers
  cors = require('cors'),
  port = process.env.PORT || 4000;

mongoose.connect("mongodb+srv://livio:sudopassword@cluster0-ag7b7.mongodb.net/WineApp?retryWrites=true", {
    useNewUrlParser: true
  })
  .then(console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB related error:', err.stack);
    process.exit(1);
  });

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(port, console.log(`Evesdropping on port ${port}`));