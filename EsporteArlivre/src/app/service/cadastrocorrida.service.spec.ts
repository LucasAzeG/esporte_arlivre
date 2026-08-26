import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { CadastroCorridasService } from './cadastrocorrida.service';

describe('CadastrocorridaService', () => {

  let service: CadastroCorridasService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        CadastroCorridasService,
        provideHttpClient()
      ]
    });

    service = TestBed.inject(CadastroCorridasService);

  });

  it('should be created', () => {

    expect(service).toBeTruthy();

  });

});