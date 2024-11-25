import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';

// Importação dos componentes necessários
import { DishListComponent } from './components/dish-list/dish-list.component';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import { CustomerProductListComponent } from './components/customer-product-list/customer-product-list.component'; 
import { PedidoListComponent } from './components/pedido-list/pedido-list.component';
import { CustomerIdentificationComponent } from './components/customer-identification/customer-identification.component'; 
import { CustomerOrderStatusComponent } from '../app/customer-order-status/customer-order-status.component';  
import { PedidoAceitoComponent } from './components/pedido-aceito/pedido-aceito.component';  // Certifique-se que esse import está correto
import { EntregadorComponent } from './components/entregador/entregador.component';

// Configuração de rotas
const routes: Routes = [
  { path: '', redirectTo: '/customer-identification', pathMatch: 'full' },
  { path: 'customer-identification', component: CustomerIdentificationComponent },
  { path: 'customer-products', component: CustomerProductListComponent },
  { path: 'pedido-list', component: PedidoListComponent },
  { path: 'customer-order-status', component: CustomerOrderStatusComponent },  
  { path: 'add-dish', component: DishFormComponent },
  { path: 'edit-dish/:id', component: DishFormComponent },
  { path: 'pedidos', component: PedidoListComponent },
  { path: 'entregador', component: EntregadorComponent },
  { path: 'dish-list', component: DishListComponent },
  { path: 'pedido-aceito', component: PedidoAceitoComponent }  // Certifique-se de que a rota está correta
];

// Configuração da aplicação com as rotas e HttpClient
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),  
    provideHttpClient()  
  ]
};
