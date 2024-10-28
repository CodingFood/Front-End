import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDishListComponent } from './customer-dish-list.component';

describe('CustomerDishListComponent', () => {
  let component: CustomerDishListComponent;
  let fixture: ComponentFixture<CustomerDishListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDishListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
