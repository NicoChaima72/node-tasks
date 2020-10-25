/**
 * * PORT * */

process.env.PORT = process.env.PORT || 3000;

/**
 * *  ENTORNO * */

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

/**
 *  * CONEXION MONGO * */

let urlDB;
if (process.env.NODE_ENV === "dev") {
	urlDB = "mongodb://127.0.0.1:27017/nodetasks";
} else {
	urlDB = process.env.MONGO_URI;
	// heroku config:set MONGO_URI="mongodb+srv://master:207229865@cluster0.hff0l.mongodb.net/cafe?retryWrites=true&w=majority";
}

process.env.URLDB = urlDB;
