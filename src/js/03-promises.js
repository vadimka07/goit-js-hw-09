import Notiflix from 'notiflix';

const form = document.querySelector('.form');
function createPromise(position, delay) {
 return new Promise((resolve, reject)=> {
   setTimeout(() => {
     const shouldResolve = Math.random() > 0.3;
     if (shouldResolve) {
       resolve({position, delay})
     } else {
       reject({position, delay})
     }

   }, delay)
 })
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let firstDelay =  Number(e.target.elements.delay.value);
  const amountValue = e.target.elements.amount.value;
    for (let i = 1; i <= amountValue; i++) {
     createPromise(i, firstDelay).then(({ position, delay }) => {
       Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
     })
       .catch(({ position, delay }) => {
         Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
       });
      firstDelay += Number(e.target.elements.step.value);
    }
})