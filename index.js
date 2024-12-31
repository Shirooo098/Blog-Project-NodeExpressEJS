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
import methodOverride from "method-override";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(methodOverride('_method'))

let blogs = [{
    post: "Lorem Ipsum",
    author: "John David"
}];

app.get("/", (req, res) => {
    res.render("index.ejs", {
        blogs
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

    blogs.forEach(blog => {
        console.log(blog);
    });

    res.redirect("/");
    next();
});

app.get("/edit/:index", (req, res) => {
    const index = req.params.index;
    const blogPost = blogs[index];
    res.render("editBlog.ejs", {
        index, blogPost
    });
})

app.post("/edit/:index", (req, res) => {
    const index = req.params.index;
    blogs[index] = {
        post: req.body.blog,
        author: req.body.author
    };

    res.redirect("/");
});

// THIS WORKS ON POSTMAN BUT NOT IN FRONT END ??????????????????
// app.delete("/delete/:index", (req, res) => {
//     const index = req.params.index;
//     blogs.splice(index, 1);
//     if(index === -1){
//         res.sendStatus(404);
//     }
//     console.log(`Index deleted: ${index}`)
//     res.redirect("/");
// });


app.post("/delete/:index", (req, res) => {
    const index = req.params.index;
    blogs.splice(index, 1);

    if(index === -1){
        res.sendStatus(404);
    }
    console.log(`Index deleted: ${index}`)
    res.redirect("/");
});

app.listen(3000, () => {
    console.log(`Server is running on port ${port}.`)
});