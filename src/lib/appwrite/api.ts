import { INewPost, INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, Query } from "appwrite";
import { useUserContext } from "@/context/authContext";

export const result = avatars.getInitials();

export async function createNewUser(user: INewUser) {
    try {
        const newUser = await account.create(ID.unique(), user.email, user.password, user.name)

        if (!newUser) return Error;

        const userAvatar = avatars.getInitials(user.name)
        const dbUser = await saveUserToDb({
            accountId: newUser.$id,
            name: newUser.name,
            email: newUser.email,
            imageUrl: userAvatar,
            username: user.username
        })

        return dbUser;
    } catch (error) {
        console.log('createNewUser :: error : ', error);
        return error
    }
}



export async function saveUserToDb(user: {
    accountId: string,
    name: string,
    email: string,
    imageUrl: URL,
    username?: string
}) {
    try {
        const storeInDbUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.user_bucketId,
            ID.unique(),
            user,
        )
        return storeInDbUser
    } catch (error) {
        console.log(error)
    }
}

export async function signInAccount(user: { email: string, password: string }) {
    try {
        const session = await account.createEmailSession(user.email, user.password)
        return session;

    } catch (error) {
        console.log(error)
        return error;
    }
}

export async function checkForCurrentUser() {
try {
        const userDetails = await account.get() 
        return userDetails
} catch (error) {
    console.log(error)
}
}

export async function getCurrentUser() {
    try {
        const userDetails = await account.get()
        if (!userDetails) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.user_bucketId,
            [Query.equal('accountId', userDetails.$id)]
        )
        if (!currentUser) throw Error


        //returns all data of user 
        return currentUser.documents[0];

    } catch (error) {
        console.log(error)
    }
}


// appwrite function to sign out the existing user

export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    // Log the error details
    console.error('Error signing out:', error);

}
}



// Posts Services



export async function uploadFile(file: File) {
    try {
        const fileUpload = storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        )
        return fileUpload
    } catch (error) {
        console.log(error)
        return error
    }
}

// get file preview with appwrite

export function getFilePreview(fileId: string) {
    try {
        const filePreview = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            'top',
            100
        )
        if (!filePreview) throw Error;
        return filePreview
    } catch (error) {
        console.log(error)
    }
}

export async function createNewPost(post: INewPost) {
    try {

        // upload file to appwrite storage
        const uploadImage:any = await uploadFile(post.file[0])
        if (!uploadImage) throw Error;

        //get file url from getfilePrevier
        const imageUrlByPreview = getFilePreview(uploadImage.$id)
        if (!imageUrlByPreview) {
            await storage.deleteFile(appwriteConfig.storageId, uploadImage.$id)
        }
        if (!getFilePreview) throw Error;
        const tags = post.tags?.replace(/ /g, "").split(",") || [];
        console.log('imageId', uploadImage,"posts",post)
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.post_bucketId,
            ID.unique(),
            {
                // creator: post.userId,
                caption: post.caption,
                imageUrl: imageUrlByPreview,
                imageId: uploadImage.$id,
                location: post.location,
                tags: tags,
            })

            if (!newPost) {
                await storage.deleteFile(appwriteConfig.storageId,uploadImage.$id);
                throw Error;
              }
          

    }
    catch (error) {
        console.log(error);

    }
}

export async function getRecentPost(){
    const posts=await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.post_bucketId,
        [Query.orderDesc('$createdAt'),Query.limit(30)]
    )
    if(!posts) throw Error;
    return posts
}



// like post 
// export async function likePost(postId:string,likesArray:string[]){
//     try {
//            const updatedPost=await databases.updateDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.post_bucketId,
//             postId,
//             {likes:likesArray},
//         )
//         if(!updatedPost) throw Error;
//         return updatedPost

//     } catch (error) {
//     console.log(error);
    
//     }
// }
//list all liked post



export async function likePost(postId: string, likesArray: string[]) {
    try {
        // Update the document in the database
        console.log('-----------------appwrite-----------------------')
        console.log('like array got : ', likesArray)
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.post_bucketId,
            postId,
            { likes: likesArray }
            );

        if (!updatedPost) {
            throw new Error('Failed to update post');
        }
        console.log('like  updated: ', updatedPost)

        return updatedPost;
    } catch (error) {
        console.error(error);
    }
}


export async function SavePost(postId:string,userId:string){
    try {
        const savePost=await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.save_bucketId,
            ID.unique(),
            {
                user:userId,
                post:postId
            }
        )
        if(!savePost) throw Error;
        return savePost

    } catch (error) {
    console.log(error);
    
    }
}

export async function deleteSavePost(saveRecordId:string){
    try {
        const deleteSavedPost=await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.save_bucketId,
            saveRecordId
        )
        
        if(!deleteSavedPost) throw Error;
        return {status:'ok'}

    } catch (error) {
    console.log(error);
    
    }
}

export async function allLikes(postId:string){
    try {
        const likes=await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.post_bucketId,
            [Query.equal('imageId',postId)]
        )
            return likes.documents[0].likes.length;
    } catch (error) {
        console.log(error);
    }
}