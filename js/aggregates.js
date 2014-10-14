Aggregates = {
    sum: function(fields, formFieldsObject){
        var sum = 0;
        _(fields).each( function(fieldName) {
            var fieldValue = parseFloat(formFieldsObject[fieldName]);
            if(_.isNumber(fieldValue)){
                sum += fieldValue;
            }
        });
        return sum.toString();
    },
    avg: function(fields, formFieldsObject){
        var sum = parseFloat(this.sum(fields, formFieldsObject));
        sum = sum / fields.length;
        return sum.toString();
    },
    join: function(fields, formFieldsObject, argument){
        var fieldValues = [];
        _(fields).each( function(fieldName) {
            fieldValues.push(formFieldsObject[fieldName]);
        });
        return fieldValues.join(argument);
    },
    arraySet: function(fields, formFieldsObject){
        var newField = [];
        _(fields).each( function(fieldName) {
            newField.push(formFieldsObject[fieldName]);
        });
        return newField;
    },
    objectSet: function(fields, formFieldsObject){
        var newField = {};
        _(fields).each( function(fieldName) {
            newField[fieldName] = formFieldsObject[fieldName];
        });
        return newField;
    }
};
