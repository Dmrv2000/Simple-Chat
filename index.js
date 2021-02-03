const { response } = require('express');
const express = require('express');
const Datastore = require('nedb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.listen(port,() => console.log("listening at 3000"));
app.use(express.static('public'));
app.use(express.json());

const db = new Datastore('users.db');
const msDb = new Datastore('msg.db');
db.loadDatabase();
msDb.loadDatabase();

//Registar novo user
app.post('/register',(req,res) => {
    console.log('request from register');
    console.log(req.body);
    
    db.insert(req.body);

    res.json({
        status: 'sucess'
    });
});

//Login
app.post('/login',(req,res) => {
    console.log("got a request!");
    console.log(req.body);
    us = req.body.us;
    pwd = req.body.pwd;

    db.find({ us: us , pwd: pwd}, function (err, docs) {
        console.log(docs);
        if(docs.length == 0){
            res.json({
                sucess: "false"
            });
        }else{
            res.json({
                sucess: "true",
                id: docs[0]._id
            });
        }
      });
    
});

app.post('/load_data',(req,res) => {
    console.log("got a request!");
    console.log(req.body);
    id = req.body.x;

    db.find({ _id:id}, function (err, docs) {
        console.log(docs);
        if(docs.length == 0){
            res.json({
                sucess: "false"
            });
        }else{
            res.json({
                sucess: "true",
                us: docs[0].us
            });
        }
      });
    
});

app.post('/sendMessage',(req,res) => {
    console.log("got a request!");
    console.log(req.body);

    msDb.insert(req.body);
    
    res.json({
        sucess: "true"
    });
});

app.get('/get_messages', (req,res) => {
    msDb.find({},(err,data) => {
        if(err){
            res.end();
            return;
        }
        res.json(data);
    });
});

