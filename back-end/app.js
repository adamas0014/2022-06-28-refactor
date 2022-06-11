
const express = require('express')
require('./Database/mongoose')
const userRouter = require('./Src/Routers/user')
const app = express()


let cors = require("cors");
app.use(cors({origin: "*"}));
const port = process.env.PORT || 4000



app.use(express.json())
app.use(userRouter)







app.listen(port, () => {
    console.log('server is up on port ' + port)
})

