import mongoose from 'mongoose';
let isconnected = false; // trace connection 


export const connectTODB = async() => {
    mongoose.set('strictQuery', true)
    if(isconnected){
        console.log("Mongodb is already connected!")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'share-prompts',
            useNewUrlParser : true,
            useUnifiedTopology: true,
        });

        isconnected = true;
    } catch (error) {
        console.log(error)
    }
}
