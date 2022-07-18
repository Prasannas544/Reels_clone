import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom';
import {database} from '../firebase'
import { CircularProgress, Typography } from '@mui/material';
import Navbar from './Navbar';
import './Profile.css'
import Like from './Like';
import Like2 from './Like2';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Video from './Video'

import { CardActionArea, CardActions } from '@mui/material';
import AddComment from './AddComment';
import Comments from './Comments';

function Profile() {
    
    const {id}=useParams()
    console.log(id)
    const [userData,setUserdata]=useState(null)
    const [posts,setPosts]=useState(null)
    const [open, setOpen] =useState(null);

    const handleClickOpen = (id) => {
    setOpen(id);
    };

    const handleClose = () => {
    setOpen(null);
    };
    

    useEffect(()=>{
        database.users.doc(id).onSnapshot((snap)=>{
            setUserdata(snap.data());
        })
    },[id])
    useEffect(async()=>{
        if(userData!==null){
            let parr=[]
            for(let i=0;i<userData.postIds.length;i++){
                let postData=await database.posts.doc(userData.postIds[i]).get()
                parr.push({...postData.data(),postId:postData.id})
            }
            setPosts(parr)
        }
    })
  return (
    <>
    {
        posts===null || userData===null ? <CircularProgress/> :
        <>
            <Navbar userData={userData}/>
            <div className='spacer'></div>
            <div className='container'>
                <div className='upper-part'>
                    <div className='profile-img'>
                        <img src={userData.profileUrl}/>
                    </div>
                    <div className='info'>
                        <Typography variant='h4'>
                            Email:{userData.email}
                        </Typography>
                        <Typography variant='h5'>
                            Posts:{userData.postIds.length}
                        </Typography>
                    </div>
                </div>
                <hr style={{marginTop:"1rem",marginBottom:"1rem"}}/>
                <div className="profile-videos">
                {
                                    posts.map((post,index)=>(
                                        <React.Fragment key={index}>
                                            <div className="videos">
                                                <video muted="muted"  onClick={()=>handleClickOpen(post.pId)} >
                                                    <source src={post.pUrl}/>
                                                </video>
                                                
                                                <Dialog
                                                    open={open==post.pId}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                    fullWidth={true}
                                                    maxWidth="md"
                                                >
                                                    <div className='modal-container'>
                                                        <div className='video-modal'>
                                                            <video muted="muted" autoPlay={true}>
                                                                <source src={post.pUrl}/>
                                                            </video>
                                                        </div>
                                                        <div className='comment-modal'>
                                                        <Card className='card1' style={{padding:'1rem'}}>
                                                            <Comments postData={post}/>
                                                        </Card>
                                                    
                                                        <Card variant ="outlined" className='card2'>
                                                            <Typography style={{padding:'0.4rem'}}>{post.likes.length==0 ?'Liked by nobody':`Liked by ${post.likes.length} users`}</Typography>
                                                            <div style={{display:'flex'}}>
                                                                <Like2 postData={post} userData={userData} style={{display:"flex",alignItems:'center',justifyContent:"center"}}/>
                                                                <AddComment style={{display:"flex",alignItems:'center',justifyContent:"center"}} postData={post} userData={userData} />
                                                            </div>
                                                        </Card>
                                                        </div>
                                                    </div>
                                                </Dialog>
                                            </div>
                                        </React.Fragment>
                                    ))
                 }
                </div>
            </div>
        </>
    }
    </>
  )
}

export default Profile