const { Schema, model } = require("mongoose");


const CategorieSchema = Schema({
    name: {
        type: String,
        required: [true, "The name of categorie is required"],
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

CategorieSchema.methods.toJSON = function() {
    const { __v, ...categorie } = this.toObject();
    return categorie;
};

module.exports = model("Categorie", CategorieSchema);