const mongoose = require('mongoose');
const connectionQRL = "mongodb://127.0.0.1:27017/spacex";

try {
    mongoose.connect(connectionQRL);
    console.log('Connection has successfully established');
}
catch (err: unknown) {
    console.log('Connection failed');
}