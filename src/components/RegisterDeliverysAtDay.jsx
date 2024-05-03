import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { Carousel } from '@material-tailwind/react';
import RegisterDelivery2 from './RegisterDelivery2'; // Asegúrate de que la importación sea correcta
import RegisterDelivery from './RegisterDelivery';

const RegisterDeliverysAtDay = () => {
    const user_id = "661fdfe5ce2a67a15ead2115";
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const response = await fetch(`${BASE_URL}/customer/customers/${user_id}?date=${selectedDate}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setCustomers(data.data);
                }
            } catch (error) {
                alert(error.message);
            }
        };
        getCustomers();
    }, [selectedDate]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSubmit = async () => {

    };

    return (
        <div className='max-w-md mx-auto'>
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
                Registrar todos
            </button>
            {
                customers.length > 0 ? <>
                    <Carousel className=' rounded-xl bg-blue-gray-100 '>


                        {customers.map((customer) => (
                            <RegisterDelivery2 key={customer._id} customer={customer} date={selectedDate} />
                        ))}
                    </Carousel>

                </> : <>
                    <div className=''>
                        <h1>No hay registros</h1>
                    </div>

                </>
            }

        </div>
    );
};

export default RegisterDeliverysAtDay;
