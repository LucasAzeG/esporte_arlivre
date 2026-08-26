import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { AtletaServiceService } from './atleta-service.service';

describe('AtletaServiceService', () => {

  let service: AtletaServiceService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        AtletaServiceService,
        provideHttpClient()
      ]
    });

    service = TestBed.inject(AtletaServiceService);

  });

  it('should be created', () => {

    expect(service).toBeTruthy();

  });

});