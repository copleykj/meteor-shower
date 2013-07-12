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
        },
        money: {
            format: "money",
            message: "not a money value"
        },
        alpha: {
            format: "alphanumeric",
            message: "not a money value"
        },
        url: {
            format: "url",
            message: "not a url value"
        },
        ipv4: {
            format: "ipv4",
            message: "not an ip value"
        },
        phone: {
            format: "phone",
            message: "not a phone value"
        }
    }});


Tinytest.add("phone format", function (test) {


        var validationObject = Mesosphere.testForm.validate([
            {"name": "phone", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "phone", "value": "305 613 1234"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "phone", "value": "+1 305 613 1234"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "phone", "value": "+1 (305) 613 1234"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "phone", "value": "+1 (305) 6131234"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "phone", "value": "+1 (305) 6131234 ext 123"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "phone", "value": "+33 1 47 37 44 55 ext 123"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.testForm.validate([
            {"name": "phone", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "phone", "value": "string!!"}
        ]);
        test.isTrue(validationObject.errors !== false);

    }
);

Tinytest.add("ipv4 format", function (test) {


        var validationObject = Mesosphere.testForm.validate([
            {"name": "ipv4", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "ipv4", "value": "127.0.0.1"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "ipv4", "value": "192.168.1.1"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "ipv4", "value": "255.255.255.255"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.testForm.validate([
            {"name": "ipv4", "value": "192.168.2."}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "ipv4", "value": "192.168.2.1.2"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "ipv4", "value": "192"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "ipv4", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "ipv4", "value": "string!!"}
        ]);
        test.isTrue(validationObject.errors !== false);

    }
);

Tinytest.add("url format", function (test) {


        var validationObject = Mesosphere.testForm.validate([
            {"name": "url", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "url", "value": "http://www.crionics.com"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "url", "value": "https://www.crionics.com"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "url", "value": "ftp://127.0.1.3"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.testForm.validate([
            {"name": "url", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "url", "value": "string!!"}
        ]);
        test.isTrue(validationObject.errors !== false);

    }
);

Tinytest.add("alphanumeric format", function (test) {


        var validationObject = Mesosphere.testForm.validate([
            {"name": "alpha", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "alpha", "value": "first and last name"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.testForm.validate([
            {"name": "alpha", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "alpha", "value": "string!!"}
        ]);
        test.isTrue(validationObject.errors !== false);

    }
);


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


Tinytest.add("money format", function (test) {


        var validationObject = Mesosphere.testForm.validate([
            {"name": "money", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "money", "value": "1234567890"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "money", "value": "123.567"}
        ]);
        test.isTrue(validationObject.errors === false);


        validationObject = Mesosphere.testForm.validate([
            {"name": "money", "value": "-1234567890"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "money", "value": "-123.567"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "money", "value": "$-123.567"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "money", "value": "€-123.567"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "money", "value": "£-123.567"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "money", "value": "¥-123.567"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "anotherfield", "value": "email@domain.ext"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.testForm.validate([
            {"name": "money", "value": "035GH"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "money", "value": "127.9.3"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "money", "value": "--127"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "money", "value": "127,9"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.testForm.validate([
            {"name": "money", "value": "-$127.9"}
        ]);
        test.isTrue(validationObject.errors !== false);

    }
);