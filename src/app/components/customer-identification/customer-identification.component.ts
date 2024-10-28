import { Component } from '@angular/core';
import { Router } from '@angular/router';  
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { ClienteService } from '../../services/cliente.service';  // Importando o serviço do cliente
import { Cliente } from '../../models/cliente.model';  // Importando o modelo do cliente

@Component({
  selector: 'app-customer-identification',
  templateUrl: './customer-identification.component.html',
  styleUrls: ['./customer-identification.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]  
})
export class CustomerIdentificationComponent {

  customerName: string = '';
  customerEndereco: string = '';  // Campo para endereço

  constructor(private router: Router, private clienteService: ClienteService) {}  

  // Função chamada ao clicar em Continuar
  continueToProductSelection(): void {
    if (this.customerName.trim() !== '' && this.customerEndereco.trim() !== '') {
      const cliente: Cliente = {
        nome: this.customerName,
        endereco: this.customerEndereco
      };
      // Criar o cliente no banco de dados
      this.clienteService.create(cliente).subscribe(() => {
        // Redireciona para a página de seleção de pratos após o cliente ser salvo
        this.router.navigate(['/customer-products'], { queryParams: { name: this.customerName, endereco: this.customerEndereco } });
      });
    } else {
      alert('Por favor, insira seu nome e endereço.');
    }
  }
}
