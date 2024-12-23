// cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addCake, removeCake, clearCart } from '../actions/cart.actions';
import { Cake } from '../../portal/model/cake.model';

export interface CartState {
    items: Cake[];
}

export const initialState: CartState = {
    items: [],
};
export const cartReducer = createReducer(
    initialState,
    on(addCake, (state, { cake }) => (
        // Add the new cake to the cart and cjeck if the cake is already in the cart but increase the quantity
        {
            ...state,
            items: state.items.some((item) => item.id === cake.id)
                ? state.items.map((item) =>
                    item.id === cake.id ? { ...item, quantity: item.quantity + 1 } : item
                )
                : [...state.items, { ...cake, quantity: 1 }],
        }
    )),
    on(removeCake, (state, { cakeId }) => ({
        ...state,
        items: state.items.filter((item) => item.id !== cakeId),
    })),
    on(clearCart, (state) => ({ ...state, items: [] }))
);