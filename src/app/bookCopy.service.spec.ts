import { TestBed } from '@angular/core/testing';

import { BookCopyService } from './bookCopy.service';

describe('LoanService', () => {
  let service: BookCopyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookCopyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
