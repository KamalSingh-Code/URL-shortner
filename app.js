require("dotenv").config();
const express = require("express");
const connect=require("./dBase")
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded())
app.use(express.static("public"))

app.get("/", (req, res) => {
   
    res.sendFile(path.join(__dirname,"index.html"));
});

app.post("/shorten",async(req,res)=>{
   
    const db=await connect()
    const urls=db.collection("urls")
    const check= await urls.findOne({shortCode:req.body.shortCode})
    if(!check)
    {
        await urls.insertOne(req.body)
         const shortUrl = `http://localhost:3000/${req.body.shortCode}`;

    res.json({
        message: "Short URL created!",
        url: shortUrl
    });
    }
   else{
        return res.status(400).json({
            error: "Short code already exists. Please try another."
        });
   }
   
})

app.use(async(req,res)=>{
    const db=await connect()
    const urls=db.collection("urls")
    const check= await urls.findOne({shortCode:req.url.slice(1)})
    console.log(check)
    console.log(req.url)
    res.redirect(
        check.originalUrl
    )
})
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});