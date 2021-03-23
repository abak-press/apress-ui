import {
  getFilteredOptions,
  getCurrentOption,
} from './utils';

describe('getFilteredOptions function', () => {
  const optionsList = [
    {value: 'qweASD'},
    {value: 'QWE'},
    {value: 'zxc'},
  ];

  it('should find single option', () => {
    expect(getFilteredOptions(optionsList, 'asd')).toEqual([{value: 'qweASD'}]);
  });

  it('should find twice options', () => {
    expect(getFilteredOptions(optionsList, 'qwe')).toEqual([
      {value: 'qweASD'},
      {value: 'QWE'},
    ]);
  });

  it('should find all options', () => {
    expect(getFilteredOptions(optionsList, '')).toEqual(optionsList);
  });

  it('should not find any option', () => {
    expect(getFilteredOptions(optionsList, 'xxx')).toEqual([]);
  });

  it('should not find any option if array is empty', () => {
    expect(getFilteredOptions([], 'qwe')).toEqual([]);
  });
});

describe('getCurrentOption function', () => {
  const optionsList = [
    {id: 1},
    {id: 2},
    {id: 3},
  ];

  it('should return option with id - 1', () => {
    expect(getCurrentOption(optionsList, 1)).toEqual({id: 1});
  });

  it('should not find any option', () => {
    expect(getCurrentOption(optionsList, 4)).toEqual(null);
  });

  it('should not find any option if array is empty', () => {
    expect(getCurrentOption([], 1)).toEqual(null);
  });
});
