import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoAceitoComponent } from './pedido-aceito.component';

describe('PedidoAceitoComponent', () => {
  let component: PedidoAceitoComponent;
  let fixture: ComponentFixture<PedidoAceitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoAceitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoAceitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
