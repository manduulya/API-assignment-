'use strict';

const apiUrl = 'https://api.github.com/users/';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
}

function displayResult(responseJson, maxResult){
    console.log(responseJson);
    $('.result-list').empty();

    for (let i=0; i<response.users.length & i<maxResult; i++){
        $('.result-list').append(
            `<li><h2>
            <a class="js-result-name" href="${responseJson.html_url}" target="_blank">${responseJson.name}</a>
            by <a class="js-user-name" href="${responseJson.owner.html_url}" target="_blank">${responseJson.owner.login}</a></h2></li>
            <li><p>Number of watchers: <span class="js-watchers-count">${responseJson.watchers_count}</span></p></li>
            <li><p>Number of open issues: <span class="js-issues-count">${responseJson.open_issues}</span></p></li>`
        )
    }
}

function getUser(query, maxResult = 10){
    const params = {
        q: query,
    };
    const queryString = formatQueryParams(params);
    const url = apiUrl + queryString;
    
    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            throw new Error(response.statusText)
        })
        .then(responseJson => displayResult(responseJson, maxResult))
        .catch(err => {
            $('.js-error-message').text(`something went wrong: ${error.message}`);
        });
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