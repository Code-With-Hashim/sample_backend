require('dotenv').config()
const express = require('express')
const cors = require('cors')

const { connect } = require("./config/db")
const PORT = process.env.PORT

const { UserRoutes } = require('./routes/authentication/authenticate.routes')
const { NotesRoutes } = require('./routes/notes/notes.routes')

const app = express()
app.use(express.json())
app.use(cors({
    origin : "*"
}))
app.use("/", UserRoutes)
app.use("/notes" , NotesRoutes)



app.listen(PORT, async () => {
    try {
        await connect
        console.log("Database is connected Successfully");
        console.log('Listening on http://localhost:8080')
    } catch (error) {
        console.log(error)
    }
})