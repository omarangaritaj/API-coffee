const mongoose = require("mongoose");

const dbConection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CNN_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("On line database");

    } catch (error) {
        console.log(err);
        throw new Error("Trobble with a Data Base connection");
    }
};

module.exports = {
    dbConection,
};