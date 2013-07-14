Mesosphere({
    name: "rulesForm",
    fields: {

        int1: {
            format: "integer",
            message: "bad range",
            rules: {
                maxValue: 20,
                minValue: 4
            }
        },
        int2: {
            format: "integer",
            message: "bad range",
            rules: {
                equalsValue: 10
            }
        },
        int3: {
            format: "integer",
            message: "only positive",
            rules: {
                failIfFound: "-"
            }
        },
        float1: {
            format: "float",
            message: "bad range",
            rules: {
                maxValue: 20.5,
                minValue: 4.1
            }
        },
        float2: {
            format: "float",
            message: "bad range",
            rules: {
                equalsValue: 10.734
            }
        },
        alpha1: {
            format: "alphanumeric",
            message: "rule failed",
            rules: {
                minLength: 10,
                maxLength: 20,
                failIfFound: "error"
            }
        },
        alpha2: {
            format: "alphanumeric",
            message: "rule failed",
            rules: {
                exactLength: 10
            }
        }
    }});


Tinytest.add("minValue maxValue equalsValue rules", function (test) {


        var validationObject = Mesosphere.rulesForm.validate([
            {"name": "int1", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "int1", "value": 4}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "int1", "value": 20}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "int2", "value": 10}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "int2", "value": "10"}
        ]);
        test.isTrue(validationObject.errors === false);

// floats

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "float1", "value": 4.1}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "float1", "value": 5.7}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "float1", "value": 20.5}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "float2", "value": 10.734}
        ]);
        test.isTrue(validationObject.errors === false);


        // BAD CASES

        // int out of range
        validationObject = Mesosphere.rulesForm.validate([
            {"name": "int1", "value": 3}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "int2", "value": 50}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "float2", "value": 10}
        ]);
        test.isTrue(validationObject.errors !== false);


    }
);

Tinytest.add("failIfFound rules", function (test) {


    var validationObject = Mesosphere.rulesForm.validate([
        {"name": "int3", "value": "100"}
    ]);
    test.isTrue(validationObject.errors === false);

    // BAD CASES

    validationObject = Mesosphere.rulesForm.validate([
        {"name": "int3", "value": "-100"}
    ]);
    test.isTrue(validationObject.errors !== false);
});

Tinytest.add("minLength maxLength exactLength rules", function (test) {


    var validationObject = Mesosphere.rulesForm.validate([
        {"name": "alpha1", "value": "012345678901"}
    ]);
    test.isTrue(validationObject.errors === false);

    validationObject = Mesosphere.rulesForm.validate([
        {"name": "alpha2", "value": "01234567890123456789"}
    ]);
    test.isTrue(validationObject.errors !== false);

    // BAD CASES

    validationObject = Mesosphere.rulesForm.validate([
        {"name": "alpha1", "value": "012345"}
    ]);
    test.isTrue(validationObject.errors !== false);

    validationObject = Mesosphere.rulesForm.validate([
        {"name": "alpha1", "value": "012345678901234567890123456789"}
    ]);
    test.isTrue(validationObject.errors !== false);


    validationObject = Mesosphere.rulesForm.validate([
        {"name": "alpha2", "value": "012345"}
    ]);
    test.isTrue(validationObject.errors !== false);
});
