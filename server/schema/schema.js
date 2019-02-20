const graphql = require('graphql'),
  Wine = require('../models/wine'),
  //Region = require('../models/region'),
  Bottle = require('../models/bottle');

// These are all the references needed to define the schema
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = graphql;

// GraphQLObjectType defines an Object, think of it as a table in SQL
const WineType = new GraphQLObjectType({
  // Think of this as the name of the table
  name: 'wine',
  // Think of this key as the columns that compose a table. Why in a function? Because of hoinsting
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    color: { type: GraphQLString },
    region: { type: GraphQLString },
    bottle: {
      type: new GraphQLList(BottleType),
      resolve(parent, args) {
        return Bottle.find({ wineId:parent.id })
      }
    }
  })
});

const BottleType = new GraphQLObjectType({
  name: "bottle",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    producer: { type: GraphQLString },
    year: { type: GraphQLInt },
    grade: { type: GraphQLInt },
    wine: {
      type: WineType,
      resolve(parent, args) {
        return Wine.findById(parent.wineId)
      }
    }
  })
})

// These describes the type the queries a user will be allowed to do
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  // In RootQuery order and hoisting is not important so fields doesn't need to be a function
  fields: {
    // In this case wine is the name of the query
    wine: {
      type: WineType,
      // The args will ask the user for a key that identifies what exact item from type above he wants
      // We now know the user is querying for a wine but which one? The one which has as argument the a specific
      args: {
        id: { type: GraphQLID }
      },
      // This function retrieve the data from the DB
      resolve(parent, args) {
        return Wine.findById(args.id)
      }
    },
    // region: {
    //   type: WineType,
    //   args: { name: { type: GraphQLString } },
    //   resolve(parent, args) {
    //     return Wine.find({reagion: args.name})
    //   }
    // },
    bottle: {
      type: BottleType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Bottle.findById(args.id)
      }
    },
    wines: {
      type: new GraphQLList(WineType),
      resolve(parent, args) {
        return Wine.find({})
      }
    },
    bottles: {
      type: new GraphQLList(BottleType),
      resolve(parent, args) {
        return Bottle.find({})
      }
    }
  }
});

// Mutation are GraphQL CRUD tool
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addWine: {
      type: WineType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        color: { type: new GraphQLNonNull(GraphQLString) },
        region: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let wine = new Wine({
          name: args.name,
          color: args.color,
          region: args.region
        });
        return wine.save();
      }
    },
    addBottle: {
      type: BottleType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        producer: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: GraphQLString },
        grade: { type: GraphQLString },
        wineId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let bottle = new Bottle({
          name: args.name,
          producer: args.producer,
          year: args.year,
          grade: args.grade,
          wineId: args.wineId
        });
        return bottle.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  // Declaring what query the user is allowed to do
  query: RootQuery,
  // Declaring what mutation the user is allowed to do
  mutation: Mutation
});
