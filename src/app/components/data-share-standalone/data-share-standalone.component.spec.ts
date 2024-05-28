import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataShareStandaloneComponent } from './data-share-standalone.component';

describe('DataShareStandaloneComponent', () => {
  let component: DataShareStandaloneComponent;
  let fixture: ComponentFixture<DataShareStandaloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataShareStandaloneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataShareStandaloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
