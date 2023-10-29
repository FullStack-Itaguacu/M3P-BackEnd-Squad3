const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/dbConnection');
const config = require('./config/config.server');
const routes = require('./routes');



class Server{
    constructor (server = express())    { 
      this.middlewares(server) 
      this.database()  
      this.allRoutes(server)
      this.initializeServer(server) 
     
    }
  
    async middlewares(app) {
      
      app.use(cors({
        origin: ['http://localhost:5173', 'http://localhost:5174','https://monitorrindodeploymaster.cyclic.app'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      }));
      
      
      
      app.use(express.json()) 
    }
  
    async database() {
      try {
        await dbConnection.authenticate(); 
        console.log('Sucess connection');
      } catch (error) {
        console.error('Connection failed', error);
        throw error
      }
    }
    async initializeServer(app) {
      const PORT = config.port 
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) 
    }
  
    async allRoutes(app) {
      app.use(routes)
    }
    

}

module.exports = {Server};