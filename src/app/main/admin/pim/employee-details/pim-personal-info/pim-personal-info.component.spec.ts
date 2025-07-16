import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PimPersonalInfoComponent } from './pim-personal-info.component';

describe('PimPersonalInfoComponent', () => {
  let component: PimPersonalInfoComponent;
  let fixture: ComponentFixture<PimPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PimPersonalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PimPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
