import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoreComponent } from './estore.component';

describe('EstoreComponent', () => {
  let component: EstoreComponent;
  let fixture: ComponentFixture<EstoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
