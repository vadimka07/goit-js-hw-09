function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let flagStart = false;
let timerID = null;
refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  disableEnableButtons(btnStatusStart, btnStatusStop) {
    this.start.disabled = btnStatusStart;
    this.stop.disabled = btnStatusStop;
  }
}
if (!flagStart) {
  refs.stop.disabled = true;
}
refs.start.addEventListener('click', () => {
  if(flagStart) {
    return;
  }
  function changeColor() {
    document.body.style.backgroundColor = getRandomHexColor();
  }
  timerID = setInterval(changeColor, 1000);
  refs.disableEnableButtons(true, false);
  flagStart = true;
});

refs.stop.addEventListener('click', ()=> {
  clearInterval(timerID);
  refs.disableEnableButtons(false, true);
  flagStart = false;
})