import { AppBar,Button,  IconButton, Toolbar, Typography } from "@mui/material"
import {Link, Navigate, useLocation} from 'react-router-dom'
import auth from '../auth/auth-helper'
import HomeIcon from '@mui/icons-material/Home';
import { signout } from "../auth/api-auth";
const Menu = () =>{

    const isActive = (location, path) => {
        if (location.pathname === path)
        return {color: '#ff4081',} 
        else
        return {color: '#ffffff'}
       }
    const location = useLocation();
    const logout = () =>{
        console.log("logout")
        auth.clearJWT(() => 
        {   
            return <Navigate to="/"/>}
        )
    }
    
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">MERN Skeleton</Typography>
                <Link style={ {textDecoration:'none'}} to="/">
                    <IconButton style={isActive(location, "/")}>
                        <HomeIcon></HomeIcon>
                    </IconButton>
                </Link>
                <Link style={ {textDecoration:'none'}} to="/users">
                    <Button  style={isActive(location, "/users")}>Users</Button>
                </Link>
                {
                !auth.isAuthenticated() && (
                    <span>
                        <Link style={ {textDecoration:'none'}} to="/signup">
                            <Button  style={isActive(location, "/signup")}>Sign Up</Button>
                        </Link>
                        <Link style={ {textDecoration:'none'}} to="/signin">
                            <Button  style={isActive(location, "/signin")}>Sign In</Button>
                        </Link>
                    </span>
                )
                }

                {
                auth.isAuthenticated() && (
                    <span>
                        <Link style={ {textDecoration:'none'}} to={"/user/"+auth.isAuthenticated().user._id}>
                            <Button  style={isActive(location, "/user/"+auth.isAuthenticated().user._id)}>Profile</Button>
                        </Link>
                        
                        <Button onClick={logout} style={isActive(location, "/")}>Sign Out</Button>
                    
                    </span>
                )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Menu