import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoanListComponent } from './loan-list.component';
import { RouterModule } from '@angular/router';

describe('LoanListComponent', () => {
  let component: LoanListComponent;
  let fixture: ComponentFixture<LoanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanListComponent, HttpClientTestingModule, RouterModule.forRoot([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
