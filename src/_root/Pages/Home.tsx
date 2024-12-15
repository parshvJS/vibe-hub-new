import PostCard from "@/components/shared/PostCard"
import LoadingPrompt from "@/components/shared/loadingPrompt"
import { useGetRecentPosts } from "@/lib/React-Query/querysAndMutation"
import { Models } from "appwrite"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { HashLoader } from "react-spinners"

function Home() {
  const { data: posts, isPending: isPostsLoading, isError: isPostError } = useGetRecentPosts()
  const [loading, setLoading] = useState(true)
  // useEffect(()=>{
  //   if(!isPostsLoading){
  //     console.log(posts)

  //   }
  // },[])
  return (

    <div className="home-container flex">
        {
          isPostsLoading ? (
            // hashloader
            <>
              <div className="h-[80%] w-full  max-w-3xl flex justify-center items-center flex-col">
                <HashLoader
                  color={"#fff"}
                />
              <div className="mt-5"><LoadingPrompt /></div>
              </div>
            </>

          ) : (
            <>
            <div className="">
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-start w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
            </div>
            </>
          )
        }
    </div>

  )
}

export default Home