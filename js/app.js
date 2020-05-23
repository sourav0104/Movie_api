//selectors
let search = document.querySelector('#search');

search.addEventListener('blur', (e) => {

    let searchText = e.target.value;
    searchMovies(searchText);


});

//speech recognition api
let speechSearch = document.getElementById('speechIcon');
speechSearch.addEventListener = ('click',()=>{
    window.SpeechRecognition = 
    window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    let p =document.createElement('p');
    recognition.interimResults = true;

    recognition.addEventListener('result',(e)=>{
        let transcript = [...e.results]
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
    
        search.value = transcript;
        if(e.results[0].isFinal){
            p = document.createElement('p');
            p.innerHTML = transcript;
            let searchText = transcript;
            searchMovies(searchText);
        }
    });
    recognition.start();
});



//function

function searchMovies(searchText) {


    let imdbApi = `https://www.omdbapi.com/?s=${searchText}&apikey=30854704`;

    window.fetch(imdbApi)
        .then(data => {
            data.json()
                .then(movie => {
                    let movieData = movie.Search;
                    let output = [];
                    for (let film of movieData) {
                        if (film.Poster === "N/A") {
                            film.Poster = '/images/404-error-page-design-vector-illustration-x.jpg';
                        }
                        output += `
                        <img src ="${film.Poster}"/>
                      
                `
                    }

                    document.getElementById('template').innerHTML = output;
                }).catch(err => console.log(err));

        }).catch(err => console.log(err));
}



//jquery

$(".fa-times-circle").on('click',
    function () {
        $('#template').fadeOut(300);

    }

)

// $("#template").hide();

// $('#search').blur(function(){
//     $('#template').fadeIn(300);
// })
// $('#search').on({
//     blur:function(){
//         $('#template').fadeIn(400);
//     }
// })