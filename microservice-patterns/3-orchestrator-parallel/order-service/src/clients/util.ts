import { of } from "rxjs";

const user = {
    userId: 1,
    name: 'thanh',
    balance: 487,
    address: {
        street: 'Lieu Giai',
        city: 'Hanoi',
        state: 'Vietnam',
        zipCode: '123-456'
    }
}

const product = {
    id: 1,
    category: 'Sneakers',
    description: 'Rare products',
    price: 2000
}

const inventory = {
    1: 10
}

export enum ServiceCallNames {
    inventory = 'inventory',
    product = 'product',
    shipping = 'shipping',
    user = 'user'
}

export enum ServiceCallActions {
    deductInventory = 'deductInventory',
    restoreInventory = 'restoreInventory',
    scheduleShipping = 'scheduleShipping',
    cancelShipping = 'cancelShipping',
    deductAccount = 'deductAccount',
    refundAccount = 'refundAccount',
    getProduct = 'getProduct',
    getUser = 'getUser',
    getInventory = 'getInventory',
}

interface DeductAccountRequest {
    amount: number;
    orderId: string;
    userId: number;
}

interface RefundAccountRequest {
    amount: number;
    orderId: string;
    userId: number;
}

interface GetInventoryRequest {
    productId: number;
}

interface DeductInventoryRequest {
    productId: number;
    orderId: number;
    quantity: number;
}

interface RestoreInventoryRequest {
    productId: number;
    orderId: number;
    quantity: number;
}

interface ScheduleShippingRequest {
    orderId: number;
    userId: number;
}

interface CancelShippingRequest {
    orderId: number;
    userId: number;
}

export function callService(serviceName: ServiceCallNames, action: ServiceCallActions, data?: any) {
    switch (serviceName) {
        case ServiceCallNames.product: {
            if (action === ServiceCallActions.getProduct) {
                return of(product)
            }
            break;
        }
        case ServiceCallNames.inventory: {
            if (action === ServiceCallActions.getInventory) {
                const { productId } = data as GetInventoryRequest;

                return of(inventory[productId]);
            }
            if (action === ServiceCallActions.deductInventory) {
                const { productId, orderId, quantity } = data as DeductInventoryRequest;

                inventory[productId] -= quantity;

                return of({
                    productId,
                    quantity,
                    remainingQuantity: inventory[productId],
                    status: 'SUCCESS'
                });
            }
            if (action === ServiceCallActions.restoreInventory) {
                const { productId, orderId, quantity } = data as RestoreInventoryRequest;

                inventory[productId] += quantity;

                return of({
                    productId,
                    quantity,
                    remainingQuantity: inventory[productId],
                    status: 'SUCCESS'
                });
            }
            break;
        }
        case ServiceCallNames.shipping: {
            const { userId, orderId } = data as ScheduleShippingRequest;

            if (action === ServiceCallActions.scheduleShipping) {
                return of({
                    orderId,
                    expectedDelivery: '2022-12-22',
                    status: 'SUCCESS',
                    address: user.address
                })
            }

            if (action === ServiceCallActions.cancelShipping) {
                const { userId, orderId } = data as CancelShippingRequest;
                return of({
                    status: 'SUCCESS'
                })
            }
            break;
        }
        case ServiceCallNames.user: {
            if (action === ServiceCallActions.getUser) {
                return of(user)
            }
            if (action === ServiceCallActions.deductAccount) {
                const { amount, orderId, userId } = data as DeductAccountRequest;

                user.balance -= amount;

                return of({
                    userId: user.userId,
                    name: user.name,
                    balance: user.balance,
                    status: 'SUCCESS'
                })
            }
            if (action === ServiceCallActions.refundAccount) {
                const { amount, orderId, userId } = data as RefundAccountRequest;

                user.balance += amount;

                return of({
                    userId: user.userId,
                    name: user.name,
                    balance: user.balance,
                    status: 'SUCCESS'
                })
            }
        }
    }
    throw new Error('bad request')
}