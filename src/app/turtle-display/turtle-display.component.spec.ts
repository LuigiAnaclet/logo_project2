import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurtleDisplayComponent } from './turtle-display.component';

describe('TurtleDisplayComponent', () => {
  let component: TurtleDisplayComponent;
  let fixture: ComponentFixture<TurtleDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurtleDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurtleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
