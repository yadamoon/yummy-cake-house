import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from '../store/reducers/auth.reducer';
import { AuthEffects } from '../store/effects/auth.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forFeature([AuthEffects]),

  ]
})
export class AuthModule { }
