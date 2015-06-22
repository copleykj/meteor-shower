Shower({
    name: "requiredForm",
    fields: {
        email: {
            // field is optional
            format: "email",
            message: "not an email"
        },
        notifications: {
            // notification required when email filled
            required: { dependsOn: "email"},
            format: "boolean",
            message: "Would you like to be notified?"
        },
        country: {
            // country is required
            required: true,
            format: /^(USA|France)$/,
            message: "Please pick a country"
        },
        zipcode: {
            // zipcode is only required when country="USA"
            required: {
                dependsOn: "country",
                value: "USA"
            },
            format: /^[0-9]{5}$/
        }
    }
});

Tinytest.add("required test", function (test) {

        //  debugger;

        var validationObject = Shower.requiredForm.validate([
            {"name": "country", "value": "France"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Shower.requiredForm.validate([
            {"name": "country", "value": "USA"},
            {"name": "zipcode", "value": "33178"}
        ]);
        test.isTrue(validationObject.errors === false);

        validationObject = Shower.requiredForm.validate([
            {"name": "country", "value": "USA"},
            {"name": "zipcode", "value": "33178"},
            {"name": "email", "value": "nono@no.no"},
            {"name": "notifications", "value": "true"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        validationObject = Shower.requiredForm.validate([
            {"name": "country", "value": "USA"},
            {"name": "zipcode", "value": "33178"},
            {"name": "email", "value": "nono@no.no"},
            {"name": "notifications", "value": ""}
        ]);
        test.isTrue(validationObject.errors !== false);

        // missing dependsOn required fields
        validationObject = Shower.requiredForm.validate([
            {"name": "email", "value": "email@domain.ext"},
            {"name": "country", "value": "USA"}
        ]);
        test.isTrue(validationObject.errors !== false);

        // missing required fields
        validationObject = Shower.requiredForm.validate([
            {"name": "anotherField", "value": "+1 (305) 6131234 ext 123"}
        ]);
        test.isTrue(validationObject.errors !== false);

        // country invalid
        validationObject = Shower.requiredForm.validate([
            {"name": "country", "value": ""}
        ]);
        test.isTrue(validationObject.errors !== false);

        // zip code expected
        validationObject = Shower.requiredForm.validate([
            {"name": "country", "value": "USA"}
        ]);
        test.isTrue(validationObject.errors !== false);

// missing required fields
        validationObject = Shower.requiredForm.validate([
        ]);
        test.isTrue(validationObject.errors !== false);
    }
);
