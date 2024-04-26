import React, { useState } from 'react';
import { BASE_URL } from '../utils/constants';

const RegisterDelivery2 = ({ customer, date }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleDateChange = () => {
        
    };

    const handleSubmit = async () => {
        try {
            
            const response = await fetch(`${BASE_URL}/delivery/createDelivery/661fdfe5ce2a67a15ead2115`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ customer_id: customer._id, quantity, date: date })
            })

            const data = await response.json()
            alert(data.message)
            if(data.success){
                //window.location.href = "/deliverysByFecha"
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className='max-w-md mx-auto p-6 space-y-12 shadow-md border border-gray-300 rounded-md mt-7 mb-3'>
        <div className="bg-teal-400 flex justify-center items-center h-screen">
            <div>
                <h2 className="text-xl font-semibold mb-4">Register Delivery: {customer.name}</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        onKeyPress={handleKeyPress}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Register
                    </button>
                </div>
            </div>
        </div>
        </div>

    );
};

export default RegisterDelivery2;
