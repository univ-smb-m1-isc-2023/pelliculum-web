import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsHoverableComponent } from './stars-hoverable.component';

describe('StarsHoverableComponent', () => {
  let component: StarsHoverableComponent;
  let fixture: ComponentFixture<StarsHoverableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarsHoverableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarsHoverableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
