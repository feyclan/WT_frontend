import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookDetailsComponent } from './book-details.component';
import { RouterModule } from '@angular/router';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailsComponent, HttpClientTestingModule, RouterModule.forRoot([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
