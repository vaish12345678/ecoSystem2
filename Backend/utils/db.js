// import mongoose from "mongoose";

// const connectDb= async()=>{
//     try{
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log("mongodb connected");
//     }catch(error){
//         console.log(error);
//     }
// }




// export default connectDb;
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDb;

