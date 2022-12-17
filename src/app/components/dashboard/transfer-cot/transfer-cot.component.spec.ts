import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCotComponent } from './transfer-cot.component';

describe('TransferCotComponent', () => {
  let component: TransferCotComponent;
  let fixture: ComponentFixture<TransferCotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferCotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferCotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
