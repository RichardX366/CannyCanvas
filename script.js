const swap = document.querySelector('#swap');
const reset = document.querySelector('#reset');
const d = document.querySelector('#d');
const textarea = document.querySelector('textarea');
const p = document.querySelector('p');
let bw = [];
let canny = [];
let x = 0;
let y = 0;

let canvasCanny = false;

const fillCanvas = (pixels) => {
  d.innerHTML = '';
  pixels.forEach((row, h) =>
    row.forEach((color, w) => {
      const div = d.appendChild(document.createElement('div'));
      div.style.backgroundColor = `hsl(0, 0%, ${color * 100}%)`;
      div.onclick = () =>
        (p.innerHTML = `(${x + w - row.length / 2}, ${
          y + h - pixels.length / 2
        }): ${color}`);
    }),
  );
};

swap.onclick = () => {
  if (canvasCanny) fillCanvas(bw);
  else fillCanvas(canny);
  canvasCanny = !canvasCanny;
};

const resetClick = async () => {
  const [bwText, cannyText, xText, yText] = textarea.value.split(';');
  bw = JSON.parse(bwText);
  canny = JSON.parse(cannyText);
  x = +xText;
  y = +yText;
  localStorage.text = textarea.value;
  fillCanvas(bw);
  d.style.gridTemplateColumns = `repeat(${canny[0].length}, minmax(0, 1fr))`;
};

reset.onclick = resetClick;

if (localStorage.text) {
  textarea.value = localStorage.text;
  resetClick();
}
