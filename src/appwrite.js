import { Client, Databases, Query, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67792f2600013311bcc9");
export const database = new Databases(client);
export const account = new Account(client);
export default Query;