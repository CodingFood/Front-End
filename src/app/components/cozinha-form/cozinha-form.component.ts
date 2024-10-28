import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CozinhaService } from '../../services/cozinha.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { Cozinha } from '../../models/cozinha.model';  // Importar o modelo Cozinha

@Component({
  selector: 'app-cozinha-form',
  standalone: true,
  imports: [FormsModule],  // Adicionar FormsModule aqui
  templateUrl: './cozinha-form.component.html',
  styleUrls: ['./cozinha-form.component.css']
})
export class CozinhaFormComponent implements OnInit {
  cozinhaForm!: FormGroup;
  isEdit = false;
  
  cozinha: Cozinha = { id: undefined, tipo: '' };  // Inicializar o objeto Cozinha

  constructor(
    private fb: FormBuilder,
    private cozinhaService: CozinhaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cozinhaForm = this.fb.group({
      tipo: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.cozinhaService.getById(+id).subscribe(cozinha => this.cozinhaForm.patchValue(cozinha));
    }
  }

  saveCozinha(): void {
    if (this.isEdit) {
      this.cozinhaService.update(this.route.snapshot.params['id'], this.cozinhaForm.value).subscribe(() => {
        this.router.navigate(['/cozinhas']);
      });
    } else {
      this.cozinhaService.create(this.cozinhaForm.value).subscribe(() => {
        this.router.navigate(['/cozinhas']);
      });
    }
  }
}
