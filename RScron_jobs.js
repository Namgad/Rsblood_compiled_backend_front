var cron = require('node-cron');
var MongoClient = require('./RSmongoconnection');

var Acount;
var Aminuscount;

var Bcount;
var Bminuscount;

var ABcount;
var ABminuscount;

var Ocount;
var Ominuscount;

// Getting all blood types count and adding in collection Blood_count
cron.schedule('* * * * *', () => {
    console.log('running a task every minute');


    // A+

    MongoClient.connect("mongodb://localhost:27017/RSblood_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, client) {
        if (!err) {
            console.log("We are connected");
            Mydb = client.db('RSblood_db');

            // Clear all
            Mydb.collection('blood_count').deleteMany({}, function (err, results) {
                if (!err)
                {
                    countA();
                }

            })


        } else {
            console.log("Problem error")
        }

        //

    });

});


function countA()
{

    var c = Mydb.collection('donors').find({ Blood_group: 'A+' }).toArray(function (err, results) {
        Acount=results.length;
        countAminus()

    })

}



function countAminus()
{

    var c = Mydb.collection('donors').find({ Blood_group: 'A-' }).toArray(function (err, results) {
        Aminuscount=results.length;
        countB()

    })

}


function countB()
{

    var c = Mydb.collection('donors').find({ Blood_group: 'B+' }).toArray(function (err, results) {
        Bcount=results.length;
        countBminus()
    })

}


function countBminus()
{

    var c = Mydb.collection('donors').find({ Blood_group: 'B-' }).toArray(function (err, results) {
        Bminuscount=results.length;
        countAB()
    })

}


function countAB()
{

    var c = Mydb.collection('donors').find({ Blood_group: 'AB+' }).toArray(function (err, results) {
        ABcount=results.length;
        countABminus()
    })

}


function countABminus()
{

    var c = Mydb.collection('donors').find({ Blood_group: 'AB-' }).toArray(function (err, results) {
        ABminuscount=results.length;
        countO()
    })

}

function countO()
{

    var c = Mydb.collection('donors').find({ Blood_group: 'O+' }).toArray(function (err, results) {
        Ocount=results.length;
        countOminus()
    })

}

function countOminus()
{

    var c = Mydb.collection('donors').find({ Blood_group: 'O-' }).toArray(function (err, results) {
        Ominuscount=results.length;
        RStodb()
    })

}

function RStodb()
{

    var l = Mydb.collection('blood_count').insertOne({
        'aplus':Acount,
        'aminus':Aminuscount,

        'bplus':Bcount,
        'bminus':Bminuscount,

        'abplus':ABcount,
        'abminus':ABminuscount,

        'oplus':Ocount,
        'ominus':Ominuscount
    });

}


module.exports = cron;
