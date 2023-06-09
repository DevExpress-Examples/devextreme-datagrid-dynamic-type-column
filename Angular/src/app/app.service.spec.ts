import { TestBed } from '@angular/core/testing';

import { Service } from './app.service';

describe('AppService', () => {
  let service: Service; // eslint-disable-line @typescript-eslint/init-declarations

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
