Mesosphere({
    name: "transForm",
    fields: {
        alpha1: {
            format: "alphanumeric",
            message: "rule failed",
            transforms: ["clean", "capitalize"]
        },
        alpha2: {
            format: "alphanumeric",
            message: "rule failed",
            transforms: ["humanize"]
        }
    }});

Tinytest.add("transforms tests", function (test) {

    var validationObject = Mesosphere.transForm.validate([
        {"name": "alpha1", "value": "  olivier   refalo  "}
    ]);
    test.isTrue(validationObject.errors === false && validationObject.formData.alpha1==="Olivier refalo");


    validationObject = Mesosphere.transForm.validate([
        {"name": "alpha2", "value": "  capitalize dash-CamelCase_underscore trim  "}
    ]);
    //console.log(JSON.stringify(validationObject));
    test.isTrue(validationObject.errors === false && validationObject.formData.alpha2==="Capitalize dash camel case underscore trim");

});
