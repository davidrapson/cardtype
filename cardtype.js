/**
 * CardType.js
 *
 * Author: David Rapson
 * Based on: https://github.com/PawelDecowski/jQuery-CreditCardValidator/
 *
 * This work is licensed under the Creative Commons Attribution-ShareAlike 3.0
 * Unported License. To view a copy of this license, visit:
 * http://creativecommons.org/licenses/by-sa/3.0/
 */
/* eslint-env browser, node, amd */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.CardType = factory();
    }
})(this, function () {

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

    /**
     * CardType constructor
     * @param {Array} accepted  Array of accepted card types
     * @return {Object}         this
     */
    function CardType( accepted ) {
        this.acceptedTypes = accepted || [
            'amex',
            'diners_club_carte_blanche',
            'diners_club_international',
            'discover',
            'jcb',
            'laser',
            'maestro',
            'mastercard',
            'visa_electron',
            'visa'
        ];
        this.cardTypes = [
            {
                name: 'amex',
                pattern: /^3[47]/,
                validLength: [15]
            },
            {
                name: 'diners_club_carte_blanche',
                pattern: /^30[0-5]/,
                validLength: [14]
            },
            {
                name: 'diners_club_international',
                pattern: /^36/,
                validLength: [14]
            },
            {
                name: 'discover',
                pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
                validLength: [16]
            },
            {
                name: 'jcb',
                pattern: /^35(2[89]|[3-8][0-9])/,
                validLength: [16]
            },
            {
                name: 'laser',
                pattern: /^(6304|670[69]|6771)/,
                validLength: [16, 17, 18, 19]
            },
            {
                name: 'maestro',
                pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
                validLength: [12, 13, 14, 15, 16, 17, 18, 19]
            },
            {
                name: 'mastercard',
                pattern: /^5[1-5]/,
                validLength: [16]
            },
            {
                name: 'visa_electron',
                pattern: /^(4026|417500|4508|4844|491(3|7))/,
                validLength: [16]
            },
            {
                name: 'visa',
                pattern: /^4/,
                validLength: [16]
            }
        ];
        return this;
    }

    /**
     * Get type object
     * @param {String} number  Card number
     * @return {Object}        Card type details
     */
    CardType.prototype.getType = function( number ) {
        var types = this.cardTypes;
        for (var i = 0; i < types.length; i++) {
            if ( ( number.match(types[i].pattern) ) && ( _indexOf.call( this.acceptedTypes, types[i].name ) > -1  ) ) {
                return types[i];
            }
        }
        return false;
    };

    /**
     * Passes Luhn algorithm
     * http://en.wikipedia.org/wiki/Luhn_algorithm
     * @param {String} number  Card number
     * @return {Boolean}
     */
    CardType.prototype.isValidLuhn = function( number ) {
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
    };

    /**
     * Card has valid length
     * @param {String} number   Card number
     * @param {Object} cardType Type object for card
     * @return {Boolean}
     */
    CardType.prototype.isValidLength = function( number, cardType ) {
        return ( _indexOf.call(cardType.validLength, number.length ) > -1 );
    };

    /**
     * Passes Luhn & length check
     * @param {String} number Card number
     * @return {Boolean}
     */
    CardType.prototype.isValid = function( number ) {
        return this.validate( number ).valid;
    };

    /**
     * Validate card details
     *
     * Combination of:
     * - .normalise()
     * - .isValid()
     * - .isValidLuhn()
     * - .isValidLength()
     * //=> { valid: true, validLength: true, isValidLuhn: true, cardType: 'visa' }
     *
     * @param {String} number  Card number
     * @return {Object}        Validation object
     */
    CardType.prototype.validate = function( number ) {

        var normalized = this.normalize( number ),
            cardType = this.getType( normalized ),
            validLuhn = ( cardType ) ? this.isValidLuhn( normalized ) : false,
            validLength =  ( cardType ) ? this.isValidLength( normalized, cardType ) : false;

        return {
            valid: ( validLuhn && validLength ),
            validLuhn: validLuhn,
            validLength: validLength,
            cardType: cardType.name
        };

    };

    /**
     * Strip '-' and ' ' characters
     * @param {String} number  Card number
     * @return {String}        Normalise card number
     */
    CardType.prototype.normalize = function( number ) {
        return number.replace(/[ -]/g, '');
    };

    return CardType;

});
