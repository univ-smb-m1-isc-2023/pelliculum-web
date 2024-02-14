import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameGenresComponent } from './game-genres.component';

describe('GameGenresComponent', () => {
  let component: GameGenresComponent;
  let fixture: ComponentFixture<GameGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameGenresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
