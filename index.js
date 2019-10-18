var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
const mongoose = require("mongoose");
app.listen(8000, () => console.log("listening on port 8000"));


mongoose.connect("mongodb://localhost/1955api", { useNewUrlParser: true,useUnifiedTopology: true });



const PeopleSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength:4}
}, {timestamps: true})

const People= mongoose.model("People", PeopleSchema)


app.get('/' , (req , res) => {
    People.find()
    .then(person => res.json(person))
    .catch(err => res.json(err));
})


app.get('/new/:name' , (req , res) => {
    People.create({name: req.params.name})
    .then(res.redirect('/'))
    .catch(err => res.json(err));
})


app.get('/remove/:name' , (req , res) => {
    People.remove({name: req.params.name})
    .then(res.redirect('/'))
    .catch(err => res.json(err));
})
app.get('/:name' , (req , res) => {
    People.findOne({name: req.params.name})
    .then(person => res.json(person))
    .catch(err => res.json(err));
})


