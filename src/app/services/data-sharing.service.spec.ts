import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataSharingService } from './data-sharing.service';

describe('DataSharingService', () => {
  let service: DataSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(DataSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
