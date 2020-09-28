const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#message-one');
const msgTwo = document.querySelector('#message-two');
const img = document.querySelector('#weather-img');

msgOne.textContent = '';
msgTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    msgOne.textContent = 'Loading...';
    msgTwo.textContent = '';
    img.src = '';

    fetch(`http://localhost:3000/weather?address=${location}`)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    msgOne.textContent = data.error;
                    msgTwo.textContent = '';
                    img.src = '';
                } else {
                    msgOne.textContent = data.location;
                    msgTwo.textContent = data.forecast;
                    img.src = data.img[0];
                }
            })
        })
})