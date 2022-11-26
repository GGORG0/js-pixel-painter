let isMouseDown = false;
const paintContainer = document.querySelector('#paint-container');
paintContainer.addEventListener('mousedown', () => {
  isMouseDown = true;
});
paintContainer.addEventListener('mouseup', () => {
  isMouseDown = false;
});

let selectedColor = 'white';

/**
 * @type {HTMLButtonElement[]}
 */
const buttonGrid = document.querySelectorAll('button.pixel');
const buttonHandler = (button) => {
  if (isMouseDown) {
    if (selectedColor == 'white')
      button.classList.remove('black-pixel');
    else if (selectedColor == 'black')
      button.classList.add('black-pixel');
  }
};
buttonGrid.forEach(button => {
  button.addEventListener('mouseover', () => buttonHandler(button));
  button.addEventListener('mousedown', () => { isMouseDown = true; buttonHandler(button); });
});

const toolboxPaintButtons = document.querySelectorAll('#toolbox > button.paint-button');
toolboxPaintButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    if (button.classList.contains('active'))
      selectedColor = button.id.split('-')[0];
    else
      selectedColor = '';
    toolboxPaintButtons.forEach(otherButton => {
      if (otherButton !== button) {
        otherButton.classList.remove('active');
      }
    });
  });
});

document.querySelector('button#clear').addEventListener('click', () => {
  buttonGrid.forEach(button => {
    button.classList.add('black-pixel');
  });
});

document.querySelector('button#generate-binary').addEventListener('click', () => {
  let binary = '';
  buttonGrid.forEach(button => {
    binary += button.classList.contains('black-pixel') ? '0' : '1';
  });
  document.querySelector('#binary > textarea').value = binary;
  document.querySelector('#binary').classList.add('active');
});

document.querySelector('button#import-binary').addEventListener('click', () => {
  document.querySelector('#binary > textarea').value = 'paste binary here';
  document.querySelector('#binary').classList.add('active');
  document.querySelector('#binary-ok').classList.add('active');
  document.querySelector('#binary-ok').addEventListener('click', () => {
    const binary = document.querySelector('#binary > textarea').value;
    if (binary.length !== 256) {
      alert('Invalid binary string');
      return;
    }
    buttonGrid.forEach((button, i) => {
      if (binary[i] === '1')
        button.classList.add('black-pixel');
      else
        button.classList.remove('black-pixel');
    });
    document.querySelector('#binary').classList.remove('active');
    document.querySelector('#binary-ok').classList.remove('active');
  });
});
