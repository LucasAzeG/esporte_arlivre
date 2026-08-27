import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AtletaServiceService } from '../../service/atleta-service.service';
import { AtletaComponent } from './atleta.component';
import { ActivatedRoute } from '@angular/router';

describe('AtletaComponent', () => {
  let service: AtletaServiceService;
  let component: AtletaComponent;
  let fixture: ComponentFixture<AtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AtletaComponent
      ],
      providers: [
        AtletaServiceService,
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AtletaComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    service = TestBed.inject(AtletaServiceService);
  });

  it('deve considerar o campo nome inválido quando estiver vazio', () => {
    component.nome = '';

    fixture.detectChanges();

    const inputNome = fixture.nativeElement.querySelector('#nome');

    expect(inputNome.validity.valid).toBeFalse();
  });

  it('deve considerar o campo cpf inválido quando estiver vazio', () => {
    component.cpf = '';

    fixture.detectChanges();

    const inputCpf = fixture.nativeElement.querySelector('#cpf');

    expect(inputCpf.validity.valid).toBeFalse();
  });

  it('deve considerar o campo sexo inválido quando nenhum sexo estiver selecionado', () => {
    component.sexo = '';

    fixture.detectChanges();

    const inputSexo = fixture.nativeElement.querySelector('#sexoM');

    expect(inputSexo.validity.valid).toBeFalse();
  });

  it('deve considerar o campo data de nascimento inválido quando estiver vazio', () => {
    component.dataNascimento = '';
  
    fixture.detectChanges();
  
    const inputDataNascimento = fixture.nativeElement.querySelector('#dataNascimento');
  
    expect(inputDataNascimento.validity.valid).toBeFalse();
  });

});