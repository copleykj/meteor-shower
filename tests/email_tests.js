Mesosphere({
    name: "testForm",
    fields: {

        email: {
            format: "email",
            message: "not an email"
        },

        hex: {
            format: "hex",
            message: "not a hexadecimal value"
        },
        int: {
            format: "integer",
            message: "not a hexadecimal value"
        },
        float: {
            format: "float",
            message: "not a float value"
        }
    }});

Tinytest.add("email format", function (test) {


        var validationObject = Mesosphere.testForm.validate([
            {"name": "email", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "email", "value": "email@domain.ext"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "email", "value": "EMAIL@domAin.EXT"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "anotherfield", "value": "email@domain.ext"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.testForm.validate([
            {"name": "email", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "email", "value": "email@"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "email", "value": "email"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "email", "value": "email@domain@domain.com"}
        ]);
        test.isTrue(validationObject.errors !== false);
    }
);

Tinytest.add("hex format", function (test) {


        var validationObject = Mesosphere.testForm.validate([
            {"name": "hex", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "hex", "value": "1234567890abcdef"}
        ]);
        test.isTrue(validationObject.errors === false);


        validationObject = Mesosphere.testForm.validate([
            {"name": "hex", "value": "1234567890ABCDEF"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "anotherfield", "value": "email@domain.ext"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.testForm.validate([
            {"name": "hex", "value": "035GH"}
        ]);
        test.isTrue(validationObject.errors !== false);

    }
);

Tinytest.add("integer format", function (test) {


        var validationObject = Mesosphere.testForm.validate([
            {"name": "int", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "int", "value": "1234567890"}
        ]);
        test.isTrue(validationObject.errors === false);


        validationObject = Mesosphere.testForm.validate([
            {"name": "int", "value": "-1234567890"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "anotherfield", "value": "email@domain.ext"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.testForm.validate([
            {"name": "int", "value": "035GH"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "int", "value": "127.01"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "int", "value": "127,01"}
        ]);
        test.isTrue(validationObject.errors !== false);


    }
);


Tinytest.add("float format", function (test) {


        var validationObject = Mesosphere.testForm.validate([
            {"name": "float", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "float", "value": "1234567890"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "float", "value": "123.567"}
        ]);
        test.isTrue(validationObject.errors === false);


        validationObject = Mesosphere.testForm.validate([
            {"name": "float", "value": "-1234567890"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "float", "value": "-123.567"}
        ]);
        test.isTrue(validationObject.errors === false);


        validationObject = Mesosphere.testForm.validate([
            {"name": "anotherfield", "value": "email@domain.ext"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.testForm.validate([
            {"name": "float", "value": "035GH"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "float", "value": "127.9.3"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "float", "value": "--127"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "float", "value": "127,9"}
        ]);
        test.isTrue(validationObject.errors !== false);
    }
);