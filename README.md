# CardType.js v0.1.0

Credit card validator with AMD support.

[![Build Status](https://travis-ci.org/davidrapson/cardtype.svg?branch=master)](https://travis-ci.org/davidrapson/cardtype)

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
