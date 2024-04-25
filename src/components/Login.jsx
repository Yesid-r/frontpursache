import React, { useEffect, useState } from 'react'
import '../styles/login.css'
import { BASE_URL } from '../utils/constants'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {



    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(`data is ${email} and ${password}`)
        const data = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        })
        const parsedData = await data.json()
        console.log(parsedData)
        if (parsedData.success) {
            console.log(parsedData.message)
            console.log(parsedData.token)
            
            Cookies.set('accesToken', parsedData.token, { expires: 1, path: '/' });

            dispatch({type: 'LOGIN_SUCCESS', payload: parsedData.data})
            navigate('/')
        } else {
            dispatch({type: 'LOGIN_FAILURE'})
            console.log(parsedData.message)
            setTimeout(() => {
                setError('')
            }, 5000)
            setError(parsedData.message)
            
        }

    }
    return (
        <>
            <div className="h-screen flex">
                <div className="hidden lg:flex w-full lg:w-1/2 bg-gray-900  justify-around items-center">
                    <div className="bg-black opacity-20 inset-0 z-0">
                    </div>
                    <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
                        <h1 className="text-white font-bold text-4xl font-sans">LOGIN</h1>
                        <p className="text-white mt-1">The simplest app to use</p>
                        <div className="flex justify-center lg:justify-start mt-6">

                        </div>
                    </div>
                </div>
                <div className="flex w-full lg:w-1/2 justify-center items-center bg-white  space-y-8">

                    <div class="w-full px-8 md:px-32 lg:px-24">
                    {
                        error && <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong class="font-bold">Error!</strong>
                            <span class="block sm:inline">{error}</span>
                            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <title>Close</title>
                                    <path
                                        d="M14.348 5.652a1 1 0 010 1.414L9.414 10l4.934 4.934a1 1 0 11-1.414 1.414L8 11.414l-4.934 4.934a1 1 0
                    01-1.414-1.414L6.586 10 .652 5.652a1 1 0 111.414-1.414L8 8.586l4.934-4.934a1 1 0 011.414 0z">
                        
                                    </path>
                                </svg>
                            </span> 
                        </div>
                        
                    }
                        <form class="bg-white rounded-md shadow-2xl p-5 mt-3" >
                            <h1 class="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                            <p class="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
                            <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <input id="email" class=" pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div class="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <input class="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />

                            </div>
                            <button type="button" class="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2" onClick={handleSubmit}>Login</button>
                            <div class="flex justify-between mt-4">
                                <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</span>

                                <a href="/register" class="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Don't have an account yet?</a>
                            </div>

                        </form>
                    </div>

                </div>
            </div>

        </>

    )
}

export default Login

