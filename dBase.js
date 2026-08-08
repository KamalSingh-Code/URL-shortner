require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const {MongoClient}=require("mongodb");

const client=new MongoClient(process.env.MONGODB_URI);

const connect=async ()=>{
        await client.connect();
        console.log("Connection to db")

        return client.db("base");


}
module.exports=connect; 
