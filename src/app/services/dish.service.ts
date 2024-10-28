import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../models/dish.model';  // Certifique-se de que o modelo está sendo importado corretamente

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private apiUrl = 'http://localhost:8080/dishes';  // Ajuste a URL conforme o backend

  constructor(private http: HttpClient) { }

  // Método para listar todos os pratos
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl);
  }

  // Método para obter um prato pelo ID
  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiUrl}/${id}`);
  }

  // Método para criar um novo prato
  create(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.apiUrl, dish);
  }

  // Método para atualizar um prato existente
  update(id: number, dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(`${this.apiUrl}/${id}`, dish);
  }

  // Método para deletar um prato
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
