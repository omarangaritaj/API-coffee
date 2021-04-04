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
        throw new Error("Problemas en la conexión con la base de datos");
    }
};

module.exports = {
    dbConection,
};