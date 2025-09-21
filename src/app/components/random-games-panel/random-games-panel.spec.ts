import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomGamesPanel } from './random-games-panel';

describe('RandomGamesPanel', () => {
  let component: RandomGamesPanel;
  let fixture: ComponentFixture<RandomGamesPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomGamesPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomGamesPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
