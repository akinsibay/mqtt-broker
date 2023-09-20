import {
  Client,
  ConnackPacket,
  PingreqPacket,
  PublishPacket,
  PubrelPacket,
  Subscription,
} from "aedes";
import Aedes from "aedes/types/instance";

export default function packetListener(aedes: Aedes) {
  aedes.on("subscribe", (subscriptions: Subscription[], client: Client) => {
    console.log(`${client.id} --> SUBSCRIBED TOPIC:`);
    console.log(subscriptions);
  });

  // emitted when a client unsubscribes from a message topic
  aedes.on("unsubscribe", (subscriptions: string[], client: Client) => {
    console.log(`${client.id} -->> UNSUBSCRIBED TOPICS:`);
    console.log(subscriptions);
  });

  // emitted when a client publishes a message packet on the topic
  aedes.on("publish", (packet: PublishPacket, client: Client | null) => {
    if (client) {
      console.log("------MESSAGE PUBLISHED-----");
      const data = {
        client: client.id,
        ...packet,
      };
      console.log(data);
      console.log("----------------------------");
    }
  });

  // Emitted when server sends an acknowledge to client.
  aedes.on("connackSent", (packet: ConnackPacket, client: Client) => {
    console.log(`${client.id} --> SENT CONNACK: `);
    console.log(packet);
  });

  // Emitted an QoS 1 or 2 acknowledgement when the packet successfully delivered to the client.
  aedes.on("ack", (packet: PublishPacket | PubrelPacket, client: Client) => {
    console.log(`${client.id} --> SENT ACK: `);
    console.log(packet);
  });

  // Emitted when client sends a PINGREQ.
  aedes.on("ping", (packet: PingreqPacket, client: Client) => {
    console.log(`${client.id} --> SENT PING`);
  });
}
