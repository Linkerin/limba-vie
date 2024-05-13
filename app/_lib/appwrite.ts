import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('660168c71b064afac3a4');

export const databases = new Databases(client);

export const account = new Account(client);
export { ID } from 'appwrite';
