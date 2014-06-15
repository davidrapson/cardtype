require(['cardtype'], function( CardType ) {

    var card = new CardType(),
        el = document.querySelector('input[name="card_number"]'),
        cardClass;

    el.addEventListener('input', function() {
        var result = card.validate(this.value);
        if ( result.valid ) {
            el.classList.remove( cardClass );
            cardClass = 'card-type--' + result.cardType;
            el.classList.add( cardClass );
        } else {
            el.classList.remove( cardClass );
            cardClass = false;
        }
    });

});
