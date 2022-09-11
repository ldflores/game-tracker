/*global Chart*/
/*chart.js*/
'use strict';
let characters = ['MARIO',
    'DONKEY KONG',
    'LINK',
    'SAMUS',
    'DARK SAMUS',
    'YOSHI',
    'KIRBY',
    'FOX',
    'PIKACHU',
    'LUIGI',
    'NESS',
    'CAPTAIN FALCON',
    'JIGGLY PUFF',
    'PEACH',
    'DAISY',
    'BOWSER',
    'ICE CLIMBERS',
    'SHEIK',
    'ZELDA',
    'DR MARIO',
    'PICHU',
    'FALCO',
    'MARTH',
    'LUCINA',
    'YOUNG LINK',
    'GANONDORF',
    'MEWTWO',
    'ROY',
    'CHROM',
    'MR GAME & WATCH',
    'META KNIGHT',
    'PIT',
    'DARK PIT',
    'ZERO SUIT SAMUS',
    'WARIO',
    'SNAKE',
    'IKE',
    'POKÉMON TRAINER',
    'DIDDY KONG',
    'LUCAS',
    'SONIC',
    'KING DEDEDE',
    'OLIMAR',
    'LUCARIO',
    'ROB',
    'TOON LINK',
    'WOLF',
    'VILLAGER',
    'MEGA MAN',
    'Wii Fit TRAINER',
    'ROSALINA & LUMA',
    'LITTLE MAC',
    'GRENINJA',
    'Mii FIGHTER',
    'PALUTENA',
    'PAC-MAN',
    'ROBIN',
    'SHULK',
    'BOWSER JR',
    'DUCK HUNT',
    'RYU',
    'KEN',
    'CLOUD',
    'CORRIN',
    'BAYONETTA',
    'INKLING',
    'RIDLEY',
    'SIMON',
    'RICHTER',
    'KING K ROOL',
    'ISABELLE',
    'INCINEROAR',
    'PIRANHA PLANT',
    'JOKER',
    'HERO',
    'BANJO & KAZOOIE'
];
let state = { main: "", id: Math.floor(Math.random() * characters.length), data: [] }

dropdown();
infoClick(document.querySelector('#select button'), document.querySelector('#select div div p'));
infoClick(document.querySelector('#stat button'), document.querySelector('#stat div div p'));
infoClick(document.querySelector('#match button'), document.querySelector('#match div div p'));
fetchData();

document.querySelectorAll('.dropdown-menu a').forEach(function (elem) {
    elem.addEventListener('click', function () {
        document.querySelector('.dropdown button').textContent = elem.textContent;
        state.id = characters.indexOf(elem.textContent);
        showTrackOptions();
        clearCanvas();
        state.main = elem.textContent;
    });
});
renderStat(document.querySelectorAll('#stat .card-body button')[0], drawChart);
renderStat(document.querySelectorAll('#stat .card-body button')[1], showOppStat);
search();
showAllOption();

// Displays a character opponent card, given character name
function displayOpp(name) {
    let row = document.querySelector('#opponents');

    let colElem = document.createElement('div');
    let cardElem = document.createElement('div');
    let cardBodElem = document.createElement('div');
    let rowElem = document.createElement('div');
    let colimgElem = document.createElement('div');
    let colContElem = document.createElement('div');
    let imgElem = document.createElement('img');
    let hElem = document.createElement('h3');
    let btnWinElem = document.createElement('button');
    let btnLosElem = document.createElement('button');

    colElem.setAttribute('class', 'col-md-6 col-xl-3 d-flex');
    cardElem.setAttribute('class', 'card text-center mb-4 bg-transparent border-dark w-100');
    cardBodElem.setAttribute('class', 'card-body');
    rowElem.setAttribute('class', 'row');
    colimgElem.setAttribute('class', 'col-sm');
    colContElem.setAttribute('class', 'col-sm card-contents');
    imgElem.setAttribute('class', 'ptb3');
    imgElem.setAttribute('src', 'https://cdn1.iconfinder.com/data/icons/healthy-life-filled-outline-1/64/gym-fight-punch-boxing_gloves-sports_and_competition-boxing-athlete-olympic-training-gloves-sport-512.png');
    imgElem.setAttribute('alt', 'Opponent symbol');
    hElem.setAttribute('class', 'card-title');
    btnWinElem.setAttribute('class', 'btn btn-success btn-lg m-1');
    btnWinElem.setAttribute('type', 'button');
    btnLosElem.setAttribute('class', 'btn btn-danger btn-lg');
    btnLosElem.setAttribute('type', 'button');

    row.appendChild(colElem);
    colElem.appendChild(cardElem);
    cardElem.appendChild(cardBodElem);
    cardBodElem.appendChild(rowElem);
    rowElem.appendChild(colimgElem);
    colimgElem.appendChild(imgElem);
    rowElem.appendChild(colContElem);
    colContElem.appendChild(hElem);
    colContElem.appendChild(btnWinElem);
    colContElem.appendChild(btnLosElem);

    hElem.textContent = name;
    btnWinElem.textContent = "WIN";
    btnLosElem.textContent = "LOSS";

    let responseElem = document.createElement('p');
    responseElem.id = "updated";
    responseElem.setAttribute('class', "");
    responseElem.textContent = "";
    colContElem.appendChild(responseElem);

    clickWin(btnWinElem, responseElem);
    clickLoss(btnLosElem, responseElem);
}

// adds event listener to given button element, on click updates win data in the state
// and given an element makes it an alert
function clickWin(btnElem, responseElem) {
    btnElem.addEventListener('click', function () {
        state.data[state.id].WIN = state.data[state.id].WIN + 1;
        drawChart();
        updateFeedback(responseElem);
    });
}

// adds event listener to given button element, on click updates loss data in the state
// and given an element makes it an alert
function clickLoss(btnElem, responseElem) {
    btnElem.addEventListener('click', function () {
        state.data[state.id].LOSS = state.data[state.id].LOSS + 1;
        drawChart();
        updateFeedback(responseElem);
    });
}

// sets an alert for feedback and then removed after 1.5 seconds
function updateFeedback(responseElem) {
    responseElem.setAttribute('class', "alert alert-info");
    responseElem.textContent = "Updated";
    setTimeout(function () {
        responseElem.setAttribute('class', "");
        responseElem.textContent = "";
    }, 1500);
}

// displays all dropdown items, items are characters
function dropdown() {
    characters.forEach(function (name) {
        let menu = document.querySelector(".dropdown-menu");

        let item = document.createElement('a');
        item.setAttribute('class', 'dropdown-item');
        item.href = '#select';
        item.textContent = name;

        menu.appendChild(item);
    });
}

// makes given button show the content of given paragraph with a click
function infoClick(iElem, pElem) {
    iElem.addEventListener('click', function () {
        pElem.classList.toggle('d-none')
    });
}

// displays all character opponent cards
function displayAllOpp() {
    characters.forEach(function (name) {
        displayOpp(name);
    });
}

// removes all current opponent cards
function removeOpps() {
    let allOpp = document.querySelector('#opponents');
    allOpp.innerHTML = "";
}

// shows a loading spinner
function toggleSpinner() {
    document.querySelector('main .container i').classList.toggle('d-none');
}

// given an Error object, displays the objects message on the page
function renderError(err) {
    let erElem = document.createElement('p');
    erElem.setAttribute('class', "alert alert-danger");
    erElem.textContent = err.message;
    document.querySelector('#opponents').appendChild(erElem);
}

// shows the next options: view stats, opponents
function showTrackOptions() {
    if (state.main == "") {
        document.querySelector('#match').classList.toggle('d-none');
        document.querySelector('#stat').classList.toggle('d-none');
    }
}

// shows all opponents
function showAllOption() {
    let showedAll = false;
    let showAllBtn = document.querySelector('#match .card-body .btn-outline-secondary');
    showAllBtn.addEventListener('click', function () {
        removeOpps();
        if (!showedAll) {
            displayAllOpp();
            showAllBtn.textContent = "Hide all opponents";
            showedAll = true;
        } else {
            showAllBtn.textContent = "Show all opponents";
            showedAll = false;
        }
    });
}

// shows all characters that match the form input after search button is clicked
// returns true when input matches available characters
function search() {
    let found = false;
    document.querySelector('#match form button').addEventListener('click', function (event) {
        event.preventDefault();
        let input = document.querySelector('#match form input').value.toUpperCase();
        removeOpps();
        toggleSpinner();
        characters.forEach(function (name) {
            if (name.indexOf(input) != -1 || input.indexOf(name) != -1) {
                displayOpp(name);
                found = true;
            }
        });
        if (!found) {
            renderError(new Error("No opponents found"));
        }
        toggleSpinner();
        found = false;
    });
    return found;
}

// shows the data for given data after the given button is clicked
function renderStat(btnElem, showData) {
    btnElem.addEventListener('click', function () {
        showData();
        let statBody = document.querySelector('#stat .card-body');
        if (statBody.children.length > 2) {
            statBody.removeChild(statBody.children[2]);
        }
    });
}
// shows graphic for nemesis
function showOppStat() {
    drawPie();
    let statBody = document.querySelector('#stat .card-body');
    let oStat = document.createElement('p');
    oStat.textContent = "YOUR NEMESIS IS: " + state.data[state.id].NEMESIS;
    statBody.appendChild(oStat);
}

// Show the error message
function renderDataError(err) {
    let recElem = document.querySelector('#stat .card-body');
    let erElem = document.createElement('p');
    erElem.setAttribute('class', "alert-danger");
    erElem.textContent = err.message;
    recElem.appendChild(erElem);
}

// AJAX Request
function fetchData() {
    fetch('data/sampledata.json')
        .then(function (response) {
            let dataPromise = response.json();
            return dataPromise;
        })
        .then(function (data) {
            state.data = data;
            //showData();
        })
        .catch(function (err) {
            renderDataError(err);
        });
}

// Bar chart code from chart.js documentation (https://www.chartjs.org/docs/latest/)
// This returns a bar chart of the wins and losses for the character someone chose.
// For this there are two labels wins and losses which represent the results these are colored red
// and blue for wins and losses respectively with a 0.2 opacity.
// The option added allows for the bar chart to begin at zero otherwise one of the bars may not show
// since it could start at value and hide the results of one stat. Gathers data from the state to display.
function drawChart() {
    let ctx = clearCanvas();
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Wins', 'Losses'],
            datasets: [{
                label: 'Win & Losses',
                data: [state.data[state.id].WIN, state.data[state.id].LOSS],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    return myChart;
}

// Doughnut chart code from chart.js documentation (https://www.chartjs.org/docs/latest/)
// Will draw a pie chart with a hole, referred to as a doughnut. Has two variables total losses, which is
// the total losses and also has Losses Against Nemesis which is the loses against your nemesis
// Contains two colors, purple and red for each of the losses stats.
// Gathers data from the state and displays it.
function drawPie() {
    let ctx = clearCanvas();
    let myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Total Losses', 'Losses Against Nemesis'],
            datasets: [{
                label: 'Nemesis Losses',
                data: [state.data[state.id].LOSS, state.data[state.id].NWIN],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(222, 0, 258, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(222, 0, 258, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
    return myChart;
}

// clears canvas with chart visualizations and returns new canvas tag
function clearCanvas() {
    let parentElem = document.querySelector('.bar-chart');
    let ctx = document.getElementById('chart');
    parentElem.removeChild(ctx);
    let canvasElem = document.createElement('canvas');
    canvasElem.id = "chart";
    ctx = canvasElem;
    parentElem.appendChild(ctx);
    return ctx;
}
