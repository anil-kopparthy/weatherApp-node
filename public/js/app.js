// fetch('http://puzzle.mead.io/puzzle')
//   .then((res) => res.json())
//   .then((data) => console.log(data));

const weatherForm = document.querySelector('form');
const searchLocation = document.getElementById('address');
const messageOne = document.getElementById('messageOne');
const messageTwo = document.getElementById('messageTwo');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  axios
    .get(`http://localhost:3000/weather?address=${searchLocation.value}`)
    .then((res) => {
      res.data.error
        ? (messageOne.textContent = res.data.error)
        : ((messageOne.textContent = res.data.location),
          (messageTwo.textContent = res.data.forecast));
    });
  searchLocation.value = '';
});
