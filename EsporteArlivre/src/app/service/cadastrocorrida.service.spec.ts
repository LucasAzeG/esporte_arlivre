import { TestBed } from '@angular/core/testing';

import { CadastroCorridaService } from './cadastrocorrida.service';

describe('CadastrocorridaService', () => {
  let service: CadastroCorridaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroCorridaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
