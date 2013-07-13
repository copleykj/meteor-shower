Mesosphere({
    name: "formatsForm",
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
        },
        regex: {
            format: /^[0-9]{5}$/,
            message: "not a valid zip code"
        },
        cc: {
            format: "creditcard",
            message: "not a valid cc"
        },
        bool: {
            format: "boolean",
            message: "not a boolean value"
        }
    }});

Tinytest.add("boolean format", function (test) {

        var validationObject = Mesosphere.formatsForm.validate([
            {"name": "bool", "value": "true"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "bool", "value": "false"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "bool", "value": "0"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "bool", "value": "1"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "bool", "value": "yes"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "bool", "value": "no"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "bool", "value": "True"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "bool", "value": "No"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "bool", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "bool", "value": "True0"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "bool", "value": "00"}
        ]);
        test.isTrue(validationObject.errors !== false);

    }
);

Tinytest.add("cc format", function (test) {

        var validationObject = Mesosphere.formatsForm.validate([
            {"name": "cc", "value": "378282246310005"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "cc", "value": "4012 8888 8888 1881"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "cc", "value": "4012-8888-8888-1881"}
        ]);
        test.isTrue(validationObject.errors === false);
        // BAD CASES

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "cc", "value": "3566002020360506"}
        ]);
        test.isTrue(validationObject.errors !== false);


        validationObject = Mesosphere.formatsForm.validate([
            {"name": "cc", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "cc", "value": "string!!"}
        ]);
        test.isTrue(validationObject.errors !== false);

    }
);

Tinytest.add("regex format", function (test) {


        var validationObject = Mesosphere.formatsForm.validate([
            {"name": "regex", "value": "33143"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "regex", "value": "78465"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "regex", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "regex", "value": "string!!"}
        ]);
        test.isTrue(validationObject.errors !== false);

    }
);


Tinytest.add("phone format", function (test) {


        var validationObject = Mesosphere.formatsForm.validate([
            {"name": "phone", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "phone", "value": "305 613 1234"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "phone", "value": "+1 305 613 1234"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "phone", "value": "+1 (305) 613 1234"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "phone", "value": "+1 (305) 6131234"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "phone", "value": "+1 (305) 6131234 ext 123"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "phone", "value": "+33 1 47 37 44 55 ext 123"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "phone", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "phone", "value": "string!!"}
        ]);
        test.isTrue(validationObject.errors !== false);

    }
);

Tinytest.add("ipv4 format", function (test) {

        var validationObject = Mesosphere.formatsForm.validate([
            {"name": "ipv4", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "ipv4", "value": "127.0.0.1"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "ipv4", "value": "192.168.1.1"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "ipv4", "value": "255.255.255.255"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "ipv4", "value": "192.168.2."}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "ipv4", "value": "192.168.2.1.2"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "ipv4", "value": "192"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "ipv4", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "ipv4", "value": "string!!"}
        ]);
        test.isTrue(validationObject.errors !== false);

    }
);

Tinytest.add("url format", function (test) {


        var validationObject = Mesosphere.formatsForm.validate([
            {"name": "url", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "url", "value": "http://www.crionics.com"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "url", "value": "https://www.crionics.com"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "url", "value": "ftp://127.0.1.3"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "url", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "url", "value": "string!!"}
        ]);
        test.isTrue(validationObject.errors !== false);

    }
);

Tinytest.add("alphanumeric format", function (test) {


        var validationObject = Mesosphere.formatsForm.validate([
            {"name": "alpha", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "alpha", "value": "first and last name"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "alpha", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "alpha", "value": "string!!"}
        ]);
        test.isTrue(validationObject.errors !== false);

    }
);


Tinytest.add("email format", function (test) {


        var validationObject = Mesosphere.formatsForm.validate([
            {"name": "email", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "email", "value": "email@domain.ext"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "email", "value": "EMAIL@domAin.EXT"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "anotherfield", "value": "email@domain.ext"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "email", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "email", "value": "email@"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "email", "value": "email"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "email", "value": "email@domain@domain.com"}
        ]);
        test.isTrue(validationObject.errors !== false);
    }
);

Tinytest.add("hex format", function (test) {


        var validationObject = Mesosphere.formatsForm.validate([
            {"name": "hex", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "hex", "value": "1234567890abcdef"}
        ]);
        test.isTrue(validationObject.errors === false);


        validationObject = Mesosphere.formatsForm.validate([
            {"name": "hex", "value": "1234567890ABCDEF"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "anotherfield", "value": "email@domain.ext"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "hex", "value": "035GH"}
        ]);
        test.isTrue(validationObject.errors !== false);

    }
);

Tinytest.add("integer format", function (test) {


        var validationObject = Mesosphere.formatsForm.validate([
            {"name": "int", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "int", "value": "1234567890"}
        ]);
        test.isTrue(validationObject.errors === false);


        validationObject = Mesosphere.formatsForm.validate([
            {"name": "int", "value": "-1234567890"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "anotherfield", "value": "email@domain.ext"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "int", "value": "035GH"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "int", "value": "127.01"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "int", "value": "127,01"}
        ]);
        test.isTrue(validationObject.errors !== false);


    }
);


Tinytest.add("float format", function (test) {


        var validationObject = Mesosphere.formatsForm.validate([
            {"name": "float", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "float", "value": "1234567890"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "float", "value": "123.567"}
        ]);
        test.isTrue(validationObject.errors === false);


        validationObject = Mesosphere.formatsForm.validate([
            {"name": "float", "value": "-1234567890"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "float", "value": "-123.567"}
        ]);
        test.isTrue(validationObject.errors === false);


        validationObject = Mesosphere.formatsForm.validate([
            {"name": "anotherfield", "value": "email@domain.ext"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "float", "value": "035GH"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "float", "value": "127.9.3"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "float", "value": "--127"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "float", "value": "127,9"}
        ]);
        test.isTrue(validationObject.errors !== false);
    }
);


Tinytest.add("money format", function (test) {


        var validationObject = Mesosphere.formatsForm.validate([
            {"name": "money", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "money", "value": "1234567890"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "money", "value": "123.567"}
        ]);
        test.isTrue(validationObject.errors === false);


        validationObject = Mesosphere.formatsForm.validate([
            {"name": "money", "value": "-1234567890"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "money", "value": "-123.567"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "money", "value": "$-123.567"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "money", "value": "€-123.567"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "money", "value": "£-123.567"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "money", "value": "¥-123.567"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "anotherfield", "value": "email@domain.ext"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "money", "value": "035GH"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "money", "value": "127.9.3"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "money", "value": "--127"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "money", "value": "127,9"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.formatsForm.validate([
            {"name": "money", "value": "-$127.9"}
        ]);
        test.isTrue(validationObject.errors !== false);

    }
);