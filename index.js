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
  
      this.elements.main.classList.add('keyboard');
      this.elements.keysContainer.classList.add('keyboard__buttons');
      this.elements.keysContainer.appendChild(this.createButtons());
  
      this.elements.keys = this.elements.keysContainer.querySelectorAll(
        '.keyboard__buttons',
      );
  
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);
    },

    createButtons() {
      const fragment = document.createDocumentFragment();
      const { language } = this.properties;
      keyBoardLayout.forEach((item) => {
        const key = item[language];
        const button = document.createElement('button');
        button.classList.add(`${key}`);
        button.classList.add('keyboard__button');
  
        switch (key) {
          case 'Backspace':
            button.innerHTML = '<span>&larr;</span> Backspace';

            break;
  
          case 'CapsLock':
            button.innerHTML = 'CapsLock';
           
            break;
  
          case 'Enter':
            button.classList.add('enter');
            button.innerHTML = 'Enter';
           
            break;
  
          case 'Space':
            button.innerHTML = ' ';
  
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
        
            break;

          case 'Win':
            button.innerHTML = 'win';
  
            break;
  
          case 'Backslash':
            button.innerHTML = '<span>\\</span>';
     
            break;

          default:
            button.textContent = key.toLowerCase();
     
            break;
        }
  
        fragment.appendChild(button);
      });
  
      return fragment;
    },
  };

    Keyboard.init();
  