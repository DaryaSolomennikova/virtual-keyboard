const keyBoardLayout = [
  { ru: 'ё', en: '`', shift_en: '~',},
  { ru: '1', en: '1', shift_ru: '!', shift_en: '!',},
  { ru: '2', en: '2', shift_ru: '', shift_en: '@',},
  { ru: '3', en: '3', shift_ru: '№', shift_en: '#',},
  { ru: '4', en: '4', shift_ru: ';', shift_en: '$',},
  { ru: '5', en: '5', shift_ru: '%', shift_en: '%',},
  { ru: '6', en: '6', shift_ru: ':', shift_en: '^',},
  { ru: '7', en: '7', shift_ru: '?', shift_en: '&',},
  { ru: '8', en: '8', shift_ru: '*', shift_en: '*',},
  { ru: '9', en: '9', shift_ru: '(', shift_en: '(',},
  { ru: '0', en: '0', shift_ru: ')', shift_en: ')',},
  { ru: '-', en: '-', shift_ru: '_', shift_en: '_',},
  { ru: '=', en: '=', shift_ru: '+', shift_en: '+',},
  { ru: 'Backspace', en: 'Backspace',},


  { ru: 'Tab', en: 'Tab',},
  { ru: 'й', en: 'q',},
  { ru: 'ц', en: 'w',},
  { ru: 'у',en: 'e',},
  { ru: 'к', en: 'r',},
  { ru: 'е', en: 't',},
  { ru: 'н', en: 'y',},
  { ru: 'г', en: 'u',},
  { ru: 'ш', en: 'i',},
  { ru: 'щ', en: 'o',},
  { ru: 'з', en: 'p',},
  { ru: 'х', en: '[', shift_en: '{',},
  { ru: 'ъ', en: ']', shift_en: '}',},
  { ru: 'Backslash', en: 'Backslash', shift_ru: '/', shift_en: '|',},


  { ru: 'CapsLock', en: 'CapsLock',},
  { ru: 'ф', en: 'a',},
  { ru: 'ы', en: 's',},
  { ru: 'в', en: 'd',},
  { ru: 'а', en: 'f',},
  { ru: 'п', en: 'g',},
  { ru: 'р', en: 'h',},
  { ru: 'о', en: 'j',},
  { ru: 'л', en: 'k',},
  { ru: 'д', en: 'l',},
  { ru: 'ж', en: ';', shift_en: ':',},
  { ru: 'э', en: "'", shift_en: '',},
  { ru: 'Enter', en: 'Enter',},
  { ru: 'ShiftLeft', en: 'ShiftLeft',},


  { ru: 'я', en: 'z',},
  { ru: 'ч', en: 'x',},
  { ru: 'с', en: 'c',},
  { ru: 'м', en: 'v',},
  { ru: 'и', en: 'b',},
  { ru: 'т', en: 'n',},
  { ru: 'ь', en: 'm',},
  { ru: 'б', en: ',', shift_en: '<',},
  { ru: 'ю', en: '.', shift_en: '>',},
  { ru: '.', en: '/', shift_ru: ',', shift_en: '?',},
  { ru: 'ArrowUp', en: 'ArrowUp',},
  { ru: 'ShiftRight', en: 'ShiftRight',},
  
  
  { ru: 'ControlLeft',en: 'ControlLeft',},
  { ru: 'Win', en: 'Win',},
  { ru: 'AltLeft', en: 'AltLeft',},
  { ru: 'Space', en: 'Space',},
  { ru: 'AltRight', en: 'AltRight',},
  { ru: 'ArrowLeft', en: 'ArrowLeft',},
  { ru: 'ArrowDown', en: 'ArrowDown',},
  { ru: 'ArrowRight', en: 'ArrowRight',},
  { ru: 'ControlRight', en: 'ControlRight',},
];

const Keyboard = {
    elements: {
      main: null,
      keysContainer: null,
      keys: [],
      textarea: null,
    },
  
    properties: {
      capsLock: false,
      shiftPressed: false,
      language: localStorage.getItem('language') || 'en',
    },
  
    init() {
      const body = document.querySelector('body');
      this.elements.textarea = document.createElement('textarea');
      this.elements.textarea.setAttribute('autofocus', 'autofocus');
      body.appendChild(this.elements.textarea);
      this.elements.main = document.createElement('div');
      this.elements.keysContainer = document.createElement('div');
      this.elements.text = document.createElement('p');
  
      this.elements.main.classList.add('keyboard');
      this.elements.keysContainer.classList.add('keyboard__buttons');
      this.elements.keysContainer.appendChild(this.createButtons());
  
      this.elements.keys = this.elements.keysContainer.querySelectorAll(
        '.keyboard__buttons',
      );
      document.body.appendChild(this.elements.text);
      this.elements.text.innerHTML = 'OC - Windows. Язык клавиатуры переключается комбинацией Shift и alt.';

      document.addEventListener('keydown', (event) => {
        if (event.code === 'Tab') {
          event.preventDefault();
          const { selectionStart, selectionEnd, value } = this.elements.textarea;
            const tabSize = 4;
            const spaces = Array(tabSize + 1).join(' ');
            this.elements.textarea.value = value.substring(0, selectionStart) + spaces + value.substring(selectionEnd);
            this.elements.textarea.selectionStart = this.elements.textarea.selectionEnd = selectionStart + tabSize;
        }  
          });
  
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);
  
      document.addEventListener('keydown', (event) => {
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          this.properties.shiftPressed = true;
        }
        if (event.code === 'AltLeft' || event.code === 'AltRight') {
          this.properties.altPressed = true;
        }
        if (this.properties.shiftPressed && this.properties.altPressed) {
          if (this.properties.language === 'en') {
            this.properties.language = 'ru';
          } else {
            this.properties.language = 'en';
          }
          localStorage.setItem('language', this.properties.language);
          this.elements.keysContainer.innerHTML = '';
          this.elements.keysContainer.appendChild(this.createButtons());
          this.properties.shiftPressed = false;
          this.properties.altPressed = false;
        }
      });
  
      document.addEventListener('keydown', (event) => {
        const button = document.querySelector(`[data-key="${event.code}"]`);
        if (button) {
          button.classList.add('clicked');
        }
      });
      
      document.addEventListener('keyup', (event) => {
        const button = document.querySelector(`[data-key="${event.code}"]`);
        if (button) {
          button.classList.remove('clicked');
        }
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          this.properties.shiftPressed = false;
        }
      });
  
      document.addEventListener('keydown', (event) => {
        if (event.key === '"') {
          return;
        }
        const button = document.querySelector(`[data-key="${event.key.toLowerCase()}"]`)
          || document.querySelector(
            `[data-shift_${this.properties.language}='${event.key}']`,
          );
        if (button) {
          button.classList.add('clicked');
        }
      });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'CapsLock') {
          Keyboard.properties.capsLock = !Keyboard.properties.capsLock;
          const capsButton = document.querySelector('[data-key="CapsLock"]');
          capsButton.classList.toggle('clicked', Keyboard.properties.capsLock);
          updateKeys();
        }
      });
      
      document.addEventListener('keyup', (event) => {
        if (event.code === 'CapsLock') {
          const capsButton = document.querySelector('[data-key="CapsLock"]');
          capsButton.classList.toggle('clicked', Keyboard.properties.capsLock);
          updateKeys();
        }
      });
      
      function updateKeys() {
        for (const key of Keyboard.elements.keys) {
          const keyText = Keyboard.properties.capsLock || Keyboard.properties.shiftPressed ?
            [Keyboard.properties.language].toUpperCase() :
            keyLayout[Keyboard.properties.language];
      
          if (keyLayout.type === 'special' && keyLayout.value === 'caps') {
            key.classList.toggle('clicked', Keyboard.properties.capsLock);
          }
      
          key.textContent = keyText;
        }
      }

      document.addEventListener('keyup', (event) => {
        if (event.key === '"') {
          return;
        }
        const button = document.querySelector(`[data-key="${event.key.toLowerCase()}"]`)
          || document.querySelector(
            `[data-shift_${this.properties.language}='${event.key}']`,
          );
        if (button) {
          button.classList.remove('clicked');
        }
      });
    },

    handleInput(value) {
        this.elements.textarea.focus();
        this.elements.textarea.value += value;
      },
        
  
    createButtons() {
      const fragment = document.createDocumentFragment();
      const { language } = this.properties;
      keyBoardLayout.forEach((item) => {
        const key = item[language];
        const button = document.createElement('button');
        button.classList.add(`${key}`);
        button.setAttribute('type', 'button');
        button.setAttribute('data-key', `${key}`);
        if (item[`shift_${language}`]) {
          button.setAttribute(`data-shift_${language}`, item[`shift_${language}`]);
        }
        button.classList.add('keyboard__button');
  
        switch (key) {
          case 'Backspace':
            button.classList.add('backspace');
            button.innerHTML = '<span>&larr;</span> Backspace';
            button.addEventListener('click', () => {
              const cursorPosition = this.elements.textarea.selectionStart;
              let { value } = this.elements.textarea;
              value = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
              this.elements.textarea.value = value;
              this.elements.textarea.focus();
              this.elements.textarea.setSelectionRange(
                cursorPosition - 1,
                cursorPosition - 1,
              );
            });
  
            break;
  
          case 'CapsLock':
            button.innerHTML = 'CapsLock';
            button.addEventListener('click', () => {
              if (!this.properties.capsLock) {
                button.classList.add('clicked');
                this.properties.capsLock = true;
              } else {
                button.classList.remove('clicked');
                this.properties.capsLock = false;
              }
            });
            break;
  
          case 'Enter':
            button.classList.add('enter');
            button.innerHTML = 'Enter';
            button.addEventListener('click', () => {
              this.handleInput('\n');
            });
  
            break;
  
          case 'Space':
            button.innerHTML = ' ';
            button.addEventListener('click', () => {
              this.handleInput(' ');
            });
  
            break;
  
          case 'ArrowUp':
            button.innerHTML = '<span>&uarr;</span>';
  
            break;
  
          case 'ArrowDown':
            button.innerHTML = '<span>&darr;</span>';
  
            break;

          case 'ArrowLeft':
            button.innerHTML = '<span>&larr;</span>';
  
            break;
          case 'ArrowRight':
            button.innerHTML = '<span>&rarr;</span>';
            button.addEventListener('click', () => {
            //   this.handleInput(button.textContent);
            });
  
            break;

          case 'ShiftLeft':
          case 'ShiftRight':
            button.innerHTML = 'shift';
  
            break;
  
          case 'ControlRight':
          case 'ControlLeft':
            button.innerHTML = 'ctrl';
            
            break;

          case 'AltLeft':
          case 'AltRight':
            button.innerHTML = 'alt';
  
            break;
          case 'Tab':
            button.innerHTML = 'tab';
            button.addEventListener('click', () => {
            const { selectionStart, selectionEnd, value } = this.elements.textarea;
            const tabSize = 4;
            const spaces = Array(tabSize + 1).join(' ');
            this.elements.textarea.value = value.substring(0, selectionStart) + spaces + value.substring(selectionEnd);
            this.elements.textarea.selectionStart = this.elements.textarea.selectionEnd = selectionStart + tabSize;
            });
  
            break;

          case 'Win':
            button.innerHTML = 'win';
  
            break;
  
          case 'Backslash':
            button.innerHTML = '<span>\\</span>';
            button.addEventListener('click', () => {
              this.handleInput('\\');
            });
  
            break;
  
            default:
            button.textContent = key.toLowerCase();
            button.addEventListener('click', () => {
              const { shiftPressed, capsLock } = this.properties;
              const isUppercase = (shiftPressed && !capsLock) || (!shiftPressed && capsLock);
              const value = isUppercase ? key.toUpperCase() : key.toLowerCase();
              this.handleInput(value);
            });
  
            break;
        }
  
        fragment.appendChild(button);
      });
  
      return fragment;
    },
  };

  window.addEventListener('DOMContentLoaded', () => {
    Keyboard.init();
  });
  