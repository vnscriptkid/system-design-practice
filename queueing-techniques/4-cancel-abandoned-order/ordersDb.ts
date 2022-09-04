// in-memory db
export const orders: any[] = [];

export function cancelOrder(orderId: string) {
    const idx = orders.findIndex(x => x.id === orderId);

    if (idx === -1) {
        console.log('order not found');
        return;
    }

    orders[idx].status = 'cancelled';
    console.log('order has been cancelled');
    console.log('orders now: ', JSON.stringify(orders));
}