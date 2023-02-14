import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsdataComponent } from './studentsdata.component';

describe('StudentsdataComponent', () => {
  let component: StudentsdataComponent;
  let fixture: ComponentFixture<StudentsdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
