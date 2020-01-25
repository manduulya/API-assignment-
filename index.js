// 'use strict';

const apiUrl = 'https://api.github.com/users/';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
}

function displayResult(queryItems){
    console.log(queryItems);
    $('.result-list').empty();

    // for (let i=0; i<response.users.length & i<maxResult; i++){
        $('.result-list').append(
            `<li><h2>
            <a class="js-result-name" href="${queryItems.html_url}" target="_blank">${queryItems.html_url}</a>
            by <p class="js-user-name" href="${queryItems.html_url}" target="_blank">${queryItems.login}</p></h2></li>`
        )
        $('.js-result').removeClass('hidden');
}


function getUser(maxResult = 10){
    const userName = $('.JS-Query').val();
    const url = apiUrl + userName;
    
    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            throw new Error(response.statusText)
        })
        .then(responseJson => displayResult(responseJson, maxResult))
        // .catch(err => {
        //     $('.js-error-message').text(`something went wrong: ${error.message}`);
        // });
}

//main function
function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const userInput = $('.JS-Query').val();
        getUser(userInput);
    });
}

$(watchForm);