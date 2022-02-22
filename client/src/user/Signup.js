import React , {useState} from 'react'
import {create} from './api-user'
import {Card, CardContent,Icon, Typography, TextField,CardActions, Button, DialogActions, Dialog, DialogTitle,DialogContent,DialogContentText} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme =>(
    {
        card: {
            maxWidth: 600,
            margin: 'auto',
            textAlign: 'center',
            marginTop: theme.spacing(5),
            paddingBottom: theme.spacing(2)
        },
        error: {
            verticalAlign: 'middle'
        },
        title: {
            marginTop: theme.spacing(2),
            color: theme.palette.openTitle
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 300
        },
        submit: {
           
            justifyContent: 'center',
            marginBottom: theme.spacing(2)
        }
    }
))

const Signup= ()=>{

    const classes = useStyles()
    const [values,setValues] = useState({
        name:'',
        password:'',
        email:'',
        open:false,
        error:''
    })

    const handleChange = (event) =>{
        const { name, value} = event.target;

        setValues( (prevState) =>{
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    const clickSubmit = () =>{
        const user ={
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
     
        create(user).then( (data)=>{
            
            // if data not entered correctly 
            if(data.error){
                console.log(data.error);
                // set the error message to the error variable 
                setValues({ ...values, error: data.error})
            }else{
                // error variable set to empty 
                // set open to true the dialog box pops up
                setValues({...values, error:'', open:true})
            }
        })
     
    }

    return(
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" >
                        Sign Up
                    </Typography>
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        id="name"
                        name="name"
                        label="Name"
                        value={values.name} 
                        onChange={handleChange}   
                        className={classes.textField}
                    
                    />
                    <br/>
                     <TextField 
                        id="email"
                        type="email" 
                        name="email"
                        label="email"
                        value={values.email} 
                        onChange={handleChange}
                        margin="normal"
                        className={classes.textField}

                    />
                    <br/>
                     <TextField 
                        id="password" 
                        type="password" 
                        label="password"
                        name="password"
                        value={values.password} 
                        onChange={handleChange}
                        margin="normal"
                        className={classes.textField}

                    />
                    <br/>
                    {
                        values.error && (
                        <Typography component="p" color="error">
                            <Icon color="error">error</Icon>
                            {/* output the Error message */}
                            {values.error}
                        </Typography>)
                    }
                </CardContent>
                <CardActions className={classes.submit}>
                    <Button  color="primary" variant="container" onClick={clickSubmit}>
                            Submit
                    </Button>
                </CardActions>
            </Card>

            <Dialog open={values.open} disableBackdropClick={true}>
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New account successfully created.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/signin">
                        <Button color="primary" autoFocus="autoFocus"
                            variant="contained">
                            Sign In
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>

            
        </div>
    )

}

export default Signup