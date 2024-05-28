import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddCopiesComponent } from './add-copies.component';

describe('AddCopiesComponent', () => {
  let component: AddCopiesComponent;
  let fixture: ComponentFixture<AddCopiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCopiesComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCopiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
