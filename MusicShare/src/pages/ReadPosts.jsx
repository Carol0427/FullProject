import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';
import { Link } from 'react-router-dom'

const ReadPosts = (props) => {
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [posts, setPosts] = useState([]);
    // const [filteredResults, setFilteredResults] = useState([]);
    useEffect(() => {
        //setPosts(props.data);
        const fetchPosts = async () => {
            const {data} = await supabase
            .from('Post')
            .select()
           // .order('created_at', { ascending: true })

            // set state of posts
            setPosts(data);
        
            //setFilteredResults(data);

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

    //   const sortByLikes = () =>{
    //     const allLikes = [];
    //     let allIndex = 0;
    //     for (let i=0;i<posts.length;i++){
    //       if (posts[i].likes != null){
    //         allLikes[allIndex] = posts[i].likes;
    //         allIndex = allIndex + 1;
    //       }
    //     }
    //     const sortedByLikes = allLikes.slice().sort((a, b) => a - b);
    //     return sortedByLikes;
    //   };
    //   const handleSortLikes = (event) => {
    //     const filteredData = posts.filter((item) =>
    //       item.likes != null && parseInt(item.likes) <= parseFloat(event.target.value)
    //     );
    //     setFilteredResults(filteredData);
    //   };
      const [sortlikesclicked, setsortlikesclicked] = useState(false);
    const handleSortLikes = () => {
        console.log('hello');
        const sortedData = [...posts].sort((a, b) => {
            if (a.likes === null) return 1;
            if (b.likes === null) return -1;
            return b.likes - a.likes;
        });
        setFilteredResults(sortedData);
        setsortlikesclicked(true);
    };
    
    // const handleSortLikes = () => {
    //     const sortedData = [...posts].sort((a, b) => b.likes - a.likes);
    //     setFilteredResults(sortedData);
    // };
     // const sortedLikes = sortByLikes();
     
    return (
        <div className="ReadPosts">
                <h2 id="title" onClick={backToHome}>Music Share</h2>
                <input
                type="text"
                placeholder="Search..."
                onChange={(inputString) => searchItems(inputString.target.value)}
                />
                <button className="headerBtn"><Link className="headerLink" to="/new"> Create Post </Link></button>  
                <button className="headerBtn" onClick={handleSortLikes}>Sort by Likes</button>
                {/* {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card id={post.id} title={post.title} caption={post.caption} likes={post.likes}/>
                ) : <h2>{'No Posts Yet 😞'}</h2>
            } */}
                <ul>
    { searchInput.length > 0 || sortlikesclicked == true ?
    filteredResults.map((post) => (
        <div className='my-card'>
        <Link to={'/view/'+ post.id} className="link"><Card
            id={post.id}
            title={post.title}
            caption={post.caption}
            likes={post.likes}
            flag={post.flag}
        /></Link>
        </div>
    ))
    : posts.map((post) => (
        <div className="my-card">
        <Link to={'/view/'+ post.id} className="link"><Card
            id={post.id}
            title={post.title}
            caption={post.caption}
            likes={post.likes}
            flag={post.flag}
        /></Link>
        </div>
      ))}
</ul> </div>
        
    )
}

export default ReadPosts;