"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";



const PromptCartList = ({data, handleTagClick})=>{
  return <div className="mt-16 prompt_layout">
    {data.map((post) => (
      <PromptCard 
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
      />
    ))}
  </div>
}


const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([])
  const [posts, setPosts] = useState([])


  useEffect(()=>{
    const fetchPosts = async() => {
      const response = await fetch('/api/prompt') 
      const data = await response.json();
      setPosts(data)
    }
    fetchPosts()
  }, [])

  const filterPrompts = (searchText)=>{
    const regex = new RegExp(searchText, "i"); // i flag for case insensitive

    return posts.filter((item)=>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    )
  }

  const handleSearchChange = (e) => {
    e.preventDefault();
    clearTimeout(searchTimeout);
    setSearchText(e.target.value)

    //debounce method
    setSearchTimeout(
      setTimeout(()=>{
        const searchResult = filterPrompts(e.target.value);
        setSearchResults(searchResult)
      }, 500)
    )
  };

  const handleTagClick = (tagName)=>{
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult)
  }


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCartList
          data={searchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCartList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
