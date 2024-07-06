'use client'
import { useSession } from 'next-auth/react';
import Profile from '/components/Profile';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
const OtherProfile = ({params}) => {

    const searchParams=useSearchParams();
    const username=searchParams.get("name");
    const {data:session}=useSession();
    const [posts, setPosts] = useState([]);
    const router=useRouter();
    useEffect(()=>{
        const fetchPosts=async ()=>{
            const response=await fetch(`/api/users/${params?.id}/posts`);
            const data=await response.json();

            setPosts(data);
        }
        if(params?.id) fetchPosts();
    },[params.id])
       
    
  return (
    <Profile
    name={username}
    desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
    data={posts}
    
    />
  )
}

export default OtherProfile;