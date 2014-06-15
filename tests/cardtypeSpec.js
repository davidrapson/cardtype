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

        it("Expects card type to be amex", function() {
            expect(CardType.getType( numbers.amex ).name).toBe('amex');
        });

        it("Expects card type to be discover", function() {
            expect(CardType.getType( numbers.discover ).name).toBe('discover');
        });

        it("Expects card type to be maestro", function() {
            expect(CardType.getType( numbers.maestro ).name).toBe('maestro');
        });

        it("Expects card type to be mastercard", function() {
            expect(CardType.getType( numbers.mastercard ).name).toBe('mastercard');
        });

        it("Expects card type to be visa", function() {
            expect(CardType.getType( numbers.visa ).name).toBe('visa');
        });

        it("Expects card type to be visa electron", function() {
            expect(CardType.getType( numbers.visa_electron ).name).toBe('visa_electron');
        });

    });

    describe("#validLength", function() {

        var type = CardType.getType( numbers.visa );

        it("Expects card number to have a valid length", function() {
            expect(CardType.validLength( numbers.visa, type )).toBe(true);
        });
        it("Expects card number to have an invalid length", function() {
            expect(CardType.validLength( '40000000000000020000', type )).toBe(false);
        });
        it("Expects card number to have an invalid length", function() {
            expect(CardType.validLength( '40000000000000', type )).toBe(false);
        });
        it("Expects card number to have an invalid length", function() {
            expect(CardType.validLength( '123456', type )).toBe(false);
        });

    });

    describe("#validateNumber", function() {

        it("Expects card number to be valid", function() {
            expect(CardType.validateNumber( numbers.visa ).cardType.name).toBe('visa');
        });
        it("Expects luhn check to have passed", function() {
            expect(CardType.validateNumber( numbers.visa ).luhnValid).toBe(true);
        });
        it("Expects length check to have passed", function() {
            expect(CardType.validateNumber( numbers.visa ).lengthValid).toBe(true);
        });
        it("Expects luhn check to have failed", function() {
            expect(CardType.validateNumber( '4000000000000' ).luhnValid).toBe(false);
        });
        it("Expects length check to have failed", function() {
            expect(CardType.validateNumber( '4000000000000' ).lengthValid).toBe(false);
        });

    });

    describe("#validate", function() {

        it("Expects card number to be valid", function() {
            expect(CardType.validateNumber( numbers.amex ).cardType.name).toBe('amex');
            expect(CardType.validateNumber( numbers.maestro ).cardType.name).toBe('maestro');
            expect(CardType.validateNumber( numbers.visa ).cardType.name).toBe('visa');
            expect(CardType.validate( '4000-0000-0000-0002' ).cardType.name).toBe('visa');
            expect(CardType.validate( '4000 0000 0000 0002' ).cardType.name).toBe('visa');
        });
        it("Expects luhn check to have passed", function() {
            expect(CardType.validate( '4000-0000-0000-0002' ).luhnValid).toBe(true);
            expect(CardType.validate( '4000 0000 0000 0002' ).luhnValid).toBe(true);
            expect(CardType.validate( '4000000000000002' ).luhnValid).toBe(true);
        });
        it("Expects length check to have passed", function() {
            expect(CardType.validate( numbers.visa ).lengthValid).toBe(true);
        });
        it("Expects luhn check to have failed", function() {
            expect(CardType.validate( '4000000000000' ).luhnValid).toBe(false);
            expect(CardType.validate( '400-000000-0000' ).luhnValid).toBe(false);
            expect(CardType.validate( '400 000000-0000' ).luhnValid).toBe(false);
        });
        it("Expects length check to have failed", function() {
            expect(CardType.validate( '4000000000000' ).lengthValid).toBe(false);
        });

    });

    describe("#normalize", function() {

        it("Expects card number to be normalized", function() {
            expect(CardType.validateNumber( numbers.visa ).cardType.name).toBe('visa');
        });

    });

}());
