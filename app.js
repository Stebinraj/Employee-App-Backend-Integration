// Task1: initiate app and run server at 3000
'use strict';
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { EmployeeModel } = require('./model/employeeList');
const app = new express();

app.use(express.static(path.join(__dirname + '/dist/FrontEnd')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Task2: create mongoDB connection 
mongoose.connect('mongodb+srv://Stebin:Stebin00@cluster0.ub6rc3f.mongodb.net/Employee?retryWrites=true&w=majority', { useNewUrlParser: true });

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'

app.get("/api/employeelist", (req, res) => {
    EmployeeModel.find(async (err, data) => {
        if (err) {
            await res.send(err);
        } else {
            await res.send(data);
        }
    })
})


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', (req, res) => {
    let id = req.params.id;
    EmployeeModel.findById({
        "_id": id
    }, async (err, data) => {
        if (err) {
            await res.send(err);
        } else {
            await res.send(data);
        }
    })
})



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post("/api/employeelist", async (req, res) => {
    let data = req.body;
    let employee = new EmployeeModel(data);
    await employee.save(async (err, data) => {
        if (err) {
            await res.send(err)
        } else {
            await res.send(data)
        }
    })
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findByIdAndDelete({
        "_id": id
    }, async (err, data) => {
        if (err) {
            await res.send(err);
        } else {
            await res.send(data);
        }
    })
})



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', async (req, res) => {
    let id = req.body._id;
    var data = req.body;
    EmployeeModel.findByIdAndUpdate({
        "_id": id
    }, await data, async (err, data) => {
        if (err) {
            await res.send(err);
        }
        else {
            await res.send(data);
        }
    })
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



app.listen(3000, () => {
    console.log("Server is running on the PORT 3000");
})