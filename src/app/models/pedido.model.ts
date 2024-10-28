import { Cliente } from './cliente.model';
import { Dish } from './dish.model';  // Certifique-se que você tem esse modelo

export interface Pedido {
  id?: number;
  dishes: Dish[];
  total: number;
  status: string;
  cliente?: string;  // Nome do cliente como string
  endereco?: string;  // Endereço do cliente como string
  dataCriacao?: Date;  // Data da criação do pedido
  selecionado?: boolean;  // Novo campo para seleção
}
