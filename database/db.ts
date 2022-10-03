import mongoose  from 'mongoose';

/*
 0: disconnected
 1: connected
 2: isconnecting
 3. isdisconnecting
*/
const moongoseConnection = {
    isConnected: 0,
};

const DB_CONNECTION:string=process.env.MONGO_DB_CONNECTION || '';

export const connect = async () => {
    if (moongoseConnection.isConnected) {
        console.log('already connected');
    } else {
        await mongoose.connect(DB_CONNECTION);
        moongoseConnection.isConnected = 1;
        console.log('connected to Mongo DB: ', DB_CONNECTION);
    }

    // if (mongoose && mongoose.connections.length > 0) {
    //     moongoseConnection.isConnected = mongoose.connections[0].readyState;

    //     if (moongoseConnection.isConnected === 1) {
    //         console.log('already connected');
    //         return;
    //     }

    //     await mongoose.disconnect();
    // }

};

export const disconnect = async () => {
    if (moongoseConnection.isConnected === 0) return;

    moongoseConnection.isConnected = 0;
    await mongoose.disconnect();
    console.log('disconnected from Mongo DB: ', DB_CONNECTION);
};