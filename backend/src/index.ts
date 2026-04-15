import express from "express";
import cors from "cors"

import { ENV } from "./config/env";

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true })); // allow frontend to access backend
app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: true })) // parses form data (like html forms)

 
app.listen(ENV.PORT, () => {
  console.log("Server is running on PORT:", ENV.PORT);
});
