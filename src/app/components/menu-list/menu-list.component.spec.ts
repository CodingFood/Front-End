import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuListComponent } from './menu-list.component';
import { By } from '@angular/platform-browser';

describe('MenuListComponent', () => {
  let component: MenuListComponent;
  let fixture: ComponentFixture<MenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update total price when checkboxes are clicked', () => {
    const checkbox = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'))[0];
    checkbox.triggerEventHandler('change', null);
    fixture.detectChanges();
    
    expect(component.totalPreco).toBe('R$ 39.00');
  });
});
