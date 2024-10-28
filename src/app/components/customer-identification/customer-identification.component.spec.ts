import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerIdentificationComponent } from './customer-identification.component';

describe('CustomerIdentificationComponent', () => {
  let component: CustomerIdentificationComponent;
  let fixture: ComponentFixture<CustomerIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerIdentificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
