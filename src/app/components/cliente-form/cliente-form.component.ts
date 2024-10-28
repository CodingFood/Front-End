import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';  // ReactiveFormsModule importado
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [ReactiveFormsModule],  // ReactiveFormsModule adicionado
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  clienteForm!: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nome: [''],
      email: [''],
      telefone: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.clienteService.getById(+id).subscribe(cliente => this.clienteForm.patchValue(cliente));
    }
  }

  saveCliente(): void {
    if (this.isEdit) {
      this.clienteService.update(this.route.snapshot.params['id'], this.clienteForm.value).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    } else {
      this.clienteService.create(this.clienteForm.value).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    }
  }
}
