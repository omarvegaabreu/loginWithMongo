# loginWithMongo

Login boilerplate:

This app will allow you to login in to a dash board. The data base that is used is MONGODB to save user information. It is connected to Mongo Atlas.

## Dependencies used in the application:

    "bcryptjs": "^2.4.3",
    "connect-flash": "^0.1.1",
    "ejs": "^2.6.2",
    "express": "^4.17.1",
    "express-ejs-layouts": "^2.5.0",
    "express-session": "^1.16.2",
    "mongoose": "^5.6.2",
    "passport": "^0.4.0",
    "passport-local": "^1.0.0"
    
## To run the application, clone or download then:
Type in the command line: npm init -y
Type: npm i -- to install all dependencies
Type: node app.js to run

Note: Please load you own mongo atlas URL to make the project work given that this one is hidden with a .env file. 
mongoURI="your atlas mongo db uri"
