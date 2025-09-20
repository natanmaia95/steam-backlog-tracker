import { FilterGamesByPlayedPipe } from './filter-games-by-played-pipe';

describe('FilterGamesByPlayedPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterGamesByPlayedPipe();
    expect(pipe).toBeTruthy();
  });
});
