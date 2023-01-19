const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
const studentArray = require('./InitialData')

let duplicateOfStudentArr = studentArray.map(val=>{
    return val
})

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get("/api/student/:id", (req, res)=>{
    console.log(req.params.id)
    
    if(req.params.id){
        arr=duplicateOfStudentArr.filter(val=>{
            return val.id==req.params.id
        })
        res.json(arr)
    }
    
   
})
app.get("/api/student", (req, res)=>{
        res.status(200).json(duplicateOfStudentArr)
     
})
app.get("/*", (req, res)=>{
    res.status(404).send("Invalid respond with 404")
})
app.post("/api/student", async (req, res)=>{
    res.set({'content-type':'application/x-www-form-urlencoded'})
    
    await duplicateOfStudentArr.push(req.body)
    console.log(duplicateOfStudentArr[duplicateOfStudentArr.length-1])
    // res.json([duplicateOfStudentArr[duplicateOfStudentArr.length-1]])
    res.json(duplicateOfStudentArr)
   
})
app.post("/*", (req,res)=>{
    res.status(404).send("invalid respond with 404.")
})

app.delete("/api/student/:id", (req, res)=>{
    console.log(req.params.id)
    let newArray = duplicateOfStudentArr.filter((val)=>{
        console.log(val)
        return (val.id!=req.params.id)
    })
    
    console.log(newArray)
    
    
    res.json(newArray)

})
app.delete("/*", (req,res)=>{
    res.status(404).send("invalid respond with 404.")
})

app.put("/api/student/:id", (req, res)=>{
    
    let newArray = duplicateOfStudentArr.map(val=>{
        if(val.id==req.params.id){
            if(req.body.name){
                val.name = req.body.name
            }
            if(req.body.currentClass){
                val.currentClass = req.body.currentClass
            }
            if(req.body.division){
                val.division = req.body.division
            }
        }
        return val
    })
    
    res.json(newArray)
})



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   