import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBillComponent } from './import-bill.component';

describe('ImportBillComponent', () => {
  let component: ImportBillComponent;
  let fixture: ComponentFixture<ImportBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
