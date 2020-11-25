const express = require ('express')
const app = express();
const edge = require('edge-js');
const superagent = require('superagent');


app.get('/print',function(request,response){

    var paramObject = request.query;
    var first = parseInt(request.query.first);
    var second = parseInt(request.query.second);

    var resultToSend;
   
    //call the other server:
    superagent.get("http://localhost:9000/wrapper")
    .query(paramObject)
    .end((err, res) => {
        if (err) { return console.log(err); }
       
        //resultToSend = res.text;
        response.send( "Result = "+res.text);
      });
     
})

app.listen(8000);