const { Schema, model } = require("mongoose");


const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, "The name of Product is required"],
        unique: true
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    categorie: {
        type: Schema.Types.ObjectId,
        ref: "Categorie",
        required: true
    },
    available: {
        type: Boolean,
    }
});

ProductSchema.methods.toJSON = function() {
    const { __v, state, ...categorie } = this.toObject();
    return categorie;
};

module.exports = model("Product", ProductSchema);