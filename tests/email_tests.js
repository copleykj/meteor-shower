Mesosphere({
    name: "testForm",
    fields: {

        email: {
            format: "email",
            message: "not an email"
        }
    }});

Tinytest.add("email format tests", function (test) {


        var validationObject = Mesosphere.testForm.validate([
            {"name": "email", "value": ""}
        ]);
        test.isTrue(validationObject.errors != null);

        validationObject = Mesosphere.testForm.validate([
            {"name": "email", "value": "email@domain.ext"}
        ]);
        test.isFalse(validationObject.errors);

        validationObject = Mesosphere.testForm.validate([
            {"name": "email", "value": "email@domain"}
        ]);
        test.isTrue(validationObject.errors != null);

        validationObject = Mesosphere.testForm.validate([
            {"name": "email", "value": "email@"}
        ]);
        test.isTrue(validationObject.errors != null);

        validationObject = Mesosphere.testForm.validate([
            {"name": "email", "value": "email"}
        ]);
        test.isTrue(validationObject.errors != null);
    }
);