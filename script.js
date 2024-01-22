document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('grid-container');
  const colorInput = document.getElementById('color-input');
  const sizeValue = document.getElementById('size-value');
  const rangeInput = document.getElementById('range-input');
  const eraserButton = document.getElementById('eraser-btn');
  const rainbowButton = document.getElementById('rainbow-btn');
  const originalColorButton = document.getElementById('color-btn');
  const clearButton = document.getElementById('clear-btn');

  let originalColor = '#252B48';
  let rainbowModeActive = false;
  let eraserModeActive = false;
  let previousColor = originalColor;

  // Initial grid setup
  createGrid(16);

  // Add event listener for the range input
  rangeInput.addEventListener('input', function () {
    const newSize = parseInt(rangeInput.value);
    clearGrid();
    createGrid(newSize);
    updateSizeValue(newSize);
    updateButtonStates();
  });

  // Add event listener for the eraser button
  eraserButton.addEventListener('click', function () {
    colorInput.value = '#ffffff';
    eraserModeActive = true;
    rainbowModeActive = false;
    updateButtonStates();
  });

  // Add event listener for the rainbow button
  rainbowButton.addEventListener('click', function () {
    rainbowModeActive = true;
    eraserModeActive = false;
    updateButtonStates();
  });

  // Add event listener for the original color button
  originalColorButton.addEventListener('click', function () {
    colorInput.value = previousColor;
    eraserModeActive = false;
    rainbowModeActive = false;
    updateButtonStates();
  });

  // Add event listener for the color input
  colorInput.addEventListener('input', function () {
    previousColor = colorInput.value;
    updateButtonStates();
  });

  // Add event listener for the Clear button
  clearButton.addEventListener('click', function () {
    clearGrid();
  });

  function createGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const square = document.createElement('div');
        square.classList.add('square');
        container.appendChild(square);

        square.addEventListener('mouseover', function () {
          if (eraserModeActive) {
            this.style.backgroundColor = '#ffffff';
          } else if (rainbowModeActive) {
            this.style.backgroundColor = getRandomColor();
          } else {
            this.style.backgroundColor = colorInput.value;
          }
        });
      }
    }
  }

  function clearGrid() {
    document.querySelectorAll('.square').forEach(square => {
      square.style.backgroundColor = '#ffffff';
    });
  }

  function updateSizeValue(size) {
    sizeValue.textContent = `${size} x ${size}`;
  }

  function updateButtonStates() {
    if (eraserModeActive) {
      eraserButton.classList.add('active');
      rainbowButton.classList.remove('active');
      originalColorButton.classList.remove('active');
    } else if (rainbowModeActive) {
      eraserButton.classList.remove('active');
      rainbowButton.classList.add('active');
      originalColorButton.classList.remove('active');
    } else {
      eraserButton.classList.remove('active');
      rainbowButton.classList.remove('active');
      originalColorButton.classList.remove('active');
    }
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});
