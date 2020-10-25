require("./config/config");

const mongoose = require("mongoose");

mongoose
	.connect(process.env.URLDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then((db) => {
		console.log("DB is connected");
	})
	.catch((err) => console.log(err));
