import fs from "fs";

export const users = [
  {
    username: "unity0",
    password: "1234",
  },
  {
    username: "test_user",
    password: "1234",
  },
];

export const createResponseTopic = (requestTopic: string): string => {
  const deviceSerialNumber = requestTopic.split("/")[2];
  const transactionType = requestTopic.split("/")[3];
  return `server/response/${deviceSerialNumber}/${transactionType}`;
};

export const convertNumberTo4ByteBuffer = (num: number): Buffer =>
  Buffer.from([
    (num >> 24) & 255,
    (num >> 16) & 255,
    (num >> 8) & 255,
    num & 255,
  ]);

export const longToByteArray = (long: number): number[] => {
  // we want to represent the input as a 4-bytes array
  const byteArray = [0, 0, 0, 0];

  for (let index = 0; index < byteArray.length; index++) {
    const byte = long & 0xff;
    byteArray[index] = byte;
    long = (long - byte) / 256;
  }

  return byteArray;
};

export const getNumberFromRangeOfArray = (
  data: any[] | Buffer,
  from: number,
  to: number
): number => {
  // get only position uint8 array from the full data
  const array = data.slice(from, to);
  // convert position uint8 array into number

  return Buffer.from(array).readUIntBE(0, array.length);
};

export const logger = (message: string): void => {
  fs.appendFileSync(
    "./error.log",
    `\n ${message} - ${new Date().toLocaleString()}`
  );
};
