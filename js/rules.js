//Rules are always passed 5 arguments, fieldValue, ruleValue, fieldName, formFieldsObject and fieldRequirements respectively.
Rules = {
    maxLength: function(fieldValue, ruleValue) {
        return fieldValue.length <= ruleValue;
    },
    minLength: function(fieldValue, ruleValue) {
        return fieldValue.length >= ruleValue;
    },
    exactLength: function (fieldValue, ruleValue) {
        // keep comparator as ==
        return fieldValue.length == ruleValue;
    },
    failIfFound:function (fieldValue, ruleValue) {
        return fieldValue.indexOf(ruleValue) === -1;
    },
    minValue: function(fieldValue, ruleValue) {
        return fieldValue >= ruleValue;
    },
    maxValue: function(fieldValue, ruleValue) {
        return fieldValue <= ruleValue;
    },
    equalsValue: function(fieldValue, ruleValue) {
        // keep comparator as ==
        return fieldValue == ruleValue;
    },
    equalsField: function(fieldValue, ruleValue, fieldName, formFieldsObject) {
        return formFieldsObject[ruleValue] == fieldValue
    }, 
    notEqualsField: function(fieldValue, ruleValue, fieldName, formFieldsObject) {
        return formFieldsObject[ruleValue] != fieldValue
    }, 
    maxFileSize: function(fieldValue, ruleValue) {
        return this.maxValue(fieldValue.fileSize, ruleValue);
    },
    acceptedFileTypes: function(fieldValue, ruleValue) {
        var fileType = fieldValue.FileType;
        return ruleValue.indexOf(fileType) >= 0;
    }

};
