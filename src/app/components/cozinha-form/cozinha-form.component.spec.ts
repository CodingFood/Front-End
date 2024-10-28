import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CozinhaFormComponent } from './cozinha-form.component';

describe('CozinhaFormComponent', () => {
  let component: CozinhaFormComponent;
  let fixture: ComponentFixture<CozinhaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CozinhaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CozinhaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
