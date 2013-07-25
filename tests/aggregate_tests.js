Mesosphere({
    name: "aggregatesForm",
    aggregate:{
        birthDate:["join", ["year", "month", "day"], " "],
        sum:["sum", ["int1", "int2", "int3"]],
        avg:["avg", ["int1", "int2", "int3"]],
        birthDateObject:["objectSet", ["year", "month", "day"], true]
    },
    fields: {
        birthDate: {
            format: "alphanumeric",
            message: "rule failed",
            rules:{
                minAge:13
            }
        }
    }});


Mesosphere.registerRule("minAge", function(fieldValue, ruleValue){
    var birthDate = new Date(fieldValue).getTime();
    var age = parseInt((new Date().getTime() - birthDate) / (1000 * 365 * 60 * 60 * 24), 10);
    if(age <= ruleValue){
        return false;
    }
    return true;
});

Tinytest.add("Aggregates - join", function (test) {

    var validationObject = Mesosphere.aggregatesForm.validate([
        {"name": "year", "value": "1982"},
        {"name": "month", "value": "November"},
        {"name": "day", "value": "08"}
    ]);
    test.isTrue(validationObject.errors === false && validationObject.formData.birthDate==="1982 November 08");
});

Tinytest.add("Aggregates - join - minAge", function(test){
    validationObject = Mesosphere.aggregatesForm.validate([
        {"name": "year", "value": "2005"},
        {"name": "month", "value": "May"},
        {"name": "day", "value": "16"}
    ]);
    test.isTrue(validationObject.errors !== false && validationObject.formData.birthDate==="2005 May 16");
});

Tinytest.add("Aggregates - objectSet - removeFields", function(test){
    var birthDatedObjectTest = {year: '1982', month: 'November', day: '08'};

    validationObject = Mesosphere.aggregatesForm.validate([
        {"name": "year", "value": "1982"},
        {"name": "month", "value": "November"},
        {"name": "day", "value": "08"}
    ]);

    // Test to see if the objectSet performs as expected
    test.isTrue(validationObject.errors === false && JSON.stringify(validationObject.formData.birthDateObject)===JSON.stringify(birthDatedObjectTest));

    // Test to see that the fields are removed when the objectSet removeFields options is set to true
    test.isTrue(validationObject.errors === false && !('year' in validationObject.formData), 'year key in object');
    test.isTrue(validationObject.errors === false && !('month' in validationObject.formData), 'month key in object');
    test.isTrue(validationObject.errors === false && !('day' in validationObject.formData), 'day key in object');
});

Tinytest.add("Aggregates - sum", function(test){
    validationObject = Mesosphere.aggregatesForm.validate([
        {"name": "int1", "value": "1"},
        {"name": "int2", "value": "1.5"},
        {"name": "int3", "value": "3.5"}
    ]);

    test.isTrue(validationObject.formData.sum==="6");
});

Tinytest.add("Aggregates - avg", function(test){
    validationObject = Mesosphere.aggregatesForm.validate([
        {"name": "int1", "value": "1"},
        {"name": "int2", "value": "1.5"},
        {"name": "int3", "value": "3.5"}
    ]);

    test.isTrue(validationObject.formData.avg==="2");
});

