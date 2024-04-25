export const getDeliveryQuantity = (customer, index) => {
    if (customer.deliveries && customer.deliveries.length > index) {
        return customer.deliveries[index].quantity;
    }
    return '0';
};
export const calculateTotalBottles = (customer) => {
    let total = 0;
    if (customer.deliveries) {
        customer.deliveries.forEach(delivery => {
            total += delivery.quantity;
        });
    }
    return total;
};
export const calculateTotalBottlesByDay = (index, dataCustomer) => {
    let total = 0;
    if (dataCustomer) {
        dataCustomer.forEach(customer => {
            total += parseInt(getDeliveryQuantity(customer, index), 10);
        });
    }
    return total;
};
export function ConvertirBotellasACantinas({ botellas }) {
    const botellasPorCantina = 55;
    const cantinas = Math.floor(botellas / botellasPorCantina);
    const restoBotellas = botellas % botellasPorCantina;

    return ( cantinas + ',' + restoBotellas);
}