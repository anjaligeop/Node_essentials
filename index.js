const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/pokeapi",{useNewUrlParser:true},()=>{
    console.log("MongoDB server connected to pokeapi DB")
});

const pokemonSchema = new mongoose.Schema({
    name:String,type:String,imageUrl:String
});

const pokemonModel = new mongoose.model('pokemons',pokemonSchema);

function getData(){
    pokemonModel.find((err,data)=>{
        if (err===null){
            console.log(data);
        }
    });
}
app.get("/pokemons",(req,res)=>{
    let data = pokemonModel.findOne();
    res.send(data);
})

app.post("/pokemon",(req,res)=>{
    console.log(req.body);//gives pokemon obj
    let pokemon= req.body;
    let pokemonObj = new pokemonModel(pokemon);
    pokemonObj.save((err,data)=>{
        if(err===null){
            console.log({"message":"pokemon created"});
        }
    });
    
});

app.listen(8000,()=>{
    console.log("server is running");
});