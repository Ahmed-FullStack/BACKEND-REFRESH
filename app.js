require('dotenv').config();
const express = require('express');
const app = express();
const ejs = express('ejs')
const https = require('https')
const mongoose = require('mongoose');
const name = require(__dirname + '/names.js');
app.use(express.urlencoded({ extended: true }));
app.use('/', name);
app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/public', { index: false }));
mongoose.connect('mongodb://localhost:27017/ahmedDB');
const peopleSchema = new mongoose.Schema({
	name: String,
});
const People = new mongoose.model('People', peopleSchema);
const peopleOne = new People({
	name: 'ahmed',
});
https.get('https://swapi.dev/api/starships/9/', response => {
	if(response.statusCode){}
	response.on('data',data=>{
		console.log(JSON.parse(data).name);
	})
})
app.route('//').get((req, res) => {
	People.find({}).then(peoples => {
		if(peoples.length === 0 ){
			peopleOne.save().catch(err => {
				if(!err) {
					res.redirect('/')
				}
			});
		} else {
			res.render('index.ejs', { peoples: peoples})
		}
	});
});

app.listen('3000');
