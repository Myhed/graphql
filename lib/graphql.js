const component = require('./component');
var graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
var { buildSchema } = require('graphql');
var appComponent = component;
appComponent.app.use(bodyParser.urlencoded({extended: false}))
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

appComponent.app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

module.exports = component;