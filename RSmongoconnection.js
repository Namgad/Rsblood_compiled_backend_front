const MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb+srv://HM:1234@cluster0-eetfa.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true}, function(err,client)  {
    if(!err) {
        console.log("We are connected");
        Mydb = client.db('God');
        // var c=Mydb.collection('RS').find().toArray(function(err, results) {
        //     console.log(results)
        //     // send HTML file populated with quotes here
        // })
    }
    else {
        console.log("Mongo connection error")
    }
});



module.exports=MongoClient;
