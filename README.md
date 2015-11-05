# CardType.js

An AMD compatible credit card validaton and type checking component.

[![Circle CI](https://circleci.com/gh/davidrapson/cardtype.svg)](https://circleci.com/gh/davidrapson/cardtype)

- [Docs](http://davidrapson.github.io/cardtype/)
- [Demo](https://rawgit.com/davidrapson/cardtype/master/demo/index.html)

## Install

Install via Bower:

````
bower install cardtype -S
````

## Usage

### AMD

CardType has AMD (Asynchronous Module Definition) support.

````
var CardType = require('cardtype');
var card = new CardType();
card.validate('4000000000000002');
//=> { valid: true, validLength: true, isValidLuhn: true, cardType: 'visa' }
````

### Global

If you are not using AMD then CardType is exposed as a global variable.

````
<script src='/path/to/cardtype.js'></script>
<script>
    var card = new CardType();
    CardType.validate('4000000000000002');
    //=> { valid: true, validLength: true, isValidLuhn: true, cardType: 'visa' }
</script>
````

## Accepted card types

An optional accepted cards array can be passed to the constuctor to restrict which cards are validated:

````
var card = new CardType([ 'amex', 'discover' ]);
card.validate('6011000000000004'); // Discover
//=> { valid: true, validLength: true, isValidLuhn: true, cardType: 'discover' }
card.validate('4000000000000002'); // Visa
//=> false
````

### All accepted card types

* American Express (amex)
* Diners Club Carte Blance (diners_club_carte_blanche)
* Diners Club International (diners_club_international)
* Discover (discover)
* JCB (jcb)
* Laser (laser)
* Maestro (maestro)
* MasterCard (mastercard)
* Visa (visa)
* Visa Electron (visa_electron)

## License

[CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
