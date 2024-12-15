import {Client ,Account,Databases,Storage,Avatars} from 'appwrite'

export const appwriteConfig={
    projectId:import.meta.env.VITE_APPWRITE_PROJECTID,
    endpoint:import.meta.env.VITE_APPWRITE_ENDPOINT,
    databaseId:import.meta.env.VITE_APPWRITE_DATABASEID,
    storageId:import.meta.env.VITE_APPWRITE_STORAGE_ID,
    // buckets id//
    save_bucketId:import.meta.env.VITE_APPWRITE_SAVES_COLLECTIONID,
    user_bucketId:import.meta.env.VITE_APPWRITE_USERS_COLLECTIONID,
    post_bucketId:import.meta.env.VITE_APPWRITE_POSTS_COLLECTIONID,    
}
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('660d48b844c546c96396');
export const account=new Account(client)
export const databases=new Databases(client)
export const storage=new Storage(client)
export const avatars=new Avatars(client)

