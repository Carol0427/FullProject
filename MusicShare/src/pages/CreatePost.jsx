import React, { useState } from 'react';
import './CreatePost.css'
import { supabase } from '../client'


const CreatePost = () => {

    const [post, setPost] = useState({title: "", caption: "", imgURL: "", secret_key: "", flag: ""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    const createPost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Post')
          .insert({title: post.title, caption: post.caption, likes: 0, imgURL: post.imgURL, secret_key: post.secret_key, flag: post.flag})
          .select();
      
        window.location = "/";
      }

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
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label for="caption">Caption</label><br />
                <input type="text" id="caption" name="caption" onChange={handleChange} /><br />
                <br />

                <label for="imgURL">Image/Gif URL</label><br/>
                <input type="text" id="imgURL" name="imgURL" onChange={handleChange} /> <br/>
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
                </div>
                <label for="secret_key">Enter a 4 digit key to edit and delete posts</label><br/>
                <input type="text" id="secret_key" name="secret_key" onChange={handleChange} /> <br/>
                <br/>
                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost