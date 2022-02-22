import React, { useEffect, useState } from 'react'
import {Card, CardContent,Icon, Typography, TextField,CardActions, Button, DialogActions, Dialog, DialogTitle,DialogContent,DialogContentText} from '@mui/material'
import auth  from '../auth/auth-helper'
import { read, update } from './api-user'
import { useParams , Navigate} from 'react-router-dom'

const EditProfile = () =>{
    const { id} = useParams()
    const[values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        open: false,
        redirectToProfile:false
    })

    
    const jwt = auth.isAuthenticated() 
    
    useEffect( () =>{
        const abortController = new AbortController()
        const signal = abortController.signal
        
        read({userId: id}, {t: jwt.token}, signal)
        .then( (data) =>{
            if(data && data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({ ...values, name:data.name, email: data.email})
            }
        })
    },[id])

    
    const clickSubmit = () =>{
        const { name, email, password, redirectToProfile } = values
        const user = {
            name: name  || undefined,
            email: email  || undefined,
            password: password  || undefined 
        }
       
        update({userId: id},{ t: jwt.token}, user)
        .then( (data)=>{
            if(data && data.error){
                setValues( { ...values, error:data.error})
            }else{
                setValues( {...values, name:data.name , email:data.email, redirectToProfile:true})
            }
        })

        if (redirectToProfile) {
            return <Navigate to={'/user/'+id}/>
          }
    }
    const handleChange = (event) =>{
        const { name, value} = event.target;
        setValues( (prevState) =>{
            return {
                ...prevState,
                [name]: value,
            }
        })
    }
    return(
        <div>
            <Card>
                <CardContent>
                    <Typography variant='h6' >Edit Profile</Typography>

                    <TextField variant="outlined" margin="normal" id="name" name="name"label="Name"value={values.name} onChange={handleChange}/><br/>
                    <TextField id='email' type='email' label='email' name='email' value={values.email} onChange={handleChange} margin='normal'/><br/>
                    <TextField id='password' type='password' label='password' name='password' value={values.password} onChange={handleChange} margin='normal'/><br/>
                    {
                        values.error && (
                            <Typography color="error" component="p">
                                 <Icon color="error">error</Icon>
                                {/* output the Error message */}
                                {values.error}
                            </Typography>
                        )
                    }
                </CardContent>
                <CardActions>
                    <Button color="primary" onClick={clickSubmit}>
                        Submit
                    </Button>
                </CardActions>


            </Card>
        </div>
    )


}

export default EditProfile;