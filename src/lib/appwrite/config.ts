import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.APPWRITE_PROJECT_ID,
}

export const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1');
client.setProject('65684bef12129a34b1cf');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

