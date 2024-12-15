import { INewPost, INewUser } from '@/types'
import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query'
import { SavePost, createNewPost, createNewUser, deleteSavePost, getCurrentUser, getRecentPost, likePost, signInAccount, signOutAccount } from '../appwrite/api'
import { QUERY_KEYS } from './queryKeys'


// Sign up user
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createNewUser(user),
    })
}

// log in / sign in user
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string,
            password: string
        }) => signInAccount(user),
    })
}

// SignOut User
export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: () => signOutAccount(),
    })
}

// create post
export const useCreatePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (post: INewPost) => createNewPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            })
        }
    })
}

//get posts

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPost,
    });
};


export const useLikesPost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ postId, likesArray }: { postId: string, likesArray: string[] }) => likePost(postId, likesArray),
        onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID,data?.$id],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            })
        }
            
})  
}

export const useSavedPost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ postId,userId }: { postId: string, userId: string}) => SavePost(postId, userId),
        onSuccess:()=>{
     
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            })
        }
            
})  
}
export const useDeleteSavedPost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ savedRecordId }: { savedRecordId:string}) => deleteSavePost(savedRecordId),
        onSuccess:()=>{
     
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            })
        }
            
})  
}
export const useGetCurrentUser = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      queryFn: getCurrentUser,
    });
  };
  




