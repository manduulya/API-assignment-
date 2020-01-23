'use strict';

function findRep(){
    fetch('https://api.github.com/users')
    .then(Response => Response.json())
    .then(responseJson => console.log(responseJson));
}


