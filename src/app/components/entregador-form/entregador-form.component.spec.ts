import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregadorFormComponent } from './entregador-form.component';

describe('EntregadorFormComponent', () => {
  let component: EntregadorFormComponent;
  let fixture: ComponentFixture<EntregadorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntregadorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntregadorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
