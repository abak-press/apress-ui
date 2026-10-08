const FIELD_SELECTOR = '.js-aui-textarea-field[maxlength]';

export const updateTextareaCounter = (field) => {
  const counter = field
    .closest('.js-aui-textarea')
    ?.querySelector('.js-aui-textarea-counter');

  if (counter) {
    counter.textContent =
      Number(field.getAttribute('maxlength')) - field.value.length;
  }
};

export const initTextareaCounters = (root = document) => {
  if (root.matches && root.matches(FIELD_SELECTOR)) {
    updateTextareaCounter(root);
  }

  if (root.querySelectorAll) {
    root.querySelectorAll(FIELD_SELECTOR).forEach(updateTextareaCounter);
  }
};

export const handleTextareaCounter = (event) => {
  if (event.target.matches && event.target.matches(FIELD_SELECTOR)) {
    updateTextareaCounter(event.target);
  }
};
