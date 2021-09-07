const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/poke-api",{useNewUrlParser:true},()=>{
    console.log("MongoDB server connected to pokeapi DB")
});

const pokemonSchema = new mongoose.Schema({
    name:String,type:String,imageUrl:String
});

const pokemonModel = new mongoose.model('pokemons',pokemonSchema);

app.get("/pokemons",async (req,res)=>{
    let data = await pokemonModel.find({});
    res.send(data);
})

//for post method, add content-Type:application/json in header request
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

//end point to delete a pokemon
app.delete("/pokemon/:id",(req,res)=>{
    let id = req.params.id;
    console.log("to delete pokemon with id = "+id);
    pokemonModel.deleteOne({_id:id},(err,data)=>{
        if (err===null){
            res.send("pokemon deleted");
        }
    });
});

//put or patch can be used
app.put("/pokemon/:id",(req,res)=>{
    let id = req.params.id;
    let pokemon = req.body;
    pokemonModel.updateOne({_id:id},pokemon,(err,data)=>{
            if (err===null){
                res.send("pokemon updated");
            }
        });
    });

app.listen(8000,()=>{
    console.log("server is running");
});