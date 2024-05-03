import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Button } from '@material-tailwind/react'

const RegisterCustomer = () => {
    const [name, setName] = useState('')
    const [price_per_bottle, setPrice_per_bottle] = useState('')
    const { user } = useContext(AuthContext)
    const [dataCustomer, setDataCustomer] = useState()
    const [dataCustomerModify, setDataCustomerModify] = useState(null)



    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${BASE_URL}/customer/createCustomer/${user._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, price_per_bottle })
        }
        )
        const parsedData = await response.json()
        alert(parsedData.message)

    }
    useEffect(() => {
        const getCustomers = async () => {
            try {
                const response = await fetch(`${BASE_URL}/customer/getCustomers/${user._id}?startDate=${'2024-04-25'}&endDate=${'2024-04-25'}`);
                if (response.ok) {
                    const data = await response.json();
                    setDataCustomer(data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getCustomers();
    }, [user])
    const handleModify = async (e) => {
        e.preventDefault()
        console.log(`data update: userid: ${user._id} customerid: ${dataCustomerModify._id}, name: ${name} price per bottle: ${price_per_bottle}`)
        try {
            const response = await fetch(`${BASE_URL}/customer/update-customer/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ customer_id: dataCustomerModify._id, name: name, price_per_bottle: price_per_bottle })
            })
            if (response.ok) {

                const data = await response.json()
                alert(data.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");

        
        if (confirmDelete) {
            try {
                const response = await fetch(`${BASE_URL}/customer/deleteCustomer/${id}`, {
                    method: 'DELETE',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })

                const data = await response.json()
                alert(data.message)
            } catch (error) {
                
            }
        } else {

            console.log("Eliminación cancelada");
        }


    }
    return (

        <div>
            <div className='w-full px-8 md:px-32 lg:px-24'>
                <form class="bg-white rounded-md shadow-2xl p-5 mt-3 max-w-md mx-auto" >
                    <h1 class="text-gray-800 font-bold text-2xl mb-1">Registrar cliente</h1>

                    <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input id="name" className=" pl-2 w-full outline-none border-none" type="text" name="name" placeholder={dataCustomerModify ? dataCustomerModify.name : 'Nombre'} value={dataCustomerModify ? dataCustomerModify.name : null} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div class="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <input class="pl-2 w-full outline-none border-none" type="number" name="price_per_bottle" id="price_per_bottle" placeholder={dataCustomerModify ? dataCustomerModify.price_per_bottle : 'Precio por botella'} onChange={(e) => { setPrice_per_bottle(e.target.value) }} />

                    </div>
                    {
                        !dataCustomerModify ? <button type="button" class="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2" onClick={handleSubmit}>Registrar cliente</button>
                            : <button type="button" class="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2" onClick={handleModify}>Modificar cliente</button>
                    }



                </form>

            </div>
            <div className='max-w-lg mx-auto overflow-x-auto mt-3'>
                <table className=' divide-gray-200'>
                    <thead>
                        <tr>
                            <td className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Nombre</td>
                            <td className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Precio por botella</td>
                            <td className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Modificar</td>
                            <td className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Eliminar</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataCustomer ? (
                                dataCustomer.map((customer, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="px-6 py-4 whitespace-nowrap">{customer.customer.name}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{customer.customer.price_per_bottle}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'><Button size="sm" variant="gradient" color="green" onClick={() => setDataCustomerModify(customer.customer)}>modificar</Button> </td>
                                        <td className='px-6 py-4 whitespace-nowrap'><Button size="sm" variant="gradient" color="red" onClick={() => handleDelete(customer.customer._id)}>eliminar</Button> </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center">No hay clientes</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RegisterCustomer