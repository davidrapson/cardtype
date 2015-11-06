require(['cardtype'], function (CardType) {
    var card = new CardType();
    var el = document.querySelector('input[name="card_number"]');

    el.addEventListener('input', function() {
        var cardClass;
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
