const refreshEl = document.querySelector('#refresh');
const jokeEl = document.querySelector('#joke');
let isLoading = false;

refreshEl.addEventListener('click', () => {
    if (!isLoading) {
        getJoke();
    }
});

async function getJoke() {
    jokeEl.innerText = 'Loading...';
    isLoading = true;
    refreshEl.style.visibility = 'hidden';

    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');

        if (!response.ok) {
            throw new Error(`HTTP Error: Status ${response.status}`);
        }

        const jokeData = await response.json();

        jokeEl.innerText = `${jokeData.setup} ${jokeData.punchline}`;
    } catch (error) {
        jokeEl.innerText = 'Sorry, there was an error getting a joke.';
        console.error(error);
    }

    isLoading = false;
    refreshEl.style.visibility = 'visible';
}

getJoke();