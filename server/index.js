require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router/index');
const fileUpload = require('express-fileupload');
const filePathMiddleware = require('./middlewares/filepath.middleware');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(fileUpload({}));
app.use(filePathMiddleware(path.resolve(__dirname, 'images')));
app.use(express.static('images'));
app.use(cors({
	credentials: true,
	origin: [process.env.CLIENT_URL]
}));
app.use(router);

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		app.listen(PORT, console.log('Success ' + PORT));
	} catch (error) {
		console.log(error);
	}
}
start();