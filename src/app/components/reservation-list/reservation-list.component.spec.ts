import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReservationListComponent } from './reservation-list.component';
import { RouterModule } from '@angular/router';

describe('ReservationListComponent', () => {
  let component: ReservationListComponent;
  let fixture: ComponentFixture<ReservationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationListComponent, HttpClientTestingModule, RouterModule.forRoot([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
