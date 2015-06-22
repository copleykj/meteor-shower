Shower({
    name: "defaults",
    fields: {
        firstName: {
            message: "rule failed",
            defaultValue: function(formFieldsObject){
                switch(formFieldsObject.gender){
                    case "Male":
                        return "John";
                    case "Female":
                        return "Jane";
                }
            }
        },
        lastName: {
            message: "rule failed",
            defaultValue: "Doe"
        }
    }});

Tinytest.add("default value tests", function (test) {

    var validationObject = Shower.defaults.validate([
        {"name": "firstName", "value": ""},
        {"name": "lastName", "value": ""},
        {"name": "gender", "value": "Female"}
    ]);
    test.isTrue(validationObject.errors === false && validationObject.formData.firstName==="Jane");

    test.isTrue(validationObject.errors === false && validationObject.formData.lastName==="Doe");

});
