if (Meteor.isClient) {

}


Mesosphere({
    name: "testForm",
    method: "signup",
    fields: {

        email: {
            required: true,
            format: "email",
            message: "not an email"
        },

        hex: {
            required: true,
            format: "hex",
            message: "not an hex value"
        },

        integer: {
            required: true,
            format: "integer",
            message: "not an integer value"
        },

        float: {
            required: true,
            format: "float",
            message: "not an float value"
        },

        money: {
            required: true,
            format: "money",
            message: "not an money value"
        },

        creditcard: {
            required: true,
            format: "creditcard",
            message: "not a creditcard value"
        },

        regex: {
            required: true,
            format: /^[0-9]{5}$/,
            message: "not an regex value"
        }
    }
});


Meteor.methods({
    signup: function (rawFormData) {
        var validationObject = Mesosphere.testForm.validate(rawFormData);
        var newUser;
        if (!validationObject.errors) {
            console.log("no errors");
            //newUser = processUser(validationObject.formData);
            //db.users.insert(newUser);
        }
        else {
            console.log("errors:" + JSON.stringify(validationObject.errors));
        }
    }
});


if (Meteor.isServer) {


    Meteor.startup(function () {
        // code to run on server at startup


    });
}
