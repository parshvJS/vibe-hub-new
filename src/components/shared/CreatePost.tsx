import React from 'react'
import PostForm from '../forms/PostForm'

const CreatePost = () => {
  return (
    <div className="flex flex-1 flex-col ">
      {/* heading + icon */}
      <div className="comman-container">
        <div className="image flex justify-start items-center gap-2 my-5 mx-5 max-w-4xl w-full  sm:justify-center">          
          <img src="src/assests/icons/add-post.svg" alt="create-post-icon" />
          <p className="text-xl h3-bold md:text-2xl  font-bold">Create Post</p>
        </div>
      </div>

      {/* form */}
      <PostForm/>
    </div>
 
    )
}

export default CreatePost