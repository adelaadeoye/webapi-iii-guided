const express = require('express'); // importing a CommonJS module
const helmet= require ('helmet')

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//Custom middleware

function gateKeeper( req, res, next){
  const password = req.headers.password;
  if (password && password.toLowerCase()){
  next()
  }
  else{
    res.status(401).json("You can't pass")
  }
}

server.use(express.json());
server.use(gateKeeper)

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});
server.get("/area51",[ helmet(), gateKeeper], (req,res)=>{

  res.send(req.headers)
})
module.exports = server;
