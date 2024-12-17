import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCakesComponent } from './add-cakes.component';

describe('AddCakesComponent', () => {
  let component: AddCakesComponent;
  let fixture: ComponentFixture<AddCakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCakesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
