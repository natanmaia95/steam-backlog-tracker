import { FilterGamesByNamePipe } from './filter-games-by-name-pipe';

describe('FilterGamesByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterGamesByNamePipe();
    expect(pipe).toBeTruthy();
  });
});
