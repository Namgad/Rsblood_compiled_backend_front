// FOR MONGODB
var MongoClient = require('../RSmongoconnection');

//
var express = require('express');
var router = express.Router();




/////////////////////////////////////////////////////////////////////////////////

/* GET recent donors */
// GET /blood/donor_recent/
router.get('/donor_recent', function (req, res, next) {


    MongoClient.connect("mongodb://localhost:27017/RSblood_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, client) {
        if (!err) {
            console.log("We are connected");
            Mydb = client.db('RSblood_db');
            var c = Mydb.collection('donors').find().sort({_id:-1}).limit(5).toArray(function (err, results) {
                res.send(results)
                // send HTML file populated with quotes here
            })
        } else {
            console.log("Problem error")
        }
    });


});




/////////////////////////////////////////////////////////////////////////////////

/* GET total donors of each kind */
// GET /blood/donor_list_samegroup/
router.get('/donor_type_count', function (req, res, next) {


    MongoClient.connect("mongodb://localhost:27017/RSblood_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, client) {
        if (!err) {
            console.log("We are connected");
            Mydb = client.db('RSblood_db');
            var c = Mydb.collection('blood_count').find().toArray(function (err, results) {
                res.send(results)
                // send HTML file populated with quotes here
            })
        } else {
            console.log("Problem error")
        }
    });


});



/////////////////////////////////////////////////////////////////////////////////

/* POST doners of given bood group. */
// POST /blood/donor_list_samegroup/
router.post('/donor_list_samegroup', function (req, res, next) {

    // POST data
    let Blood_Group = req.body.Blood_Group;


    MongoClient.connect("mongodb://localhost:27017/RSblood_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, client) {
        if (!err) {
            console.log("We are connected");
            Mydb = client.db('RSblood_db');
            var c = Mydb.collection('donors').find({ Blood_group: Blood_Group }).toArray(function (err, results) {
                res.send(results)
                // send HTML file populated with quotes here
            })
        } else {
            console.log("Problem error")
        }
    });


});


///////////////////////////////////////////////////////////////////////////////////

// POST /blood/check_if_donor/
router.post('/check_if_donor', function (req, res, next) {

    // Post data
    let id_user = req.body.id_user;

    MongoClient.connect("mongodb://localhost:27017/RSblood_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, client) {
        if (!err) {
            console.log("We are connected");
            Mydb = client.db('RSblood_db');
            var c = Mydb.collection('donors').find({ id_user: id_user}).toArray(function (err, results) {

                if (results.length==0)
                {
                    res.json({
                        is_a_donor: false,
                    });

                }else {
                    res.json({
                        is_a_donor: true,

                    });
                }
                // send HTML file populated with quotes here
            });

        } else {
            console.log("Problem error")
        }
    });


});


/////////////////////////////////////////////////////////////////////////////////////

// POST /blood/donor_registration/
router.post('/donor_registration', function (req, res, next) {

    // Post data
    let id_user = req.body.id_user;
    let name = req.body.name;
    let how_often = req.body.how_often;

    // let dob = req.body.dob;
    let Gender = req.body.Gender;
    let Blood_group = req.body.Blood_group;
    // let weight = req.body.weight;
    // let Phone = req.body.Phone;
    let Mobile_No = req.body.Mobile_No;
    let Address = req.body.Address;
    // let City = req.body.City;

    MongoClient.connect("mongodb://localhost:27017/RSblood_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, client) {
        if (!err) {
            console.log("We are connected");
            Mydb = client.db('RSblood_db');
            var c = Mydb.collection('donors').insertOne({

                id_user:id_user,
                name:name,
                how_often:how_often,

                Gender : Gender,
                Blood_group : Blood_group,

                Mobile_No : Mobile_No,
                Address : Address,


            });

            // res.send("{"message":"Details Added"}");


            res.json({
                message: "Details Added",
            });

        } else {
            console.log("Problem error")
        }
    });


});

///////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////


// POST /blood/request_registration/
router.post('/request_registration', function (req, res, next) {

    // Post data
    let gender= req.body.gender;

    let Patient_Name= req.body.Patient_Name;
    let Hospital_Name_Address= req.body.Hospital_Name_Address;
    let Blood_Group= req.body.Blood_Group;
    // let City= req.body.City;
    // let Doctor_Name= req.body.Doctor_Name;
    let Contact_Name= req.body.Contact_Name;
    // let Other_Message= req.body.Other_Message;
    // let Contact_Email_ID= req.body.Contact_Email_ID;
    let Contact_Number= req.body.Contact_Number;
    // let When_Required= req.body.When_Required;




    MongoClient.connect("mongodb://localhost:27017/RSblood_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, client) {
        if (!err) {
            console.log("We are connected");
            Mydb = client.db('RSblood_db');
            var c = Mydb.collection('requesters').insertOne({
                gender: gender,
                Patient_Name: Patient_Name,
                Hospital_Name_Address: Hospital_Name_Address,
                Blood_Group: Blood_Group,
                // City: City,
                // Doctor_Name: Doctor_Name,
                Contact_Name: Contact_Name,
                // Other_Message: Other_Message,
                // Contact_Email_ID: Contact_Email_ID,
                Contact_Number: Contact_Number,
                // When_Required: When_Required

            });

            res.json({
                message: "Details Added",
            });
        } else {
            console.log("Problem error")
        }
    });


});

///////////////////////////////////////////////////////////////////////////////////



// POST /* /blood/register/
router.post('/register', function (req, res, next) {


    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;

    MongoClient.connect("mongodb://localhost:27017/RSblood_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, client) {
        if (!err) {
            console.log("We are connected");
            Mydb = client.db('RSblood_db');
            var c = Mydb.collection('users').insertOne({
                email: email,
                password: password,
                name: name,
            });

            res.json({
                registered: true,
                message: "Details Added",
            });
        } else {

            res.json({
                registered: false,
                message: "Details not Added",
            });

            console.log("Problem error")
        }
    });

});

////////////////////////////////////////////////////////////////////////

// POST /* /blood/login/
router.post('/login', function (req, res, next) {

    let email = req.body.email;
    let password = req.body.password;


    MongoClient.connect("mongodb://localhost:27017/RSblood_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, client) {
        if (!err) {
            console.log("We are connected");
            Mydb = client.db('RSblood_db');
            var c = Mydb.collection('users').find({ email: email,password:password}).toArray(function (err, results) {



                        if (results.length==0)
                        {
                            res.json({
                                logged_in: false,
                                message: "something_went_wrong",
                            });

                        }else {
                            res.json({
                                logged_in: true,
                                name: results[0].name,
                                id: results[0]._id
                            });
                        }

                // send HTML file populated with quotes here
            })
        } else {
            console.log("Problem error")
        }
    });




    // con.query("SELECT * FROM rsjira.admin WHERE email=? AND password=?",[email,password], (err, rows, fields) => {
    //     if (!err) {
    //
    //         if (rows.length==0)
    //         {
    //             res.json({
    //                 logged_in: false,
    //                 message: "something_went_wrong",
    //             });
    //         }else {
    //             // send jwt token
    //             var post2  = {admin_id: rows[0].id};
    //             var token= jwt.sign({post2},'my_secret_key',{ expiresIn: "30d"});
    //
    //             res.json({
    //                 logged_in: true,
    //                 token:token
    //             });
    //
    //         }
    //
    //
    //     } else {
    //         res.json({
    //             message: "Something went wrong",
    //         });
    //     }
    // });


    // return res.send('Added');
    // res.send(email);


});

////////////////////////////////////////////////////////////////////////



module.exports = router;
