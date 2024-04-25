import express from "express"
import dotenv from "dotenv"
import logger from 'morgan'
import cors from "cors";
import { db } from "./db/db_connection"
import movi_routes from "./routes/movi_routes"

dotenv.config()

const { PORT } = process.env
const app = express()

app.use(cors())
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({extended:false}))

app.use('/', movi_routes)


db.sync()
  .then(() => {
    console.log("Database is connected SUCCESSFULLY");
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})





















