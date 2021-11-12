import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

let flagStart = false;
const selector = document.getElementById('datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
let timerID = null;
if (!flagStart) {
  btnStart.disabled = true;
}
const refs = {
  dataDays: timer.querySelector('[data-days]'),
  dataHours: timer.querySelector('[data-hours]'),
  dataMinutes: timer.querySelector('[data-minutes]'),
  dataSeconds: timer.querySelector('[data-seconds]')
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date().getTime()) {
      flagStart = false;
      btnStart.disabled = true;
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    btnStart.disabled = false;
    flagStart = true;
    btnStart.addEventListener('click', function startTimer() {
      function time() {
        let countTime = selectedDates[0].getTime() - Date.now();
        if(countTime < 1000) {
          clearInterval(timerID);
          Notiflix.Notify.success('Time is over');
        }
        convertMs(countTime);

      }
      timerID = setInterval(time, 1000);

    })
  },

}

flatpickr(selector, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  refs.dataDays.textContent = days.toString().padStart(2, '0');
  refs.dataHours.textContent = hours.toString().padStart(2, '0');
  refs.dataMinutes.textContent = minutes.toString().padStart(2, '0');
  refs.dataSeconds.textContent = seconds.toString().padStart(2, '0');


  // return {days, hours, minutes, seconds};
}