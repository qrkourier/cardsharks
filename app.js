

let current = 1;
let visibleCard = null;
playing = true;

// expects parameter 'higher' or 'lower'
function flip(outcome) {
    console.log('flippin\' ' + outcome);
    let request = new XMLHttpRequest();
    request.open('GET', 'http://deckofcardsapi.com/api/deck/new/draw/?count=1');
    request.addEventListener('load', function () {
        console.log('listen for request to load');
        let result = JSON.parse(request.responseText);
        console.log(result);
        let newCard = result.cards[0];
        console.log(newCard);
        let oldVisible = visibleCard;
        console.log(visibleCard);

        // Get a new image URL of a random card.
        // Replace the current URL with the new one.
        let card = document.getElementById('card-' + current);
        //card.src = 'http://deckofcardsapi.com/static/img/8C.png';
        card.src = newCard.image;

        if (newCard.value === 'JACK') {
         visibleCard = 11;
        } else if (newCard.value === 'QUEEN') {
         visibleCard = 12;
        } else if (newCard.value === 'KING') {
         visibleCard = 13;
        } else if (newCard.value === 'ACE') {
         visibleCard = 14;
        } else {
         visibleCard = parseInt(newCard.value);
        }

        console.log(visibleCard);
        current = current + 1;

        if (outcome === 'none') {
          return;
        } else if (outcome === 'higher' && visibleCard > oldVisible) {
          flip('none');
        } else if (outcome === 'higher' && visibleCard < oldVisible) {
          console.log('sorry you lose');
          playing = false;
        } else if (outcome === 'lower' && visibleCard > oldVisible) {
          console.log('sorry you lose');
          playing = false;
        };


});
        request.send(); // actually send the request
}

window.addEventListener('load', function () {
    console.log('the page has loaded');    
    flip('on load');

    // manipulate the Document Object Model (DOM)
    let higherButton = document.getElementById('bigUp');
    higherButton.addEventListener('click', function () {
        if (playing === true){
          flip('higher');
        }
        //console.log('you clicked higher');
    });

    let lowerButton = document.getElementById('littleDown');
    lowerButton.addEventListener('click', function () {
        if (playing === true){
          flip('lower');
        }
        //console.log('you clicked lower');
    });
});
