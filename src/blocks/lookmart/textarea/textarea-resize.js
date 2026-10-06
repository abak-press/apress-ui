const AUTOGROW_SELECTOR = '.js-autogrow-textarea';

export const resizeTextarea = (textarea) => {
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
};

export const initTextareas = (root = document) => {
  if (root.matches && root.matches(AUTOGROW_SELECTOR)) {
    resizeTextarea(root);
  }

  if (root.querySelectorAll) {
    root.querySelectorAll(AUTOGROW_SELECTOR).forEach(resizeTextarea);
  }
};

export const handleTextareaResize = (event) => {
  if (event.target.matches && event.target.matches(AUTOGROW_SELECTOR)) {
    resizeTextarea(event.target);
  }
};
