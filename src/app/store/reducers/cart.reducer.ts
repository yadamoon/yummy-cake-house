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
    on(addCake, (state, { cake }) => ({ ...state, items: [...state.items, cake] })),
    on(removeCake, (state, { cakeId }) => ({
        ...state,
        items: state.items.filter((item) => item.id !== cakeId),
    })),
    on(clearCart, (state) => ({ ...state, items: [] }))
);