const hapi = require("@hapi/hapi");
const routes = require("./routes");
require("dotenv").config();
const initServer = async () => {
  const server = hapi.server({
    host: "localhost",
    port: process.env.PORT || 3000,
    routes: { cors: { origin: ["*"] } },
  });
  server.route(routes);
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};
initServer();
