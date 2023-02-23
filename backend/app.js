const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");

mongoose.connect("mongodb+srv://MaevaPrecourt:Maeva1996@piiquante.x6lztnj.mongodb.net/?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connexion à MongoDB réussie !"))
.catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(function(request, response, next){
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(express.json());
app.use("/api/auth", userRoutes);

module.exports = app;