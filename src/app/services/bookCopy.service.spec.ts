import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookCopyService } from './bookCopy.service';
import { RouterModule } from '@angular/router';

describe('LoanService', () => {
  let service: BookCopyService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule, RouterModule.forRoot([])]});
    service = TestBed.inject(BookCopyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
