import React from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { useEffect, useState } from 'react';
import { supabase } from '../client'

const EditPost = ({}) => {
    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", caption: "", imgURL: "", flag: ""});

    useEffect(() => {
      const fetchPost = async () => {
        const { data, error } = await supabase
          .from('Post')
          .select('*')
          .eq('id', id)
          .single();
  
        if (error) {
          console.error('Error fetching post:', error.message);
        } else {
          setPost(data);
        }
      };
  
      fetchPost();
    }, [id]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();

        await supabase
        .from('Post')
        .update({ title: post.title, caption: post.caption, imgURL: post.imgURL, flag: post.flag})
        .eq('id', id);

        window.location = "/";
    }

//     // UPDATE post
// const deletePost = async (event) => {
//     event.preventDefault();
  
//     await supabase
//       .from('Posts')
//       .delete()
//       .eq('id', id); 
  
//     window.location = "/";
//   }
function handleRadioChange(event) {
  setPost(prevState => ({
  ...prevState,
  flag: event.target.value
  }));
}
    return (
        <div>
            <form>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange}/><br />
                <br/>

                <label for="caption">Caption</label><br />
                <textarea rows="5" cols="50" id="caption" name="caption" value={post.caption} onChange={handleChange}></textarea><br />
                <br/>
                <label for="imgURL">Image/Gif URL</label><br/>
                <input type="text" id="imgURL" name="imgURL" value={post.imgURL} onChange={handleChange} /> <br/>
                <br/>
                <h4>Flag: </h4>
                <div className="allOption">
                <input className="radio-option"
                    type="radio"
                    id="flag"
                    name="flag"
                    value="opinion"
                    //checked={selectedValue === "red"}
                    onChange={handleRadioChange}
                />Opinion
                {/* <label htmlFor="opinion">Opinion</label> */}
                <br></br>
                <input className="radio-option"
                    type="radio"
                    id="flag"
                    name="flag"
                    value="question"
                    //checked={selectedValue === "red"}
                    onChange={handleRadioChange}
                />
                <label htmlFor="question">Question</label>
                <br></br>
                <input className="radio-option"
                    type="radio"
                    id="flag"
                    name="flag"
                    value="announce"
                    onChange={handleRadioChange}
                    />
                <label htmlFor="announce">Announcement</label>
                <br></br>
                <input type="submit" value="Submit" onClick={updatePost} />
                {/* <button className="deleteButton" onClick={deletePost}>Delete</button> */}
                </div>
            </form>
        </div>
    )
}

export default EditPost