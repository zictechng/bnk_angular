import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPinComponent } from './transfer-pin.component';

describe('TransferPinComponent', () => {
  let component: TransferPinComponent;
  let fixture: ComponentFixture<TransferPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferPinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
