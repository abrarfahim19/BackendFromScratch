const fs = require('fs');
const path = require('path')
const http = require('http')

const request = require('./request');
const response = require('./response');
const { checkMiddlewareInputs } = require('./lib/helper');

function Minimal () {
  const _middlewares = [];
  function use(...args) {
   const {path, handler} = checkMiddlewareInputs(args); 
    _middlewares.push({path,handler});
  }
  function handle(req,res) {
    //This is the middleware handling
  }
  function listen(PORT=8080, cb) {
    return http.createServer((req,res)=>{
      request(req);
      response(res);
      handle(req,res);
      fs.readFile(path.resolve(__dirname, '../public', 'index.html'), (err, data) => {
        if (err){
          return res.status(500).send("Error Occured")
        }
        return res.status(200).send(data);
      })
    }).listen(PORT, ()=>{
      if (cb){
        if (typeof cb === 'function'){
          return cb();
        } throw new Error('Listen callback needs to be a function')
      }
    })
  }
  return {use, listen};
}

module.exports = Minimal;