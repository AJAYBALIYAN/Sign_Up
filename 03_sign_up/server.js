const express = require("express");
const bodyParser = require("body-parser");
const request = require("request")
const https = require("https") 

const app= express(); // creating alias

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup_page.html")  
})

app.listen(3000,function(){
    console.log("server is listening on port 3000")
})

app.post("/",function(req,res){

    var f=req.body.f
    var l=req.body.l
    var e=req.body.e

    // console.log(f,l,e)

    var data = {
        members : [
            {
                email_address: e,
                status: "subscribed",
                merge_fields: {
                    FNAME: f,
                    LNAME: l
                }
            }
        ]
    }

    const jsondata=JSON.stringify(data)

    const url= "https://us12.api.mailchimp.com/3.0/lists/3616eb0414"
    
    // const url = "https://us12.api.mailchimp.com/3.0/lists"

    const options = {
        method: "POST",
        auth: "ajay:ebde1e59736e149dea463b55eed15c77-us12"
    }

    const request=https.request(url , options , function(response){

        if(response.statusCode==200)
        {
            res.sendFile(__dirname+"/success.html");
        }

        else{
            // res.send("unsuccesful, please try again !")
            res.sendFile(__dirname+"/faliure.html");
        }
        response.on("data",function(data){
            // console.log(JSON.parse(data)) (it is for just to see errors and all)
        })
    })

    request.write(jsondata)
    request.end()
})

app.post("/faliure",function(req,res){
        
    res.redirect("/");
})

// api key :- ebde1e59736e149dea463b55eed15c77-us12
// audience id :- 3616eb0414