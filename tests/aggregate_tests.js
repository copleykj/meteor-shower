Mesosphere({
    name: "aggregatesForm",
    aggregates:{
        birthDate:["join", ["year", "month", "day"], " "],
        sum:["sum", ["int1", "int2", "int3"]],
        avg:["avg", ["int1", "int2", "int3"]]
    },
    fields: {

    }
});

Mesosphere.registerRule("minAge", function(fieldValue, ruleValue){
    var birthDate = new Date(fieldValue).getTime();
    var age = parseInt((new Date().getTime() - birthDate) / (1000 * 365 * 60 * 60 * 24), 10);
    if(age <= ruleValue){
        return false;
    }
    return true;
});

Tinytest.add("aggregates tests", function (test) {

    var validationObject = Mesosphere.aggregatesForm.validate([
        {"name": "year", "value": "1982"},
        {"name": "month", "value": "November"},
        {"name": "day", "value": "08"}
    ]);
    test.isTrue(validationObject.errors === false && validationObject.formData.birthDate==="1982 November 08");

    validationObject = Mesosphere.aggregatesForm.validate([
        {"name": "int1", "value": "1"},
        {"name": "int2", "value": "1.5"},
        {"name": "int3", "value": "3.5"}
    ]);
    test.isTrue(validationObject.formData.avg==="2" && validationObject.formData.sum==="6");
});