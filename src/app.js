//first require the package:
const express = require('express');

//then create a new application of express
const app = express();


//handle the code


app.use("/user",(req,res)=>{
    res.send("HAHAHAHAHH")
}); //this gives "HHAHAHHAHA" because order matters

//this will only handle get calls to /user  
app.get("/user",(req,res)=>{
    res.send({firstName : "Jay", lastName : "Kumar"})
})

app.post("/user",(req,res)=>{
    //sacing data to DB
    res.send("Data successfully saved to database!");
})

app.delete("/user",(req,res)=>{
    res.send("Deleted successfully!!!")
})

//this will match the all http mathod API calls to /test
app.use("/test",(req,res)=>{
    res.send("hello from the server")
});


app.listen(7000,()=>{
    console.log("server is successfully listining on port 7000...");
});
