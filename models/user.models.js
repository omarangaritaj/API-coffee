const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El email es obligatorio"]
    },
    password: {
        type: String,
        required: [true, "El pasword es obligatorio"]
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    google: {
        type: Boolean,
        default: false
    },
    state: {
        type: Boolean,
        default: true
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, password, google, _id, ...user } = this.toObject();
    user.uid = _id
    return user;
}

module.exports = model("User", UserSchema)