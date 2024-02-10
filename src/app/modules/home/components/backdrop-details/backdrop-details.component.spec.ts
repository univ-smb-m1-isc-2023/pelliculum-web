import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackdropDetailsComponent } from './backdrop-details.component';

describe('BackdropDetailsComponent', () => {
  let component: BackdropDetailsComponent;
  let fixture: ComponentFixture<BackdropDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackdropDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackdropDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
