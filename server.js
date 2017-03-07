const express = require('express');
const swig = require('swig');
const path = require('path');

swig.setDefaults({cache:false});

const conn = require('./db');
const model = conn.model;
const User = model.User;
const app = express();

app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.get('/', (req,res,next)=>{
	let list={};
	User.findAll()
	.then(users => users.forEach(user=>{
		if(list[user.name[0]]===undefined){
			list[user.name[0]]=1;
		}
		else{list[user.name[0]]++}
	}))
	.then(list=>  User.findAll())
	.then(result => res.render('_user',{result,list}))

});

app.get('/user/filter/:letter', (req,res,next)=>{
	User.findAll()
	.then(users =>users.filter(ele=>User.filterUser(ele,req.params.letter)))
	.then(result => res.render('_filter',{filteredUsers:result}))
	.catch(e=>console.log(e))
});

app.post('/regenerate',(req,res,next)=>{
	conn.seed()
	.then(newUser =>res.redirect('/'))
	.catch(e => console.log(e));
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening on port ${port}`));

conn.seed()
.then(()=>console.log('seeding'));