'use client'
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList=({data,handleTagClick})=>{
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );    
}

const Feed = () => {
  const [prompts, setPrompts] = useState([])
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout,setSearchTimeout]=useState(null);
  
  const filterprompts=(searchText)=>{
    const regex=new RegExp(searchText,"i");
    
    return prompts.filter((item)=> regex.test(item.creator.username)|| regex.test(item.tag)|| regex.test(item.prompt));
  };
  
  const handleSearchChange=(e)=>{
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout( 
      setTimeout(()=>{
        const searchResult=filterprompts(e.target.value);
        setSearchedResults(searchResult);
      },500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterprompts(tagName);
    setSearchedResults(searchResult);
  };
  
  useEffect(()=>{
    const fetchPosts=async()=>{
      const response=await fetch("/api/prompt");
      const data=await response.json();

      setPrompts(data);
    }

    fetchPosts();
  },[])
  return (
   <section className='feed'>
    <form className='relative w-full flex-center '>
      <input 
      type='text'
      placeholder='Search for a tag or a username'
      value={searchText}
      onChange={handleSearchChange}
      required
      className='search_input peer'/>
    </form>

    {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={prompts} handleTagClick={handleTagClick} />
      )}
   </section>
  )
}

export default Feed