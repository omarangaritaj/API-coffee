const express = require("express");
const cors = require("cors");
const { dbConection } = require("../databases/config");


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.authPath = "/api/auth";
        this.categoriesPath = "/api/categories";
        this.productPath = "/api/products";
        this.usersPath = "/api/users";
        this.defaultPath = "*";

        // Connect with the database
        this.connectionDB();

        // Middlewares
        this.middlewares();

        // Routes of the aplication
        this.routes();
    }

    routes() {
        this.app.use(this.authPath, require("../routes/auth.route"));
        this.app.use(this.categoriesPath, require("../routes/categories.route"));
        this.app.use(this.productPath, require("../routes/product.route"));
        this.app.use(this.usersPath, require("../routes/users.route"));

        // If doesnt exist a path send a 404 error
        this.app.use(this.defaultPath, require("../routes/default.route"));
    }

    async connectionDB() {
        await dbConection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        //Expose "public" folder
        this.app.use(express.static("public"));
        // Reading and parser body
        this.app.use(express.json());
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listen on port ${this.port}`);
        });
    }
}

module.exports = Server;