import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishFormComponent } from './dish-form.component';

import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('DishFormComponent', () => {
  let component: DishFormComponent;
  let fixture: ComponentFixture<DishFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DishFormComponent
      ],
      providers: [
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
