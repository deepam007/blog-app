const mongoose = require('mongoose');

const dbconnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            // useCreateIndex: true,
            // useFindAndModify: false,
            // useUnifiedTopology: true,
            // useNewUrlParser: true
        });
        console.log("Connected to MongoDB");
    }catch(error){
        console.log(error);
    }
}

module.exports=dbconnect;