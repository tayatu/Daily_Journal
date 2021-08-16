//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

//Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.
// Lodash’s modular methods are great for:
//
// Iterating arrays, objects, & strings
// Manipulating & testing values
// Creating composite functions

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://sarthak_paliwal:sarthak123@blogdb.rt7uc.mongodb.net/blogDB", {
     useNewUrlParser: true,
     useFindAndModify: false,
     useUnifiedTopology: true
});
// mongoose.connect("mongodb://localhost:27017/blogDB", {
//      useNewUrlParser: true,
//      useFindAndModify: false,
//      useUnifiedTopology: true
// });

const contentSchema = new mongoose.Schema({
     title: String,
     post: String
});
const Content = mongoose.model("Content", contentSchema);

app.get('/', function(req, res) {
     Content.find({}, function(err, foundData) {
          res.render("home", {
               startingContent: homeStartingContent,
               posts:foundData
          });

          console.log(foundData[0].post.length);
     });
});

app.get('/compose', function(req, res) {
     res.render("compose", {});
});
app.post('/compose', function(req, res) {
     const post = new Content({
          title: req.body.postTiltle,
          post: req.body.postBody
     });
     post.save(function(err){
          if (!err){
               res.redirect("/");
          }
     });
});
app.get('/posts/:postName', function(req, res) {

     const requestPostId =req.params.postName;
     //  /posts/:postName/books/:bookName
     //req.params={"postName:ram,"books" :harry}
     Content.findOne({title:requestPostId},function(err,data){
          if(err){
               console.log(err);
          }else{
               res.render("post", {
                    Title: requestPostId,
                    content: data.post
               });
          }
     });
});

app.get('/about', function(req, res) {
     res.render("about", {
          aboutContent: aboutContent
     });
});
app.get('/contact', function(req, res) {
     res.render("contact", {
          contactContent: contactContent
     });
});
let port =process.env.PORT;
app.listen(port || 3000, function() {
     console.log("Server started on port 3000");
});
