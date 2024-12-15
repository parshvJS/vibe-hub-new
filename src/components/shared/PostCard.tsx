import { useUserContext } from '@/context/authContext'
import { formatDateAgo } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Models } from 'appwrite'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'
type PostCardPropr = {
  post: Models.Document,
}
const PostCard = (post: PostCardPropr) => {
  const { user } = useUserContext()
  useEffect(() => {
    console.log('secongd', post.post, post.post.creator)
  }, [])
  console.log(post, 'post')
  return (
    <div className="post-card w-fit">
      <div className="flex-between">
        <div className="flex justify-center gap-3">
          {/* <Link to={`/profile/${post.post.creator.$id}`}> */}
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
              </TooltipTrigger>
              <TooltipContent className='border-white rounded-sm'>
                <p>Visit Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* </Link> */}

          <div className="flex flex-col">
            {/* <p className='base-medium lg:body-bold text-light-2'>{post?.post?.creator.name}</p> */}
            <div className="flex gap-2 text-center items-center">
              <p className="text-light-3 ">{formatDateAgo(post?.post?.$createdAt)}</p>
              •
              <p className="text-light-3 subtle-semibold">{post?.post?.location}</p>

            </div>
          </div>

        </div>

        <Link to={`/update-post/${post?.post?.$id}`}>
          <img src='src/assests/icons/edit.svg' alt="Edit Post"
            width={25}
            height={25}
          />
        </Link>
      </div>
      <Link to={`/posts/${post?.post?.$id}`}>
        <div className="details small-medium py-5 lg:base-medium">
          <p>{post?.post?.caption}</p>
          <ul className='flex gap-2 mt-1'>
            {
              post?.post?.tags.map((tag: string) => {
                return <li key={tag} className='tag text-light-3'># {tag}</li>
              })
            }
          </ul>
        </div>
        <img src={post?.post?.imageUrl} alt="Post Image" className='post-card_image rounded-xl' />

      </Link>
      {/* <PostStats post={post} userId={user.id} /> */}
    </div>
  )
}

export default PostCard