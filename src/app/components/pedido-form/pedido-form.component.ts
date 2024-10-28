import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PedidoService } from '../../services/pedido.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../../models/pedido.model';
import { Dish } from '../../models/dish.model';  // Importar o modelo Dish
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent implements OnInit {

  pedidoForm!: FormGroup;
  isEdit = false;
  selectedDishes: Dish[] = [];  // Lista de pratos selecionados
  totalValue: number = 0;       // Total do pedido
  customerName: string = '';    // Nome do cliente capturado
  pedido: Pedido = {
    status: 'Pendente',
    dishes: [],   
    total: 0,
    dataCriacao: new Date() // Data de criação como string
  };

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pedidoForm = this.fb.group({
      status: [''],
      dishes: [null],  // Alterado para dishes
      total: [0]       // Campo para o total do pedido
    });

    // Receber o nome do cliente da URL (customer-identification)
    this.route.queryParams.subscribe(params => {
      this.customerName = params['name'] || 'Cliente';  // Capturando o nome do cliente da URL
    });

    // Verificar se é edição ou criação
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.pedidoService.getPedido(+id).subscribe(pedido => {
        this.pedido = pedido;
        this.pedidoForm.patchValue({
          status: pedido.status,
          dishes: pedido.dishes,  // Alterado para dishes
          total: pedido.total
        });
      });
    }
  }

  // Função para calcular o total dos pratos selecionados
  calculateTotal(): void {
    this.totalValue = this.selectedDishes.reduce((total, dish) => total + dish.price, 0);
    this.pedidoForm.patchValue({ total: this.totalValue });
  }

  // Função para salvar o pedido
  savePedido(): void {
    const pedidoData: Pedido = {
      ...this.pedidoForm.value,  // Pega os valores do formulário
      dishes: this.selectedDishes,   // Alterado para dishes
      total: this.totalValue,        // Adicionar o total calculado
      dataCriacao: new Date().toISOString(),  // Converte a data para string
      cliente: this.customerName     // Adiciona o nome do cliente capturado
    };

    if (this.isEdit) {
      this.pedidoService.update(this.pedido.id!, pedidoData).subscribe(() => {
        this.router.navigate(['/pedidos']);
      });
    } else {
      this.pedidoService.create(pedidoData).subscribe(() => {
        this.router.navigate(['/pedidos']);
      });
    }
  }
}
