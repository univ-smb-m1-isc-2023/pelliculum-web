import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDateComponent } from './game-date.component';

describe('GameDateComponent', () => {
    let component: GameDateComponent;
    let fixture: ComponentFixture<GameDateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GameDateComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(GameDateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
