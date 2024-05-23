import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataShareChildComponent } from './data-share-child.component';

describe('DataShareChildComponent', () => {
  let component: DataShareChildComponent;
  let fixture: ComponentFixture<DataShareChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataShareChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataShareChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
