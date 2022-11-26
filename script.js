/**
 * @type {HTMLButtonElement[]}
 */
let buttonGrid = document.querySelectorAll('button.pixel');

const buttonHandler = (button) => {
  if (isMouseDown) {
    if (selectedColor == 'white')
      button.classList.remove('black-pixel');
    else if (selectedColor == 'black')
      button.classList.add('black-pixel');
  }
};

const generateGrid = (width, height) => {
  const grid = document.querySelector('#pixel-button-grid');
  grid.innerHTML = '';
  for (let i = 0; i < height; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < width; j++) {
      const col = document.createElement('div');
      col.classList.add('col');

      const button = document.createElement('button');
      button.classList.add('pixel');
      button.classList.add('black-pixel');
      button.addEventListener('mouseover', () => buttonHandler(button));
      button.addEventListener('mousedown', () => { isMouseDown = true; buttonHandler(button); });

      col.appendChild(button);
      row.appendChild(col);
    }
    grid.appendChild(row);
  }
  buttonGrid = document.querySelectorAll('button.pixel');
};

generateGrid(16, 16);

let isMouseDown = false;
const paintContainer = document.querySelector('#paint-container');
paintContainer.addEventListener('mousedown', () => {
  isMouseDown = true;
});
paintContainer.addEventListener('mouseup', () => {
  isMouseDown = false;
});

let selectedColor = 'white';

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
  let binary = `${document.querySelector('#pixel-button-grid').children.length.toString(2).padStart(8, '0')}`;
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
    let binary = document.querySelector('#binary > textarea').value;
    const height = parseInt(binary.slice(0, 8), 2);
    binary = binary.slice(8);
    const width = binary.length / height;
    generateGrid(width, height);
    buttonGrid.forEach((button, i) => {
      if (binary[i] === '0')
        button.classList.add('black-pixel');
      else if (binary[i] === '1')
        button.classList.remove('black-pixel');
      else
        alert('invalid binary');
    });
    document.querySelector('#binary').classList.remove('active');
    document.querySelector('#binary-ok').classList.remove('active');
  });
});

const updateGridSize = () => {
  const width = document.querySelector('#canvas-width').value;
  const height = document.querySelector('#canvas-height').value;
  generateGrid(width, height);
};
document.querySelectorAll('#canvas-size > input').forEach(input => {
  input.addEventListener('change', updateGridSize);
});
updateGridSize();
