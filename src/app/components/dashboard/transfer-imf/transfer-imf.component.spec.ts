import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferImfComponent } from './transfer-imf.component';

describe('TransferImfComponent', () => {
  let component: TransferImfComponent;
  let fixture: ComponentFixture<TransferImfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferImfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferImfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
