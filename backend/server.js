const express=require('express');
const dotenv=require('dotenv')
const connection = require('./mongooseconfig');
const router=require('./routes/authRoutes')
const cors=require('cors')

connection()

const app=express();



app.use(express.static('public'))
app.use('/image1',express.static('image1'))
app.use('/image2',express.static('image2'))

app.use(express.json());
// 
app.use(cors());


app.use("/",router);

const port=process.env.Port||5001 ;

app.listen(port,console.log(`post is set ${port}`));

