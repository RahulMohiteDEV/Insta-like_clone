import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import axios from 'axios'


const Register = () => {
  
     const [username , setUsername] = useState('')
     const [email , setEmail] = useState('')
     const [password , setPassword] = useState('')

    async function handleSubmit (e){
        e.preventDefault()

        axios.post('http://localhost:3000/api/auth/register',{
            username,
            email,
            password
        }, {
            withCredentials:true
        })
        .then(res => {
            console.log(res.data);
        })

    }

  return (
    <main>
        <div className="form-container">
            <h2>Register Form</h2>
            <form onSubmit={handleSubmit}>
                <input 
                onInput={(e) => {setUsername(e.target.value)}}
                type='text'
                name='username'
                placeholder='Enter your username'/>

                <input
                onInput={(e) => {setEmail(e.target.value)}}
                type='text' 
                name='email' 
                placeholder='Enter your email'/>

                <input 
                onInput={(e) => {setPassword(e.target.value)}}
                type='password' 
                name='password' 
                placeholder='Enter your password'/>
                <button type='submit'>Register</button>

            </form>
            <p>already have a accoutnt ? <Link className='toggleForm' to='/login'>Login</Link></p>
        </div>
    </main>
  )
}

export default Register
