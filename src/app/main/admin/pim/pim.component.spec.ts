import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PIMComponent } from './pim.component';

describe('PIMComponent', () => {
  let component: PIMComponent;
  let fixture: ComponentFixture<PIMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PIMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PIMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
