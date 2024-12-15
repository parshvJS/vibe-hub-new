// import { useState } from "react";
// import { useDeleteSavedPost, useGetCurrentUser, useLikesPost, useSavedPost } from '@/lib/React-Query/querysAndMutation'
// import { Models } from 'appwrite'
// import React, { useEffect } from 'react'

// const PostStats = ({ post, userId }: { post: Models.Document, userId: string }) => {

//     // cant unlike the post (svg not updating ) ✅
//     // database: duplicate saves
//     //
//     //cant unsave the post (react function) 
//     //svg not chaning (state)


//     const postLikes = post.post.post.post.likes.map((userLiked: Models.Document) => userLiked.$id);
//     const { mutate: likedPost, isPending: isLikingPost } = useLikesPost();
//     const { mutate: savePost, isPending: isSavingPost } = useSavedPost();
//     const { mutate: deleteSavedPost, isPending: isdeletingSavingPost } = useDeleteSavedPost();

//     const [likes, setLikes] = useState(postLikes);
//     const [saved, setSaved] = useState(false);

//     const { data: currentUser } = useGetCurrentUser()

//     // Moved useEffect outside of the savedPostRecord definition

// var savedPostRecord = currentUser?.save.find(
//         (record: Models.Document) => record.post.post.$id === post.post.$id
//       );



//     // const handleLikes = (e: React.MouseEvent) => {
//     //     console.log('post like :',postLikes)
//     //     const newLikes = [...likes];
//     //     console.log('---------react post state---------------\n before like :',newLikes)
//     //     if (newLikes.includes(userId)) {
//     //         const updatedLikes = newLikes.filter((id) => id !== userId);
//     //         setLikes(updatedLikes);
//     //         console.log('after remove(if) like :',likes)
//     //     }
//     //     else {
//     //         newLikes.push(userId);
//     //         setLikes(newLikes);
//     //         console.log('after adding(else) like :',likes,newLikes,userId)
//     //     }
//     //     console.log('after like :',likes)
//     //     likedPost({ postId: post?.post?.$id, likesArray: likes });
//     // };
//     const handleLikes = (e: React.MouseEvent) => {
//         const newLikes = [...likes];
    
//         if (newLikes.includes(userId)) {
//             setLikes((prevLikes) => prevLikes.filter((id) => id !== userId));
//         } else {
//             setLikes((prevLikes) => [...prevLikes, userId]);
//         }
    
//         likedPost({ postId: post?.post?.$id, likesArray: newLikes }); // Use newLikes here
//     };

//     const handleSave = (e: React.MouseEvent) => {
//         e.stopPropagation();
//         console.log('saved post :', savedPostRecord)
//         if (savedPostRecord) {
//             setSaved(false);
//             deleteSavedPost(savedPostRecord.$id);
//         } else {

//             setSaved(true);
//             savePost({ postId: post.post.post.post.$id, userId: userId });
//         }
//     };

//     function formatLikeCount(likeCount: number) {
//         if (likeCount < 1000) {
//             return likeCount.toString();
//         } else if (likeCount < 10000) {
//             // Display in the format 1k, 2k, etc.
//             return (likeCount / 1000).toFixed(0) + 'k';
//         } else if (likeCount < 1000000) {
//             // Display in the format 10k, 20k, etc.
//             return (likeCount / 1000).toFixed(1) + 'k';
//         } else {
//             // Display in the format 1m, 2m, etc.
//             return (likeCount / 1000000).toFixed(1) + 'm';
//         }
//     }


//     useEffect(() => {
//         console.log(post)
//         checkIsLiked(likes, userId)
//     }, [likes])

//     useEffect(() => {
//         setSaved(!!savedPostRecord);
//     }, [currentUser]);

//     const checkIsLiked = (likeList: string[], userId: string) => {
//         return likeList.includes(userId);
//     };

//     return (
//         <div className='flex flex-between my-3 lg:m-4 items-center'>
//             <div className='flex gap-1'>
//                 {isLikingPost ? (
//                     <div role="status">
//                         <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-primary-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
//                             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
//                         </svg>
//                         <span className="sr-only">Loading...</span>
//                     </div>) : (<div className="flex gap-2">
//                         <img src={`${checkIsLiked(likes, userId) ? 'src/assests/icons/liked.svg' : 'src/assests/icons/like.svg'}`} onClick={handleLikes} alt="like" />
//                         <p className='small-medium lg:base-medium'>{formatLikeCount(likes.length)}</p>
//                     </div>)}


//             </div>
//             {isSavingPost || isdeletingSavingPost ?
//                 <div role="status">
//                     <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-primary-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
//                         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
//                     </svg>
//                     <span className="sr-only">Loading...</span>
//                 </div> : <img src={saved ? "src/assests/icons/saved.svg" : "src/assests/icons/save.svg"} onClick={handleSave} alt="save" />}

//         </div>
//     );
// };

// export default PostStats;
import { Models } from "appwrite";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import {
  useLikesPost,

} from "@/lib/React-Query/querysAndMutation";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const location = useLocation();
  const likesList = post.post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);

  const { mutate: likePost } = useLikesPost();




   const checkIsLiked = (likeList: string[], userId: string) => {
    return likeList.includes(userId);
  };


  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.post.$id, likesArray });
  };


  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex gap-2 mr-5 mt-5">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "src/assests/icons/liked.svg"
              : "src/assests/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer "
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

     
    </div>
  );
};

export default PostStats;
