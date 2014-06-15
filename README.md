# CardType.js

Credit card validator with AMD support.

Usage example, add a class name when an input changes to show the entered card type:

````
    var el = document.querySelector('input[name="card_number"]');
    el.addEventListener('input', function() {
        var result = CardType.validate(this.value);
        if ( result.luhnValid && result.lengthValid ) {
          el.classList.add('card-type--' + result.cardType.name );
        }
    });
```

## Usage

### Amd

CardType has AMD (Asynchronous Module Definition) support.

````
var CardType = require('cardtype');
CardType.validate('4000000000000002');
````

### Global

If you are not using AMD then CardType is exposed as a global variable.

````
<script src='/path/to/cardtype.js'></script>
<script>
    CardType.validate('4000000000000002');
</script>
````
