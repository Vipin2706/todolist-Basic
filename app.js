const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// mongoose
mongoose.connect("mongodb+srv://admin_vipin:vipin1234@cluster0.nvnya.mongodb.net/listDB", {useNewUrlParser:true, useUnifiedTopology:true})

//creating schema 

const listschema = new mongoose.Schema({
  name:{
    type:String,
    required : true
  }
});

//creating model

const Items = mongoose.model("Item", listschema )

// Routes
app.get("/",(req, res)=>{

 Items.find({},(err,foundsitems)=>{
  if(!err){
    res.render("list", {
      listTitle: "today's list",
      newListItems: foundsitems
    })
  }else{
    console.log(err)
  }
});
});
 

    

  app.post("/",(req, res)=>{
    const listItem = req.body.newItem;

    const item1 = new Items({
      name : listItem 
    })
    item1.save();  
    res.redirect("/")
  });


// delete
app.post("/delete",(req,res)=>{
  const checkedBoxId = req.body.checkedBox;
  Items.deleteOne({_id:checkedBoxId},(err)=>{
    if(!err){
res.redirect("/")
    }
  })
});


app.listen(3000, ()=>{
  console.log("server started on port : 3000");
})
