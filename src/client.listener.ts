import { Client } from "aedes";
import Aedes, { AuthenticateError } from "aedes/types/instance";
import { users } from "./helpers";

export default function connectionListener(aedes: Aedes) {
  aedes.authenticate = (
    client: Client,
    username: Readonly<string | undefined>,
    password: Readonly<Buffer | undefined>,
    done: (error: AuthenticateError | null, success: boolean | null) => void
  ) => {
    try {
      console.log(`${client.id} --> AUTHENTICATING... `);
      console.log(client.id);
      const userPass = password?.toString();

      const isUsernameValid = users.some((user) => user.username === username);
      const isPasswordValid = users.some((user) => user.password === userPass);

      if (isUsernameValid && isPasswordValid) {
        return done(null, true);
      } else {
        console.log(
          `${client.id} --> AUTHENTICAION FAILED. INVALID USER CREDENTIALS. `
        );
        return done(null, false);
      }
    } catch (error) {
      console.log(
        `${client.id} --> AUTHENTICAION FAILED. CREDENTIALS ARE NULL.`
      );
    }
  };

  // emitted when the client registers itself to server. Its connecting state equals to true.
  aedes.on("client", (client: Client) => {
    console.log(`${client.id} --> CONNECTING...`);
  });

  // emitted when the client has received all its offline messages and be initialized. The client connected state equals to true and is ready for processing incoming messages.
  aedes.on("clientReady", (client: Client) => {
    console.log(`${client.id} --> CONNECTED`);
  });

  // emitted when an error occurs.
  aedes.on("clientError", (client: Client, error: Error) => {
    console.log(`CLIENT ERROR --> ${client.id} - ${error.stack}`);
  });

  // emitted when an error occurs. Unlike clientError it raises only when client is uninitialized.
  aedes.on("connectionError", (client: Client, error: Error) => {
    console.log(`CONNECTION ERROR --> ${client.id} - ${error.stack}`);
  });

  // emitted when a client disconnects from the broker
  aedes.on("clientDisconnect", (client: Client) => {
    console.log(`${client.id} --> DISCONNECTED`);
  });

  // emitted when timeout happens in the client keepalive.
  aedes.on("keepaliveTimeout", (client: Client) => {
    console.log(`${client.id} --> KEEP ALIVE TIMEOUT`);
  });
}
