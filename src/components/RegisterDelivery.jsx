import React, { useContext, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { AuthContext } from '../context/AuthContext';

const RegisterDelivery = ({ customer, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const {user} = useContext(AuthContext) 
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    const handleSubmit = async () =>{
        try {
            const response = await fetch(`${BASE_URL}/delivery/createDelivery/${user._id}`, {
                method: 'POST',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify({customer_id:customer._id, quantity, date: selectedDate })
            })

            const data = await response.json()
            alert(data.message)

        } catch (error) {
            
        }
    }

    return (
        <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-6 rounded-lg w-96">
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-lg font-semibold">Registrar entrega</h5>
                        <button type="button" className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Quantity:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Select Date:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white justify-center rounded' onClick={handleSubmit}>
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterDelivery;
