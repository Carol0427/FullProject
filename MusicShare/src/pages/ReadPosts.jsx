import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';
import { Link } from 'react-router-dom'

const ReadPosts = (props) => {
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        //setPosts(props.data);
        const fetchPosts = async () => {
            const {data} = await supabase
            .from('Post')
            .select()
           // .order('created_at', { ascending: true })

            // set state of posts
            setPosts(data);
        

        }
        fetchPosts();
    }, [props]);

    const searchItems = searchValue => {
        setSearchInput(searchValue);
        if (searchValue !== "") {
            const filteredData = posts.filter((post) =>
                post.title.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(posts);
        }
    };

    function backToHome(){
        window.location = "/";
      }
      const [selectedFlag, setSelectedFlag] = useState("");

      const filterByFlag = (flag) => {
        setSelectedFlag(flag);
        const filteredData = posts.filter((post) =>
            post.flag === flag
        );
        setFilteredResults(filteredData);
        console.log(filteredData);
    };


      const [sortlikesclicked, setsortlikesclicked] = useState(false);
    const handleSortLikes = () => {
        const sortedData = [...posts].sort((a, b) => {
            if (a.likes === null) return 1;
            if (b.likes === null) return -1;
            return b.likes - a.likes;
        });
        setFilteredResults(sortedData);
        setsortlikesclicked(true);
    };
     
    return (
        <>
            <h2 id="title" onClick={backToHome}>Music Share</h2>
                <input
                type="text"
                placeholder="Search..."
                onChange={(inputString) => searchItems(inputString.target.value)}
                />
                <button className="headerBtn"><Link className="headerLink" to="/new"> Create Post </Link></button>  
                <button className="headerBtn" onClick={handleSortLikes}>Sort by Likes</button>
                <select onChange={(e) => filterByFlag(e.target.value)}>
                    <option value="">All Flags</option>
                    <option value="Opinion" >Opinion</option>
                    <option value="Question">Question</option>
                    <option value="Announcement">Announcement</option>
                    <option value="">No Flag</option>
                </select>

                <ul>
    { searchInput.length > 0 || sortlikesclicked == true ?
    filteredResults.map((post) => (
        <Link to={'/view/'+ post.id} className="link"><Card
            id={post.id}
            title={post.title}
            caption={post.caption}
            likes={post.likes}
            flag={post.flag}
            created_at={post.created_at}
        /></Link>
        
    ))
    : posts.map((post) => (
        <Link to={'/view/'+ post.id} className="link"><Card
            id={post.id}
            title={post.title}
            caption={post.caption}
            likes={post.likes}
            flag={post.flag}
            created_at={post.created_at}
        /></Link>
        
      ))}
</ul>
        </>

    )
}

export default ReadPosts;