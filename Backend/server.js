const express = require('express')
const imageRoute = require('./Routes/imageRoute.js')
const userRoute = require('./Routes/userRoute.js')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({ path: "./Config/.env" })
const connectDB = require('./Config/database.js');
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();
app.use(express.json());
app.use(cors());

app.use('/api/image', imageRoute);
app.use('/api/user', userRoute);


app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})
