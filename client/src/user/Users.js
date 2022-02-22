import React, { useState, useEffect} from 'react'
import { list } from './api-user'
import {Paper, Typography, List, ListItem,ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import {Link} from 'react-router-dom'

import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(1),
      margin: theme.spacing(5),
      marginLeft: theme.spacing(10),
      display:'flex',
      flexDirection: 'column'
    },
    title: {
      padding: theme.spacing(1),
      color: theme.palette.openTitle,
      textAlign: 'center'
    },
    link:{
        textDecoration: 'none',
        color:"inherit",
    }
  }))
  
const Users = () => {

    const classes = useStyles();

    const [users, setUsers] = useState([]) 

    useEffect( 
         () => {
        
        const abortController = new AbortController()
        const signal = abortController.signal
        
        list(signal).then( data =>{
          if (data && data.error) {
            console.log(data.error)
          } else {
            setUsers(data)
          }
        
        })
        
        return function cleanup(){
          abortController.abort()
        }
      }, [])


    return(
        <Paper className={classes.root} elevation ={4}>
            <Typography variant='h6' className={classes.title} >
                All Users
            </Typography>
            <List dense>
                {users.map( (item ,i)=>{
                   
                    return <Link className={classes.link} to={"/user/"+item._id} key={i}>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.name} />
                        <ListItemSecondaryAction>
                            <IconButton>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                   
                    </Link>
                })}

            </List>

        </Paper>
    )
}

export default Users;