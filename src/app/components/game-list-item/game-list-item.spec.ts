import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListItem } from './game-list-item';

describe('GameListItem', () => {
  let component: GameListItem;
  let fixture: ComponentFixture<GameListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
