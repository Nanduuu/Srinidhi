const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();


router.post('/',function(req,res){

var con = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "root",
		  database: "test"
		});

		con.connect(function(err) {
		  if (err) {
		  			console.log(err);
		  			res.send({success:false,msg:'Issue at conncting database'});
		  	}else{
		  		console.log(req.body);
		  		

		  		 var sql = 'insert into client (ct_name, ct_id, ct_add, ct_branch, ct_pin) values' +
		  		 			'("'+ req.body.Data.ct_name +'","' +req.body.Data.ct_id +'","'+ req.body.Data.ct_add +'","'+req.body.Data.ct_branch +'","'+ req.body.Data.ct_pin +'")';
		  		
 						console.log (sql);						
		  		 con.query(sql, function(err,result){
		  			console.log(err);
		  			console.log(result);
		  			if(err){
		  				if(err.code === 'ER_DUP_ENTRY'){
		  					con.end();
		  					res.send({success:false, msg:"Client alreday exists"});
		  				}else{
		  					con.end();
		  					res.send({success:false, msg:"Issue with database"});
		  				}
		  				
		  			}else {
		  				if(result){
		  				con.end();
		  				res.send({success:true,msg:"Client Added Successfully"});
		  			}
		  			}
		  		})
	
		  	}
		   });
});


module.exports = router;