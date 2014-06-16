# CardType.js v0.3.0

Credit card validaton and type checking module with AMD support.

[![Build Status](https://travis-ci.org/davidrapson/cardtype.svg?branch=master)](https://travis-ci.org/davidrapson/cardtype)

## Install

Install via Bower:

````
bower install cardtype -S
````
## Demo

[View the demo](http://davidrapson.co.uk/cardtype/demo/)

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

## API

### .validate( number )

````
var card = new CardType();
card.validate('4000000000000002');
//=> { valid: true, validLength: true, isValidLuhn: true, cardType: 'visa' }
````

### .isValid( number )

````
var card = new CardType();
card.isValid('4000000000000002');
//=> true
````

### .isValidLuhn( number )

````
var card = new CardType();
card.isValidLuhn('4000000000000002');
//=> true
````

### .isValidLength( number, cardType )

````
var card = new CardType();
var type = card.getType('4000000000000002');
card.isValidLength('4000000000000002', type);
//=> true
````

### .normalize()

````
var card = new CardType();
card.normalize('4000-0000-0000-0002');
//=> 4000000000000002
````

### .getType()

````
var card = new CardType();
card.getType('4000000000000002');
//=> { name: 'visa', pattern: /^4/, validLength: [16] }
````

## License

[CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
