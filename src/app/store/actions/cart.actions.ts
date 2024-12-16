// cart.actions.ts use Cake model
import { createAction, props } from '@ngrx/store';
import { Cake } from '../../portal/model/cake.model';


export const addCake = createAction('[Cart] Add Cake', props<{ cake: Cake }>());
export const removeCake = createAction('[Cart] Remove Cake', props<{ cakeId: number }>());
export const clearCart = createAction('[Cart] Clear Cart');
