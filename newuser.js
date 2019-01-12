const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();
var md5 = require('md5');


router.post('/',function(req,res){

	var con = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "root",
		  database: "test"
		});

			var  encrypt = md5(req.body.Pword);
			console.log(md5(req.body.Pword));

		con.connect(function(err) {
		  if (err) {
		  			console.log(err);
		  			res.send({success:false,msg:'Issue at conncting database'});
		  	}else{
		  		console.log(req.body);
		  		

		  		 var sql = 'insert into user (Emailid, Fname, Lname, Tel, Pword, role) values' +
		  		 			'("'+ req.body.Email +'","' +req.body.Fname +'","'+ req.body.Lname +'","'+req.body.Tel +'","'+ encrypt +'","'+ "staff"+'")';
		  		
 												
		  		 con.query(sql, function(err,result){
		  			console.log(err);
		  			console.log(result);
		  			if(err){
		  				if(err.code === 'ER_DUP_ENTRY'){
		  					con.end();
		  					res.send({success:false, msg:"Email Id already exists"});
		  				}else{
		  					con.end();
		  					res.send({success:false, msg:"Issue with database"});
		  				}
		  				
		  			}else {
		  				if(result){
		  				con.end();
		  				res.send({success:true,msg:"User regestration successful"});
		  			}
		  			}
		  		})
	
		  	}
		   });

})

module.exports = router;