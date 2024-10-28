import { Component, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../models/dish.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Importar RouterModule

@Component({
  selector: 'app-dish-list',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Adicionar RouterModule para habilitar o uso do routerLink
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  dishes: Dish[] = [];

  constructor(private dishService: DishService) {}

  ngOnInit(): void {
    this.dishService.getDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
    });
  }

  deleteDish(id: number): void {
    this.dishService.delete(id).subscribe(() => {
      this.dishes = this.dishes.filter(d => d.id !== id);
    });
  }
}
