import {handleTextareaResize, initTextareas} from './textarea-resize';
import {handleTextareaCounter, initTextareaCounters} from './textarea-counter';

const INIT_EVENT = 'init:textarea';

const initTextarea = (root = document) => {
  initTextareas(root);
  initTextareaCounters(root);
};

document.addEventListener('input', (event) => {
  handleTextareaResize(event);
  handleTextareaCounter(event);
});
document.addEventListener(INIT_EVENT, (event) => initTextarea(event.target));

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initTextarea(), {
    once: true,
  });
} else {
  initTextarea();
}
