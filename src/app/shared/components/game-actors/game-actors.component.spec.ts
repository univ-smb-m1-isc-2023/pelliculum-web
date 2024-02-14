import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameActorsComponent } from './game-actors.component';

describe('GameActorsComponent', () => {
  let component: GameActorsComponent;
  let fixture: ComponentFixture<GameActorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameActorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
