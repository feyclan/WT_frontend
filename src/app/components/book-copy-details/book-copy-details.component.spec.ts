import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCopyDetailsComponent } from './book-copy-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('BookCopyDetailsComponent', () => {
  let component: BookCopyDetailsComponent;
  let fixture: ComponentFixture<BookCopyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCopyDetailsComponent, HttpClientTestingModule, RouterModule.forRoot([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookCopyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
