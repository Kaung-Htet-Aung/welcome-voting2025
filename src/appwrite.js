import { Client, Databases, Query, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("676e59c6000b84885e72");
export const database = new Databases(client);
export const account = new Account(client);
export default Query;