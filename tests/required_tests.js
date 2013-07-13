Mesosphere({
    name: "requiredForm",
    fields: {
        email: {
            required: true,
            format: "email",
            message: "not an email"
        }
    }
});

Tinytest.add("required test", function (test) {

        debugger;
        validationObject = Mesosphere.requiredForm.validate([
            {"name": "email", "value": "email@domain.ext"}
        ]);
        test.isTrue(validationObject.errors === false);

        // BAD CASES

        var validationObject = Mesosphere.requiredForm.validate([
            {"name": "anotherField", "value": "+1 (305) 6131234 ext 123"}
        ]);
        test.isTrue(validationObject.errors !== false);

         validationObject = Mesosphere.requiredForm.validate([
            {"name": "email", "value": ""}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.requiredForm.validate([
            {"name": "email", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors !== false);

        validationObject = Mesosphere.requiredForm.validate([
        ]);
        test.isTrue(validationObject.errors !== false);
    }
);
