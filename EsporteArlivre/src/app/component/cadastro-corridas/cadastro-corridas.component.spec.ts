import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { CadastroCorridasComponent } from './cadastro-corridas.component';
import { CadastroCorridasService } from '../../service/cadastrocorrida.service';

describe('CadastroCorridasComponent', () => {
  let component: CadastroCorridasComponent;
  let fixture: ComponentFixture<CadastroCorridasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCorridasComponent],
      providers: [
        CadastroCorridasService,
        provideHttpClient(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroCorridasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
