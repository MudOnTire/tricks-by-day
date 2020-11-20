import './style.scss'

$(() => {
  // DOM
  const caret = document.querySelector('#caret');
  const hiddenInput = document.querySelector('#hiddenInput');

  // Variables
  let blinkTimer;

  // states
  const states = {
    inputStatus: '',
    showCaret: false
  }
  const observables = {};

  // Watchers
  const watchers = {
    inputStatus: (newVal, oldVal) => {
      if (newVal === 'focus') {
        blinkTimer = setInterval(() => {
          observables.showCaret = !observables.showCaret;
        }, 500);
      } else if (newVal === 'blur') {
        if (blinkTimer) clearInterval(blinkTimer);
        observables.showCaret = false;
      }
    },
    showCaret: (newVal, oldVal) => {
      if (newVal === true) {
        caret.style.display = 'block';
      } else {
        caret.style.display = 'none';
      }
    }
  }

  // Reactions
  for (const key in states) {
    Object.defineProperty(observables, key, {
      enumerable: true,
      configurable: true,
      get() {
        return states[key];
      },
      set(newVal) {
        const oldVal = states[key];
        states[key] = newVal;
        if (watchers[key] && typeof watchers[key] === 'function') {
          watchers[key](newVal, oldVal);
        }
      }
    });
  }

  // Event Listeners
  hiddenInput.addEventListener('focus', () => {
    observables.inputStatus = 'focus';
  });
  hiddenInput.addEventListener('blur', () => {
    observables.inputStatus = 'blur';
  });
  hiddenInput.addEventListener('input', (e) => {
    console.log(e);
  });

  // initial state
  hiddenInput.focus();
});