"use server";

import { ID, Query, Users } from "node-appwrite";
import { account, client } from "../appwrite.config";

const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

// Function to create a new user
export const createUser = async (user: CreateUserParams) => {
  try {
    // Create a new user with email and password
    const newUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    console.log("New User Created:", newUser);
    return parseStringify(newUser);
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error?.code === 409) {
      // Handle conflict error if the user already exists
      try {
        // Fetch existing user with the same email
        const existingUsers = await account.listSessions(); // Updated usage
        const existingUser = existingUsers.sessions.find(
          (session) => session.providerUid === user.email
        );

        if (existingUser) {
          console.log("Existing User Found:", existingUser);
          return existingUser;
        }

        throw new Error("User exists but could not be retrieved.");
      } catch (listError) {
        console.error("Error fetching existing user:", listError);
        throw new Error("Failed to fetch existing user after conflict");
      }
    }

    throw new Error("Failed to create user");
  }
};

interface LoginParams {
  email: string;
  password: string;
}

// Function to log in a user
export const loginUser = async ({
  email,
  password,
}: LoginParams): Promise<any> => {
  try {
    // Create a session using email and password
    const session = await account.createEmailPasswordSession(email, password);

    console.log("User Logged In:", session);
    return parseStringify(session);
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error("Invalid email or password");
  }
};

const users = new Users(client);
// Function to retrieve user data by user ID
export const getUser = async (userId: string) => {
  try {
    // Get user details by their ID
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user");
  }
};
