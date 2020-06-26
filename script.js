const ulMoviesOverview = document.querySelector('#moviesOverview');

//De functie om de filmposters te laden in de UL. 
const addMoviesToDom = movies => {
    const moviesToList = movies.map(movie => {
        const newLi = document.createElement('li');
        newLi.className = 'movie-list-item'
        const newImg = document.createElement('img');
        newImg.src = movie.Poster;
        newImg.className = 'image-item';
        const newA = document.createElement('a');
        newA.href = 'https://www.imdb.com/title/' + movie.imdbID;
        newLi.appendChild(newA);
        newA.appendChild(newImg);
        return newLi;
    });

    moviesToList.forEach(movie => {
        ulMoviesOverview.appendChild(movie);
    });
};
addMoviesToDom(movies);

//Het selecteren van alle radiobuttons in een variabele en hiervan een array maken. 
const allRadioButtons = document.querySelectorAll('.btn');
Array.from(allRadioButtons);

//Een eventlistener vastmaken aan elke radiobutton. 
for (index = 0; index < allRadioButtons.length; index++) {
    allRadioButtons[index].addEventListener('change', () => {
        handleOnChangeEventRadio(event);
    });
};

//Functie maken die wordt afgevuurd als een van de radiobuttons is aangevinkt.
const handleOnChangeEventRadio = event => {
    switch (event.target.id) {
        case 'nieuwste-films':
            filterLatersMovies();
            break;
        case 'avengers':
            filterMovies('Avengers');
            break;
        case 'x-men':
            filterMovies('X-Men');
            break;
        case 'princess':
            filterMovies('Princess');
            break;
        case 'batman':
            filterMovies('Batman');
            break;
        default:
            addMoviesToDom(movies);
    };
};

//De functie voor de filters op titel
const filterMovies = wordInMovieTitle => {
    const movieTitlesWithWord = movies.filter(movie => {
        return movie.Title.includes(wordInMovieTitle)
    }).map(movies => {
        return movies;
    });
    ulMoviesOverview.querySelectorAll('li').forEach(item => item.remove());
    addMoviesToDom(movieTitlesWithWord);
};

//De functie voor de filter op jaartal
const filterLatersMovies = () => {
    const movieTitlesLatest = movies.filter(movie => {
        return movie.Year >= '2014';
    }).map(movies => {
        return movies;
    });
    console.log(movieTitlesLatest);
    ulMoviesOverview.querySelectorAll('li').forEach(item => item.remove());
    addMoviesToDom(movieTitlesLatest);
};

//De functie om te filteren op de inputarea
const searchTextInput = document.querySelector('#text-input');

searchTextInput.addEventListener('change', event => {
    const searchMovieTitle = movies.filter(movie => {
        const movieTitleLowerCase = movie.Title.toLowerCase();
        const inputLowerCase = event.target.value.toLowerCase();
        if (movieTitleLowerCase === inputLowerCase) {
            return movie;
        }
    });
    ulMoviesOverview.querySelectorAll('li').forEach(item => item.remove());
    addMoviesToDom(searchMovieTitle);
    if (searchMovieTitle.length === 0) {
        alert('Sorry deze film hebben we niet in ons assortiment. Probeer het nog een keer.')
        addMoviesToDom(movies);
    }
});