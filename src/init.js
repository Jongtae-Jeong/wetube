import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
dotenv.config();

import app from "./app";


import "./models/Video";
import "./models/User";
import "./models/Comment";




const PORT = process.env.PORT || 4000;

const HandleListening = () => console.log(`Listening on : http://localhost:${PORT}`);

app.listen(PORT, HandleListening);