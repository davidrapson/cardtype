require(['cardtype'], function( CardType ) {

    var cardClass;
    var el = document.querySelector('input[name="card_number"]');
    el.addEventListener('input', function() {
        var result = CardType.validate(this.value);
        if ( result.luhnValid && result.lengthValid ) {
            cardClass = 'card-type--' + result.cardType.name;
            el.classList.add( cardClass );
            console.log(cardClass);
        } else {
            console.log(cardClass);
            el.classList.remove( cardClass );
            cardClass = false;
        }
    });

});
