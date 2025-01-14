import { Account, Client } from "node-appwrite";


export const { PROJECT_ID, API_KEY, NEXT_PUBLIC_ENDPOINT: ENDPOINT } = process.env;

export const client = new Client();

client.setProject(PROJECT_ID!).setKey(API_KEY!).setEndpoint(ENDPOINT!);

export const account = new Account(client) 
