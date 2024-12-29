const {
  addUserHandler,
  getUserByIDHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("./handler");

const routes = [
  { method: "GET", path: "/user", handler: getUserHandler },
  { method: "GET", path: "/user/{id}", handler: getUserByIDHandler },
  { method: "POST", path: "/user", handler: addUserHandler },
  { method: "PUT", path: "/user/{id}", handler: updateUserHandler },
  { method: "DELETE", path: "/user/{id}", handler: deleteUserHandler },
];
module.exports = routes;
