var express = require ('express')
var app = express();
var edge = require('edge-js');

app.get('/wrapper',function(req,res){
    var first = parseInt(req.query.first);
    var second = parseInt(req.query.second);

    var resultToSend;
    // var payload = {
    //     a: parseInt(first),
    //     b: parseInt(second)
    // };
    var payload = req.query;
    //call a function on the DLL and send the result back to the caller in browser
    var sumFunction = edge.func({
        assemblyFile: 'Basic.dll',
        typeName: 'Startup',
        methodName: 'Invoke' // This must be Func<object,Task<object>>
    });
    sumFunction(payload, function (error, result) {
        if(error){
            console.log("the error: "+error)
        }
        else{
            resultToSend = result;
        }
        
     });
   
    res.send(resultToSend.toString());
})

app.listen(9000);