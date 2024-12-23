// src/app/models/order.model.ts
export interface Order {
    products: { product: string, quantity: number }[];
    dueDate: string;
    downPayment: number;
}
