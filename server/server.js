const express = require("express");
const cors = require("cors");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = "/api/users";
        this.defaultPath = "*";

        // Middlewares
        this.middlewares();

        // Routes of the aplication
        this.routes();
    }

    routes() {
        this.app.use(this.usersPath, require("../routes/users.route"));

        // If doesnt exist a path send a 404 error
        this.app.use(this.defaultPath, require("../routes/default.route"));
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