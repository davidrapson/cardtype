/**
 * cardtype.js
 * Made Media Ltd.
 * Based on: https://github.com/PawelDecowski/jQuery-CreditCardValidator/
 *
 * This work is licensed under the Creative Commons Attribution-ShareAlike 3.0
 * Unported License. To view a copy of this license, visit:
 * http://creativecommons.org/licenses/by-sa/3.0/
 */
/* global define: true */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.CardType = factory();
    }
}(this, function () {
    var cardTypes = [
        {
            name: 'amex',
            pattern: /^3[47]/,
            validLength: [15]
        },
        {
            name: 'diners_club_carte_blanche',
            pattern: /^30[0-5]/,
            validLength: [14]
        }, {
            name: 'diners_club_international',
            pattern: /^36/,
            validLength: [14]
        }, {
            name: 'jcb',
            pattern: /^35(2[89]|[3-8][0-9])/,
            validLength: [16]
        }, {
            name: 'laser',
            pattern: /^(6304|670[69]|6771)/,
            validLength: [16, 17, 18, 19]
        }, {
            name: 'visa_electron',
            pattern: /^(4026|417500|4508|4844|491(3|7))/,
            validLength: [16]
        }, {
            name: 'visa',
            pattern: /^4/,
            validLength: [16]
        }, {
            name: 'mastercard',
            pattern: /^5[1-5]/,
            validLength: [16]
        }, {
            name: 'maestro',
            pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
            validLength: [12, 13, 14, 15, 16, 17, 18, 19]
        }, {
            name: 'discover',
            pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
            validLength: [16]
        }
    ];

    function getType( number ) {
        for (var i = 0; i < cardTypes.length; i++) {
            if ( number.match(cardTypes[i].pattern) ) {
                return cardTypes[i];
            }
        }
        return false;
    }

    function validLuhn( number ) {
        var sum = 0, digit,
            digits = number.split('').reverse();
        for  ( var i = 0; i < digits.length; i++ ) {
            digit = +digits[i];
            if ( i % 2 ) {
                digit *= 2;
                sum += (digit < 10) ? digit : digit - 9;
            } else {
                sum += digit;
            }
        }
        return sum % 10 === 0;
    }

    function validLength(number, cardType) {
        return ( _indexOf.call(cardType.validLength, number.length ) > -1 );
    }

    function validateNumber( number ) {

        var cardType = getType( number ),
            luhnValid = false,
            lengthValid = false;
        if ( cardType ) {
            luhnValid = validLuhn( number );
            lengthValid = validLength( number, cardType );
        }

        return {
            cardType: cardType,
            luhnValid: luhnValid,
            lengthValid: lengthValid
        };

    }

    function validate( number ) {
        var normalizedNumber = normalize( number );
        return validateNumber( normalizedNumber );
    }

    function normalize( number ) {
        return number.replace(/[ -]/g, '');
    }

    function _indexOf( needle ) {
        var indexOf;
        if( typeof Array.prototype.indexOf === 'function' ) {
            indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function(needle) {
                var i = -1, index = -1;
                for(i = 0; i < this.length; i++) {
                    if(this[i] === needle) {
                        index = i;
                        break;
                    }
                }
                return index;
            };
        }
        return indexOf.call(this, needle);
    }

    return {
        getType: getType,
        validLength: validLength,
        validLuhn: validLuhn,
        validateNumber: validateNumber,
        validate: validate,
        normalize: normalize
    };
}));
