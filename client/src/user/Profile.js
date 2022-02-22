import React, { useState, useEffect } from "react";
import auth from '../auth/auth-helper'
import {read} from './api-user'
import { Navigate , useParams , Link } from "react-router-dom";
import {Paper, Typography, List, ListItem, ListItemAvatar, ListItemText,Avatar,Divider,ListItemSecondaryAction,IconButton} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteUser from './DeleteUser'
const Profile = () =>{
    const {id} = useParams();
  
    const[user, setUser] =useState({});
    const [redirectToSignin, setRedirectToSignin] = useState(false)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        const jwt = auth.isAuthenticated()
       
        // if user is signed in
        if(jwt){
          read( { userId: id }, { t: jwt.token }, signal)
            .then((data) => {
                if (data && data.error) {
                  setRedirectToSignin(true)
                  console.log("Error Occured")

                } else {
                  setUser(data)
                  console.log("Signed in")
                }
              })
            return function cleanup(){
            abortController.abort()
            }
        }else{
          // console.log("Not Signed in")
          setRedirectToSignin(true)
        }
        
        }, [id])
        // redirect to home page
        if (redirectToSignin) {
          return <Navigate to='/'/>
        }
      
        return(
            <Paper  elevation={4}>
            <Typography variant="h6" >
              Profile
            </Typography>
            <List dense>
            <ListItem>
            <ListItemAvatar>
            <Avatar>
            <PersonIcon/>
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email}/>
            {
              auth.isAuthenticated().user && auth.isAuthenticated().user._id ==
              id && (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <EditIcon/>
                  </IconButton>
                </Link>

                {/* Delete Button */}
                <DeleteUser userId={user._id}/>

                </ListItemSecondaryAction>
                )
            }
            
            </ListItem>
            <Divider/>
            <ListItem>
            <ListItemText primary={"Joined: " + (
            new Date(user.created)).toDateString()}/>
            </ListItem>
            </List>
            </Paper>
           )

}

export default Profile;