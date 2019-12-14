// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/blogs");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var Blog = mongoose.model('Blog', {
    name: String,
    description: String,
    blogdate: String,
    author: String
});


// Get all Blog items
app.get('/api/blogs', function (req, res) {

    console.log("Listing blogs items...");

    //use mongoose to get all blogs in the database
    Blog.find(function (err, blogs) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(blogs); // return all blogs in JSON format
    });
});

// Create a Blog Item
app.post('/api/blogs', function (req, res) {

    console.log("Creating Blog item...");

    Blog.create({
        name: req.body.name,
        description: req.body.description,
        blogdate: req.body.blogdate,
        author:req.body.author,
        done: false
    }, function (err, blog) {
        if (err) {
            res.send(err);
        }

        // create and return all the blogs
        Blog.find(function (err, blogs) {
            if (err)
                res.send(err);
            res.json(blogs);
        });
    });

});

// Update a Blog Item
app.put('/api/blogs/:id', function (req, res) {
    const blog = {
        name: req.body.name,
        description: req.body.description,
        blogdate: req.body.blogdate,
        author: req.body.author
    };
    console.log("Updating item - ", req.params.id);
    Blog.update({_id: req.params.id}, blog, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a Blog Item
app.delete('/api/blogs/:id', function (req, res) {
    Blog.remove({
        _id: req.params.id
    }, function (err, blog) {
        if (err) {
            console.error("Error deleting blog ", err);
        }
        else {
            Blog.find(function (err, blogs) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(blogs);
                }
            });
        }
    });
});


// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("Blog server listening on port  - ", (process.env.PORT || 8080));