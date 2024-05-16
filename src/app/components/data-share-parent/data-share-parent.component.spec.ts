import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataShareParentComponent } from './data-share-parent.component';

describe('DataShareParentComponent', () => {
  let component: DataShareParentComponent;
  let fixture: ComponentFixture<DataShareParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataShareParentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataShareParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
