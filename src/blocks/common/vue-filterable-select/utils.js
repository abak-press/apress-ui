/**
 * Возвращает массив опций value
 * которых совпадает с filterValue.
 *
 * @param {Object[]} options
 * @param {string} options[].value
 * @param {String} filterValue
 */

export const getFilteredOptions = (options = [], filterValue = '') =>
  options.filter(option => {
    const value = option.value.toLowerCase();
    return value.includes(filterValue.toLowerCase());
  });

/**
 * Возвращает объект опции id которой
 * совпадает с id из второго параметра
 *
 * @param {Object[]} options
 * @param {string} options[].value
 * @param {Number} id
 */

export const getCurrentOption = (options = [], id = 0) => {
  const filteredOptions = options.filter(option => option.id === id);
  return (filteredOptions && filteredOptions[0]) || null;
}
