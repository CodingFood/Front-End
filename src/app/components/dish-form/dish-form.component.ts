import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../models/dish.model';  // Importe o modelo corretamente
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class DishFormComponent implements OnInit {
  dish: Dish = {
    name: '',
    description: '',
    price: 0
  };
  isEdit: boolean = false;

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.dishService.getDish(+id).subscribe((data: Dish) => {
        this.dish = data;
      });
    }
  }

  saveDish() {
    if (this.isEdit) {
      this.dishService.update(this.dish.id!, this.dish).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.dishService.create(this.dish).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
