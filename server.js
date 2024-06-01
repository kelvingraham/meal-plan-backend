const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const userRoutes = require('./app/routes/user_routes')
const bubbleRoutes = require('./app/routes/sort')

// // middleware for error handling and troubleshooting
const errorHandler = require('./lib/error_handler')
const requestLogger = require('./lib/request_logger')

const { _, ServerApiVersion } = require('mongodb');
//const uri = process.env.MONGODB_URI
const uri = "mongodb+srv://kgraham:kgraham@cluster43730.limoj7k.mongodb.net/test_db?retryWrites=true&w=majority&appName=Cluster43730";
//console.log(uri)

mongoose.connect(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})
.then(()=>console.log('Connected!'))
.catch(e=>console.log(e));

/*
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect(); // TODO fix
    //await client.connect({dbName: 'test_db'}); // TODO fix
    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    await client.db("test_db").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/

/**********************************************************
 * CONSTANTS
 *********************************************************/

// require database configuration logic
// `db` will be the actual Mongo URI as a string
//const {db, dbSetup} = require('./config/db')

// define server and client ports
// used for cors and local port declaration
const {serverDevPort, clientDevPort} = require('./config/constants')
// define port for API to run on
const port = process.env.PORT || serverDevPort


/**********************************************************
 * DATABASE
 *********************************************************/

// establish database connection
//mongoose.connect(db, dbSetup)//.catch(err => console.log(err.reason)); //CHANGED
//mongoose.connect(uri)

// instantiate express application object
const app = express()


/**********************************************************
 * GENERAL MIDDLEWARE
 *********************************************************/

// require configured passport authentication middleware
const auth = require('./lib/auth')

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}` }))

// register passport authentication middleware
app.use(auth)

// parses json requests
app.use(express.json())
// urlencoded parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))


/************************************************
 * ROUTE SETUP
 ************************************************/

// log each request as it comes in for debugging
// requests needs to be first to log all incoming requests
app.use(requestLogger)

app.use(userRoutes)
app.use(bubbleRoutes)

// register error handling middleware
// comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler)

// run API on designated port
app.listen(port, () => {
  console.log('listening on port ' + port)
})

// needed for testing
module.exports = app
