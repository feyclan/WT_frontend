import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookCopyListComponent } from './book-copy-list.component';
import { RouterModule } from '@angular/router';

describe('BookCopyListComponent', () => {
  let component: BookCopyListComponent;
  let fixture: ComponentFixture<BookCopyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCopyListComponent, HttpClientTestingModule, RouterModule.forRoot([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookCopyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
