const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = require('url');
const querystring = require('querystring')
mongoose.connect('mongodb://127.0.0.1:27017/user');
let infoSchema = new mongoose.Schema({
	username:String,
	password:String,
	confirm:String,
	phoneNum:String
});
let info = mongoose.model('info',infoSchema);
const app = express();
app.use(bodyParser());

app.post('/zhuce',(req,res)=>{
	let username = req.body.username;
	let password = req.body.password;
	let confirm  = req.body.confirm ;
	let phoneNum = req.body.phoneNum;
	info.create({username:username,password:password,confirm:confirm,phoneNum:phoneNum},(err,data)=>{
		console.log(data);
	})
	res.setHeader('Content-Type',"text/html;charset='utf-8'");
	if(password === confirm&&username!==""&&password!==""){		
		res.redirect("http://localhost:8080/#/login");
	}else{
		res.redirect("http://localhost:8080/#/error");
	}
	
});
app.post('/login',(req,res)=>{
	let username = req.body.username;
	let password = req.body.password;
	info.find({username:username,password:password},(err,data)=>{
		if(err){
			console.log(err);
			return;
		}
		res.setHeader('Content-Type',"text/html;charset='utf-8'");
		if(data.length>0&&username!==""&&password!==""){
			res.redirect('http://localhost:8080/#/user');
		}else{
			res.redirect('http://localhost:8080/#/login');
		}
	})
});
app.listen(8888);