const conn = require('./_conn');
const faker = require('faker');

const User = conn.define('user',{
	name : conn.Sequelize.STRING,
	email : conn.Sequelize.STRING,
	location : conn.Sequelize.ARRAY(conn.Sequelize.FLOAT)
}, {
	classMethods:{
		filterUser:function(user,letter){
			return user.name[0]===letter.toUpperCase();	
		}

	},
});

module.exports=User;