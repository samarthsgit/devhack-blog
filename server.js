import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Listening at Port ${port}!`);
});

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {articles: articlesArr});
});

app.get("/write.ejs", (req, res) => {
    res.render("write.ejs");
});

app.post("/publish", (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const content = req.body.content;
    const metaContent = req.body.metaContent;
    const newArticle = new NewArticle(title, author, content, metaContent);
    console.log(newArticle);
    articlesArr.push(newArticle);
    console.log(articlesArr);
    res.render("index.ejs", {articles: articlesArr});
});

app.post("/delete", (req, res) => {
    const index = req.body.index;
    articlesArr.splice(index, 1);
    res.render("index.ejs", {articles: articlesArr});
});

app.post("/edit", (req, res) => {
    const indexToEdit = req.body.index;
    res.render("edit.ejs", {article: articlesArr[indexToEdit], index: indexToEdit});
});

app.post("/modify", (req, res) => {
    const indexToModify = req.body.index;
    const newContent = req.body.content;
    const newMetaContent = req.body.metaContent;
    articlesArr[indexToModify].content = newContent;
    articlesArr[indexToModify].metaContent = newMetaContent;
    res.render("view.ejs", {article: articlesArr[indexToModify], index: indexToModify});
});

app.post("/view", (req, res) => {
    const indexToView = req.body.index;
    res.render("view.ejs", {article: articlesArr[indexToView], index: indexToView});
});

class NewArticle {
    constructor(title, author, content, metaContent) {
        this.title = title;
        this.author = author;
        this.content = content;
        this.metaContent = metaContent;
    }
};

const articlesArr = [
    {
        title: "Tutorial on HTML",
        author: "Samarth",
        metaContent: "This post is about HTML",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ipsum elit, sodales ac tristique nec, commodo ac magna. Donec semper sem quam, vitae faucibus ex consectetur et. Sed pulvinar arcu vel lacus condimentum, sed suscipit nunc fermentum. Etiam consectetur tincidunt luctus. Integer venenatis sed tellus vel vestibulum. Etiam orci massa, consequat eget metus id, porttitor volutpat risus. Integer finibus congue risus non fermentum. Mauris volutpat est sit amet ligula imperdiet, quis tincidunt neque lobortis. Praesent eleifend lacus ac mollis rhoncus. Sed pellentesque mi nec pellentesque tristique. Ut a libero blandit, pulvinar mauris sit amet, consectetur risus. Proin ac dictum sem, ut aliquet purus. Maecenas imperdiet ac augue id pulvinar. In blandit turpis nulla, id accumsan dui pellentesque convallis. Duis rutrum metus ac dui feugiat, sit amet porta nibh finibus."
    }
];
