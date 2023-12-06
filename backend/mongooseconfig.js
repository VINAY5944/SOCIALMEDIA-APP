
const mongoose=require('mongoose');

const connection=async()=>{
      
try {

 const connect=await mongoose.connect("mongodb+srv://vinay1:qwerty123@cluster0.bukhvfq.mongodb.net/socialmedia_app?retryWrites=true&w=majority"
)
console.log('database is set');

} catch (error) {
    console.log(`${error}`);
    process.exit()
}
}
module.exports=connection;