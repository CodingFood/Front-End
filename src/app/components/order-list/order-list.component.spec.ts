import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderListComponent } from './order-list.component';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderListComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render pedidos recebidos', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.pedidos-recebidos')?.textContent).toContain('Pedidos recebidos');
  });

  it('should have the checkbox elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('input[type="checkbox"]').length).toBe(3);
  });
<<<<<<< HEAD

  it('should display the current date in dataPedidos', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();

    const dataEsperada = `Hoje, ${dia}/${mes}/${ano}`;
    expect(compiled.querySelector('#dataPedidos')?.textContent).toBe(dataEsperada);
  });
=======
>>>>>>> a371dc01bc2c0334c12438b9ec60c10cec1b4c82
});
