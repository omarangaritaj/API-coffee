const { Schema, model } = require("mongoose");


const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, "The name of category is required"],
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
    }
});

CategorySchema.methods.toJSON = function() {
    const { __v, state, ...category } = this.toObject();
    return category;
};

module.exports = model("Categorie", CategorySchema);