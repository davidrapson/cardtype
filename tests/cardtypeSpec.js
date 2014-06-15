(function() {

    var numbers = {
        amex: '374200000000004',
        discover: '6011000000000004',
        maestro: '501800000009',
        mastercard: '5100000000000008',
        visa: '4000000000000002',
        visa_electron: '4026000000000002'
    };

    describe("#getCardType", function() {

        var card = new CardType();

        it("Expects card type to be amex", function() {
            expect(card.getType( numbers.amex ).name).toBe('amex');
        });

        it("Expects card type to be discover", function() {
            expect(card.getType( numbers.discover ).name).toBe('discover');
        });

        it("Expects card type to be maestro", function() {
            expect(card.getType( numbers.maestro ).name).toBe('maestro');
        });

        it("Expects card type to be mastercard", function() {
            expect(card.getType( numbers.mastercard ).name).toBe('mastercard');
        });

        it("Expects card type to be visa", function() {
            expect(card.getType( numbers.visa ).name).toBe('visa');
        });

        it("Expects card type to be visa electron", function() {
            expect(card.getType( numbers.visa_electron ).name).toBe('visa_electron');
        });

    });

    describe("#validLength", function() {

        var card = new CardType();
        var type = card.getType( numbers.visa );

        it("Expects card number to have a valid length", function() {
            expect(card.isValidLength( numbers.visa, type )).toBe(true);
        });
        it("Expects card number to have an invalid length", function() {
            expect(card.isValidLength( '40000000000000020000', type )).toBe(false);
        });
        it("Expects card number to have an invalid length", function() {
            expect(card.isValidLength( '40000000000000', type )).toBe(false);
        });
        it("Expects card number to have an invalid length", function() {
            expect(card.isValidLength( '123456', type )).toBe(false);
        });

    });

    describe("#isValid", function() {

        var card = new CardType();
        it("Expects card number to be valid", function() {
            expect(card.isValid( numbers.visa )).toBe(true);
            expect(card.isValid( '4000-0000-0000-0002' )).toBe(true);
            expect(card.isValid( '4000 0000 0000 0002' )).toBe(true);
            expect(card.isValid( '4000000000000002' )).toBe(true);
        });

    });

    describe("#validate", function() {

        var card = new CardType();
        it("Expects card number to be valid", function() {
            expect(card.validate( '4000-0000-0000-0002' ).valid).toBe(true);
            expect(card.validate( '4000 0000 0000 0002' ).valid).toBe(true);
            expect(card.validate( '4000000000000002' ).valid).toBe(true);
        });
        it("Expects card type to be valid", function() {
            expect(card.validate( numbers.amex ).cardType).toBe('amex');
            expect(card.validate( numbers.maestro ).cardType).toBe('maestro');
            expect(card.validate( numbers.visa ).cardType).toBe('visa');
            expect(card.validate( '4000-0000-0000-0002' ).cardType).toBe('visa');
            expect(card.validate( '4000 0000 0000 0002' ).cardType).toBe('visa');
        });
        it("Expects luhn check to have passed", function() {
            expect(card.validate( '4000-0000-0000-0002' ).validLuhn).toBe(true);
            expect(card.validate( '4000 0000 0000 0002' ).validLuhn).toBe(true);
            expect(card.validate( '4000000000000002' ).validLuhn).toBe(true);
        });
        it("Expects length check to have passed", function() {
            expect(card.validate( numbers.visa ).validLength).toBe(true);
        });
        it("Expects luhn check to have failed", function() {
            expect(card.validate( '4000000000000' ).validLuhn).toBe(false);
            expect(card.validate( '400-000000-0000' ).validLuhn).toBe(false);
            expect(card.validate( '400 000000-0000' ).validLuhn).toBe(false);
        });
        it("Expects length check to have failed", function() {
            expect(card.validate( '4000000000000' ).validLuhn).toBe(false);
        });

    });

    describe("#normalize", function() {

        var card = new CardType();
        var expected = '4000000000000002';
        it("Expects card number to be normalized", function() {
            expect(card.normalize( '4000000000000002' )).toBe(expected);
            expect(card.normalize( '4000 0000 0000 0002' )).toBe(expected);
            expect(card.normalize( '4000-0000-0000-0002' )).toBe(expected);
            expect(card.normalize( '40 000-000-0 00-00-0 02' )).toBe(expected);
            expect(card.normalize( '400--00  -00 00---0000 0  02' )).toBe(expected);
        });

    });

}());
