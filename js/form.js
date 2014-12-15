Form = function(fields, aggregates, removeFields, onSuccess, onFailure, onSubmit){
    this.fields = fields;
    this.onSuccess = onSuccess;
    this.onFailure = onFailure;
    this.aggregates = aggregates;
    this.removeFields = removeFields;
    this.onSubmit = onSubmit;
    this.erroredFields = {};
    this.selector = "";
};

Form.prototype.setSelector = function(selector){
    this.selector = selector;
};

Form.prototype.validate = function (formFields, callback){
    var self = this, result;
    var formFieldsObject = _.isArray(formFields) ? this.formToObject(formFields) : formFields;

    self.erroredFields = {};

    _(self.fields).each( function(field, fieldName) {

        // get the current value of the field that we are validating
        var fieldValue = formFieldsObject[fieldName];

        if(_.isEmpty(fieldValue) && field.defaultValue){
            if(_.isFunction(field.defaultValue)){
                formFieldsObject[fieldName] = field.defaultValue(formFieldsObject);
            }else{
                formFieldsObject[fieldName] = field.defaultValue;
            }
        }

        // check if field is required (or conditional required)
        if (field.required && !(fieldValue && _(fieldValue).trim().length > 0)) {

            // simple case - required=true
            if (field.required === true) {
                self.addFieldError(fieldName, "required");
            } else {
                // more complex case - required:{dependsOn: "otherfield"}
                if (field.required.dependsOn) {
                    var dependsOnValue = formFieldsObject[field.required.dependsOn];
                    if (dependsOnValue && _(dependsOnValue).trim().length > 0) {
                        if (field.required.value) {
                            // even more complex case - required:{dependsOn: "otherfield", value:"USA"}
                            if (field.required.value === dependsOnValue) {
                                self.addFieldError(fieldName, "required");
                            }
                        } else {
                            self.addFieldError(fieldName, "required");
                        }
                    }
                }

                if(field.required.whenFieldAbsent && _(formFieldsObject[field.required.whenFieldAbsent]).isUndefined()){
                    self.addFieldError(fieldName, "required");
                }
            }

        }

        // if there is a value we are going to validate it
        if(fieldValue){

            // transform the data if need be.
            if(field.transforms){
                fieldValue=transform(fieldValue, field.transforms);
                formFieldsObject[fieldName]=fieldValue;
            }

            // check the data format
            if(field.format) {
                if(_.isArray(fieldValue)){
                   _(fieldValue).each(function(subValue) {
                       self.checkFormat(subValue, fieldName, field.format);
                   });
                }else{
                    self.checkFormat(fieldValue, fieldName, field.format);
                }
            }

            // check rule sets
            _(field.rules).each( function( ruleValue, ruleName ) {
                if(_.isArray(fieldValue)){
                   _(fieldValue).each( function( subValue, key ) {
                       result = Rules[ruleName](subValue, ruleValue, fieldName, formFieldsObject, self.fields);
                       if(!result){
                           self.addFieldError(fieldName, ruleName, key);
                       }
                   });
                }else{
                    result = Rules[ruleName](fieldValue, ruleValue, fieldName, formFieldsObject, self.fields);
                    if(!result){
                        self.addFieldError(fieldName, ruleName);
                    }
                }
            });
        }


    });

    //aggregate here before we remove fields that could be part of aggregation.. We shouldn't need to validate these fields
    _(self.aggregates).each( function(aggregateInfo, newFieldName) {
        var aggregateName = aggregateInfo[0];
        var aggregateFields = aggregateInfo[1];
        var aggregateArgs = aggregateInfo[2];
        var newField = Aggregates[aggregateName](aggregateFields, formFieldsObject, aggregateArgs);

        formFieldsObject[newFieldName] = newField;
    });

    //remove any unwanted fields
    _(self.removeFields).each( function( value ) {
       delete formFieldsObject[value];
    });

    if(_.isEmpty(self.erroredFields)){
        self.erroredFields = false;
        if(Meteor.isClient){
            self.onSuccess(formFieldsObject, $(self.selector));
        }
    }else{
        self.addMessages();
        if(Meteor.isClient){
            self.onFailure(self.erroredFields, $(self.selector));
        }
    }

    if(callback && _(callback).isFunction()){
        callback(self.erroredFields, formFieldsObject);
    }else{
        return {errors:self.erroredFields, formData:formFieldsObject};
    }

};

Form.prototype.addMessages = function(){
    var self = this;
    _(self.erroredFields).each( function( value, key ) {
        self.erroredFields[key].message = self.erroredFields[key].required ? self.fields[key].requiredMessage || "*Required Field*" : self.fields[key].message || "*Invalid Input*";
    });
};

Form.prototype.addFieldError = function(fieldName, ruleName, key){

    if(!this.erroredFields[fieldName]){
        this.erroredFields[fieldName] = {};
    }
    if(key){
        if(!this.erroredFields[fieldName][ruleName]){
            this.erroredFields[fieldName][ruleName] = [];
        }
        this.erroredFields[fieldName][ruleName][key] = true;
    }else{
       this.erroredFields[fieldName][ruleName] = true;
    }
};

Form.prototype.checkFormat = function(fieldValue, fieldName, fieldFormat) {
    var self = this;
    var format;

    if(_.isString(fieldFormat)){
        format=Formats[fieldFormat];
    }else{
        format = fieldFormat;
    }

    if(!format){
        throw new Error("Unknown format:"+fieldFormat);
    }
    else {
        if( _.isRegExp(format) ) {
            // it's a regular expression
            if(!format.test(fieldValue)){
                self.addFieldError(fieldName, "Invalid format");
            }
        } else {
            // it's a function
            if(!format(fieldValue)){
                self.addFieldError(fieldName, "Invalid format");
            }
        }
    }
};

Form.prototype.formToObject = function(formFields){
    var formFieldsObject = {};

    _(formFields).each( function( field ) {
        var name = field.name;
        var value = field.fileSize ? _(field).pick(['fileType', 'fileSize', 'files']) : field.value;

        if(_.isUndefined(formFieldsObject[name])){
            formFieldsObject[name] = value;
        }else if(_.isArray(formFieldsObject[name])){
            formFieldsObject[name].push(value);
        }else{
            formFieldsObject[name] = [formFieldsObject[name], value];
        }
    });

    return formFieldsObject;
};

var transform = function (fieldValue, transformList) {
    _(transformList).each(function (transformName) {
        var transform=Transforms[transformName];
        if (transform){
            fieldValue = transform(fieldValue);
        }
        else{
            throw new Error("Invalid transform:" + transformName);
        }
    });
    return fieldValue;
};
