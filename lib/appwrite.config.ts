import { Account, Client } from "node-appwrite";

export const { PROJECT_ID, API_KEY, NEXT_PUBLIC_ENDPOINT: ENDPOINT } = process.env;

// Validate environment variables


export const client = new Client();

client.setProject(PROJECT_ID!).setKey(API_KEY!).setEndpoint(ENDPOINT!);

export const account = new Account(client);

console.log("PROJECT_ID:", process.env.PROJECT_ID);
console.log("API_KEY:", process.env.API_KEY);
console.log("NEXT_PUBLIC_ENDPOINT:", process.env.NEXT_PUBLIC_ENDPOINT);

