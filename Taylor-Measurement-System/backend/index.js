// main index.js File

import express from "express"
import { dbConnect } from "./src/db/index.js"
import cors from "cors"


const app = express()

app.use(cors())    
app.use(express.json())

const port = process.env.PORT || 8000

dbConnect()
    .then(() => {

        app.listen(port, () => {
            console.log(`Server running on port ${port}.`);
        })

    })
    .catch((err) => {

        console.error("DB Connection Error In Route File", err)

    })

// import routes from router folder

import taylorRouter from "./src/routes/taylor.route.js"   

app.use("/api/v1/taylors", taylorRouter)

