'use client'
import { useSession } from 'next-auth/react';
import Profile from '/components/profile';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const MyProfile = () => {
    const {data:session}=useSession();
    const [posts, setPosts] = useState([]);
    const router=useRouter();
    useEffect(()=>{
        const fetchPosts=async ()=>{
            const response=await fetch(`/api/users/${session?.user.id}/posts`);
            const data=await response.json();

            setPosts(data);
        }
        if(session?.user.id) fetchPosts();
    },[])
    const handleEdit=(post)=>{
        router.push(`/update-prompt?id=${post._id}`)
      }

    const handleDelete=async(post)=>{
        const hasConfirmed=confirm("Are you sure to delete this prompt?");

        if(hasConfirmed)
        {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method:'DELETE'
                })

                const filterPosts=posts.filter((p)=>p._id !== post._id);

                setPosts(filterPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }
  return (
    <Profile
    name="My"
    desc="Welcome to your persionalized profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default MyProfile;