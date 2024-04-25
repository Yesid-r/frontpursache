import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const RegisterCustomer = () => {
    const [name, setName] = useState('')
    const [price_per_bottle, setPrice_per_bottle] = useState('')
    const { user } = useContext(AuthContext)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${BASE_URL}/customer/createCustomer/${user._id}`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, price_per_bottle})}        
        )
        const parsedData = await response.json()
        alert(parsedData.message)

    }
    return (
        <div className='max-w-md mx-auto'>
            <div className='w-full px-8 md:px-32 lg:px-24'>
                <form class="bg-white rounded-md shadow-2xl p-5 mt-3" >
                    <h1 class="text-gray-800 font-bold text-2xl mb-1">Registrar cliente</h1>

                    <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input id="name" className=" pl-2 w-full outline-none border-none" type="text" name="name" placeholder="Nombre" onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div class="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <input class="pl-2 w-full outline-none border-none" type="number" name="price_per_bottle" id="price_per_bottle" placeholder="Precio por botella" onChange={(e) => { setPrice_per_bottle(e.target.value) }} />

                    </div>
                    <button type="button" class="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2" onClick={handleSubmit}>Registrar cliente</button>


                </form>

            </div>
        </div>
    )
}

export default RegisterCustomer