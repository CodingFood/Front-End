import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { MenuListComponent } from './menu-list.component';
import { By } from '@angular/platform-browser';
=======

import { MenuListComponent } from './menu-list.component';
>>>>>>> a371dc01bc2c0334c12438b9ec60c10cec1b4c82

describe('MenuListComponent', () => {
  let component: MenuListComponent;
  let fixture: ComponentFixture<MenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [ MenuListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
=======
      imports: [MenuListComponent]
    })
    .compileComponents();

>>>>>>> a371dc01bc2c0334c12438b9ec60c10cec1b4c82
    fixture = TestBed.createComponent(MenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
<<<<<<< HEAD

  it('should update total price when checkboxes are clicked', () => {
    const checkbox = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'))[0];
    checkbox.triggerEventHandler('change', null);
    fixture.detectChanges();
    
    expect(component.totalPreco).toBe('R$ 39.00');
  });
=======
>>>>>>> a371dc01bc2c0334c12438b9ec60c10cec1b4c82
});
