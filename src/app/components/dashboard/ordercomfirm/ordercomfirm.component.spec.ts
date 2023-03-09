import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdercomfirmComponent } from './ordercomfirm.component';

describe('OrdercomfirmComponent', () => {
  let component: OrdercomfirmComponent;
  let fixture: ComponentFixture<OrdercomfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdercomfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdercomfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
