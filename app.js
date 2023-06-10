const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.route('/').get((req, res) => {
	res.send('<h1>Helloo</h1>');
});
app.listen('3000');
