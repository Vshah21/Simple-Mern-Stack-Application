import React from 'react'
import { makeStyles } from '@mui/styles'
import {Card, CardContent,CardMedia,Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import unicornbikeImg from '../assets/images/unicornbike.jpg'

// jss style objects defined. 
// CSS in JS styling solution to add styles to components
// card title media
const useStyles = makeStyles(theme => (
    {
        card: {
            maxWidth: 600,
            margin: 'auto',
            marginTop: theme.spacing(5)
        },
        title: {
            padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
            ${theme.spacing(2)}px`,
            color: theme.palette.openTitle
        },
        media: {
            minHeight: 400
        }
    }))
   

// define the Home Component

const Home = () =>{
    // using the custom styles declared in the above function useStyles
    const classes = useStyles()
    return(
        <Card className={classes.card}>
            <Typography variant='h6' className={classes.title}>
                Home Page
            </Typography>
            <CardMedia className={classes.media} image={unicornbikeImg} title="Unicorn Bicycle"/>
            <CardContent>
                <Typography variant="body2" component="p">
                    Welcome to the MERN Skeleton home page.
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Home;