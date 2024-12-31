// Create a form for blog submission
// Save the form into an array/object
// Display the array into the blog page
// Edit and Delete an array/object of a blog 

// Pages: 
// Blog Posts
// Form 
// Edit Blog Posts

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended : true }));

let blogs = [{
    post: "Lorem Ipsum",
    author: "John David"
}];

app.get("/", (req, res) => {
    res.render("index.ejs", {
        blogPosts : blogs
    });
});

app.get("/createBlog", (req,res) => {
    res.render("createBlog.ejs");
})

app.post("/submit", (req, res, next) => {
    let blog = req.body["blog"]
    let creator = req.body["author"];
    blogs.push({
        post: blog,
        author: creator
    });

    next();

    blogs.forEach(blog => {
        console.log(blog);
    });

    res.redirect("/");
});

app.put("/edit", (req, res) => {

})

app.delete("/delete", (req, res) => {
    
})

app.listen(3000, () => {
    console.log(`Server is running on port ${port}.`)
});

