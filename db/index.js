const conn = require('./_conn');
const User = require('./User');
const faker = require('faker');

const sync = ()=>{
	return conn.sync({force:true});
}
const seed = ()=>{
	return sync()
	.then(()=>{
		for(var i=0;i< 25; i++){
			User.create({
				name:faker.name.findName(),
				location: [faker.address.latitude(),faker.address.longitude()]
			});
		}
	})
}

module.exports={
	sync,
	seed,
	model:{User}
}
