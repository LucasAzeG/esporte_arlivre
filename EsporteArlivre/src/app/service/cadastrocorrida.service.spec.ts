import { TestBed } from '@angular/core/testing';

import { CadastrocorridaService } from './cadastrocorrida.service';

describe('CadastrocorridaService', () => {
  let service: CadastrocorridaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastrocorridaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
