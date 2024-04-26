import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import RegisterDelivery from './RegisterDelivery';
import { calculateTotalBottles, calculateTotalBottlesByDay, getDeliveryQuantity } from '../utils/functions_count';

const TableDelivery = () => {
    const user_id = "661fdfe5ce2a67a15ead2115";
    const [dataCustomer, setDataCustomer] = useState();
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const startDate = '2024-04-20';
    const endDate = '2024-04-26'; 

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const response = await fetch(`${BASE_URL}/customer/getCustomers/${user_id}?startDate=${startDate}&endDate=${endDate}`);
                if (response.ok) {
                    const data = await response.json();
                    setDataCustomer(data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getCustomers();
    }, [user_id]);




    function ConvertirBotellasACantinas({ botellas }) {
        const botellasPorCantina = 55;
        const cantinas = Math.floor(botellas / botellasPorCantina);
        const restoBotellas = botellas % botellasPorCantina;
    
        return ( cantinas + ',' + restoBotellas);
    }
    const handleOpenModal = async (_id) => {
        try {
            const response = await fetch(`${BASE_URL}/customer/getCustomer/${_id}`);
            const data = await response.json();
            setSelectedCustomer(data.data);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    }

    const handleCloseModal = () => {
        setSelectedCustomer(null);
    }

    return (
        <div className="overflow-x-auto">
            <table className="max-w-lg mx-auto m-3 rounded-md divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        {[...Array(7)].map((_, index) => (
                            <th key={index} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Día {index + 1}</th>
                        ))}
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio botella</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total botellas</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor total</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {dataCustomer ? (
                        dataCustomer.map((customer, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="px-6 py-4 whitespace-nowrap">{customer.customer.name}</td>
                                <td>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white justify-center rounded" onClick={() => { handleOpenModal(customer.customer._id) }}>
                                        <svg
                                            className="w-6 h-6 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            ></path>
                                        </svg>
                                    </button>
                                </td>
                                {[...Array(7)].map((_, index) => (
                                    <td key={index} className="px-6 py-4 whitespace-nowrap">{getDeliveryQuantity(customer, index)}</td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap">{customer.customer.price_per_bottle.toLocaleString('es-CO', {
                                        style: 'currency',
                                        currency: 'COP',
                                    })}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{calculateTotalBottles(customer)}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {(calculateTotalBottles(customer) * customer.customer.price_per_bottle).toLocaleString('es-CO', {
                                        style: 'currency',
                                        currency: 'COP',
                                    })}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="9" className="px-6 py-4 text-center">No hay datos</td></tr>
                    )}
                    
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Total botellas por día:</td>
                        <td ><span></span></td>
                        <td colSpan="9">
                            {[...Array(7)].map((_, index) => (
                                <span key={index} className="px-6 py-4 whitespace-nowrap">{calculateTotalBottlesByDay(index, dataCustomer)}  </span>
                                
                            ))}
                        </td>
                    </tr>
                    <tr>
                        <td className='px-6 py-4 whitespace-nowrap'>Total cantinas</td>
                        <td><span></span></td>
                        <td colSpan="9">
                        {[...Array(7)].map((_, index) => (
                                <span key={index} className="px-6 py-4 whitespace-nowrap"> <ConvertirBotellasACantinas botellas={calculateTotalBottlesByDay(index)}  /> </span>
                                
                            ))}
                        </td>
                    </tr>
                </tbody>
            </table>
            {selectedCustomer && <RegisterDelivery customer={selectedCustomer} onClose={handleCloseModal} />}
        </div>
    );
}

export default TableDelivery;
