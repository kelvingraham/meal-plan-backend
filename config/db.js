'use strict'



// creating a base name for the mongodb
const mongooseBaseName = 'express-api-template'

const uri = "mongodb+srv://kelvingraham1@gmail.com:@#z76.B6T/84wKY@cluster43730.limoj7k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster43730";

//const hostname = 'money-machine.lan' //CHANGED

// create the mongodb uri for development and test
// const database = {
//   development: `mongodb://${hostname}/${mongooseBaseName}-development`, //CHANGED
//   test: `mongodb://${hostname}/${mongooseBaseName}-test` //CHANGED
// }

// Identify if development environment is test or development
// select DB based on whether a test file was executed before `server.js`
// const localDb = process.env.TESTENV ? database.test : database.development
//const localDb = uri

// Environment variable DB_URI will be available in
// heroku production evironment otherwise use test or development db
// const currentDb = process.env.DB_URI || localDb

// const config = {
//   db: currentDb,
//   dbSetup: {
//     socketTimeoutMS: 0, //CHANGED
//     connectTimeoutMS: 0, //CHANGED
//     connectTimeout: 0, //CHANGED
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
//   }
// }
const config = {}

module.exports = config