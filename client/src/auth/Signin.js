import React, {useEffect, useState} from 'react'
import {signin} from './api-auth'
import auth from './auth-helper'
import {Card, CardContent,Icon, Typography, TextField,CardActions, Button} from '@mui/material'
import { Navigate } from 'react-router-dom';


const Signin =()=>{

    const[values, setValues] = useState({
        email: '',
        password: '',
        error:'',
        redirectToReferrer: false
    })
    const jwt = auth.isAuthenticated()
    const {redirectToReferrer} = values

    useEffect(() => {
        if(jwt) setValues({...values, redirectToReferrer: true}) 
            
    }, [values.redirectToReferrer])


    if (redirectToReferrer) {
        return <Navigate to='/'/>
      }


    const handleChange = (event)=>{
        const {name, value} = event.target
        setValues({ ...values, 
            [name]:value
        })
    }

    const clickSubmit = ()=>{
        const user ={
            email:values.email || undefined ,
            password: values.password || undefined
        }
        
        signin(user).then((data) => {
            if (data.error) {
              setValues({ ...values, error: data.error})
            } else {
              auth.authenticate(data, () => {
                setValues({ ...values, error: '',redirectToReferrer: true})
                
              })
            }
          })
        
        
    }
  
    

    return (

        <Card>
            <CardContent>
                <Typography variant="h6">
                    Sign in
                </Typography>
                
                <TextField variant="outlined" id="email" type="email"  name="email" label="email"value={values.email} onChange={handleChange} margin="normal" /><br/>
                <TextField variant="outlined" id="password"  type="password"  name="password" label="password" value={values.password} onChange={handleChange} margin='normal'/><br/>
                {
                    values.error && (<Typography>
                        <Icon color="error">Error</Icon>
                        {values.error}
                    </Typography>)
                }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit}>Submit</Button>
            </CardActions>
        </Card>
    )



}

export default Signin