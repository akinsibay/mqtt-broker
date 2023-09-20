/* eslint-disable @typescript-eslint/no-var-requires */
import Aedes from "aedes";
import clientListener from "./client.listener";
import packetListener from "./packet.listener";

// ? Aedes documentation ->
// ? https://github.com/moscajs/aedes/blob/c9bddd396ab5889917b40fded29e0d2d541c6d44/docs/Aedes.md#event-unsubscribe

const aedes = new Aedes();

const server = require("net").createServer(aedes.handle);

const port = 5400;

server.listen(port, () => {
  console.log("server started and listening on port ", port);
  clientListener(aedes);
  packetListener(aedes);

  setInterval(() => {
    console.log("Connected clients: ", aedes.connectedClients);
  }, 1000);
});
