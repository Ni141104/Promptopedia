import mongoose from "mongoose";

let isConnected=false;//track the connection


export const connectToDB=async()=>{
    mongoose.set('strictQuery',true)//because of this, we can ensure that the query must not diffrent from the schema
    if(isConnected)
        {
            console.log('Mongo DB is already connected');
            return;
        }

        try {
            await mongoose.connect(process.env.MONGODB_URL,{
                dbName:"share_prompt",
                useNewUrlParser:true,
                useUnifiedTopology:true,
            })

            isConnected=true;

            console.log('Mongo Db connected successfully')
        } catch (error) {
            console.log(error);
        }
}
