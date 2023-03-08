const express = require("express")
const app = express()
const path = require("path");

const HTTP_PORT = process.env.PORT || 8080

app.use(express.json())

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/view/i.html"));
});

app.get("/api/users", (req, res) => {
    res.json({message: "get all users!!!"})
});

app.post("/api/users", (req, res) => {
    res.json({message: "created user " + req.body.name})
});

app.get("/api/users/:userId", (req, res) => {
    res.json({message: "get user by id: " + req.params.userId});
});

app.put("/api/users/:userId", (req, res) => {
    res.json({message: "update User with id: " + req.params.userId+ " to "+ req.body.name});
});

app.delete("/api/users/:userId", (req, res) => {
        res.json({message: "delete User with id: " + req.params.userId});
});

app.listen(HTTP_PORT, () => {
    console.log("Express on PORT: " + HTTP_PORT);
});


