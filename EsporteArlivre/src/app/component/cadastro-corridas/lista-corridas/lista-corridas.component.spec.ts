import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCorridasComponent } from './lista-corridas.component';

describe('ListaCorridasComponent', () => {
  let component: ListaCorridasComponent;
  let fixture: ComponentFixture<ListaCorridasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCorridasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaCorridasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
