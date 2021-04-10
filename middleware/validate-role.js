const { request, response } = require('express');


const isAdminRole = async(req = request, res = response, next) => {

    const roleUsuario = req.user.role;
    if (roleUsuario !== 'ADMIN_ROLE') {
        return res.status(401).json({ msg: "User Unauthorized" });
    }

    next();
}

const hasRole = (...resto) => {


    return (req = request, res = response, next) => {

        console.log(resto);
        if (!resto.includes(req.user.role)) {
            return res.status(401).json({ msg: "User Unauthorized" });
        }

        next();
    };
    // if req.user.role

}


module.exports = {
    isAdminRole,
    hasRole
}