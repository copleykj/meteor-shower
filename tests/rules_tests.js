Mesosphere({
    name: "rulesForm",
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
            message: "not a money value",
            rules: []
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


Tinytest.add("min max", function (test) {


        var validationObject = Mesosphere.rulesForm.validate([
            {"name": "phone", "value": ""}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "phone", "value": "305 613 1234"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "phone", "value": "+1 305 613 1234"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "phone", "value": "+1 (305) 613 1234"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "phone", "value": "+1 (305) 6131234"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "phone", "value": "+1 (305) 6131234 ext 123"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "phone", "value": "+33 1 47 37 44 55 ext 123"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "phone", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.rulesForm.validate([
            {"name": "phone", "value": "string!!"}
        ]);
        test.isTrue(validationObject.errors !== false);
    }
);
