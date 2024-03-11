import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNextReleaseComponent } from './home-next-release.component';

describe('HomeNextReleaseComponent', () => {
  let component: HomeNextReleaseComponent;
  let fixture: ComponentFixture<HomeNextReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNextReleaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeNextReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
