const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const dbconnect=require('./config/db/dbconnect');
const userRoutes = require('./routes/users/userRoutes');
const { errorHandler ,notFound} = require('./middlewares/error/error');
const postRoute = require('./routes/posts/postRoutes');
const commentRoutes = require('./routes/comments/commentRoutes');
const categoryRoute = require('./routes/category/categoryRoutes');
const emailMsgRoute = require('./routes/emailMsg/emailMsgRoutes');
const cors=require('cors');

const app=express();
dbconnect();

//middleware
app.use(express.json());

//cors
app.use(cors());

app.use('/api/users',userRoutes);
app.use("/api/posts",postRoute);
app.use("/api/comments",commentRoutes);
app.use("/api/category",categoryRoute);
//email msg
app.use("/api/email",emailMsgRoute );





//error hanle
app.use(notFound);
app.use(errorHandler);
//server
const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`port is running ${PORT}`));