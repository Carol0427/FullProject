import React from 'react'
import { supabase } from '../client'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import 'react-router-dom';
import './ViewPost.css'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
const ViewPost = () => {

    const {id} = useParams();
    const [post, setPost] = useState('');
    const [prevComments, setPrevComments] = useState([]);
    const [likes, setLikes] = useState(0);
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
                setLikes(data.likes);
                console.log(data.comments);
                if (data.comments) {
                    const commentsArray = data.comments.map(comment => comment);
                    setPrevComments(commentsArray);
                }
            }
        };
        fetchPost();
    }, [id]);

const [postEdit, setPostEdit] = useState({id: null, comments: ""});

// UPDATE post
const updateComments = async (event) => {
    event.preventDefault();
  
    const newComments = [...prevComments, postEdit.comments];

    await supabase
      .from('Post')
      .update({ comments: newComments})
      .eq('id', id);
  
    // window.location = "/";
    //windows.location.reload;
    setPost({ ...post, comments: newComments });
    postEdit.comments = "";
  }

  const handleChange = (event) => {
    setPostEdit({ ...postEdit, comments: event.target.value });
  };
    // const handleChange = (event) => {
    //     setNewComment(event.target.value);
    // }

    const updateLikes = async (event) => {
      event.preventDefault();
    
      
      await supabase
        .from('Post')
        .update({ likes: likes + 1})
        .eq('id', id)
    
      setLikes((count) => count + 1);
    }
    
    // UPDATE post
const deletePost = async (event) => {
    event.preventDefault();
  
    await supabase
      .from('Post')
      .delete()
      .eq('id', id); 
  
    window.location = "/";
  }
  function backToHome(){
    window.location = "/";
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // <Link to={'/edit/'+ post.id} style={{textDecoration: 'none', color: 'white'}}></Link>

  const nav = useNavigate();
  const [secretKey, setSecretKey] = useState();
  const handleSecretChange = (event) => {
    setSecretKey({ ...secretKey, secret_key: event.target.value });
  };
  const secretKeyInput = () => {
    if (secretKey == post.secret_key){
      nav('/edit/' + post.id);
    }
    else {
      handleClose();
    }
}
    return(
        <>
        <h2 id="title" onClick={backToHome}>Music Share</h2>

        {post ? (
                <div className="post">
                    <h1>{post.title}</h1>
                    <p>{post.caption}</p>
        {post.imgURL && <img src={post.imgURL} alt="womp womp" width="200" height="100"/>}
        <br/>
                    <button className="addLikes" onClick={updateLikes}>Click to like: {[likes]}</button>
                    <h3>Comments:</h3>
                    {Array.isArray(post.comments) && post.comments.map((comment, index) => 
                    <p key={index}>{comment}</p>
                )}                   
                     <form>
                        <input type="text" value={postEdit.comments} onChange={handleChange}></input>
                        <input type="submit" value="Submit" onClick={updateComments} />
                    </form>
                    {/* Add more post details as needed */}
                    <button className="editButton" onClick={handleShow}>Edit Post</button>
                    <button className="deleteButton" onClick={deletePost}>Delete</button>
                </div>
                
            ) : (
                <p>Loading...</p>
            )}
      <Modal show={show} onHide={handleClose} className='modal'>
              <Modal.Header closeButton>
                <Modal.Title>Enter secret key: </Modal.Title>
              </Modal.Header>
              <Modal.Body><input type="text" value={secretKey} className="secretKeyInput"></input></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={secretKeyInput}>
                  Enter
                </Button>
              </Modal.Footer>
            </Modal>
        </>
    )
}
export default ViewPost