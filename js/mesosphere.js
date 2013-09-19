(function(root){
    "use strict";

    //Local variable declarations
    var $, _, Meteor, Helpers, Rules, Form, Mesosphere, Aggregates, Formats, Transforms;

    //Setup access to jQuery, Underscore and Meteor
    
    if(root.Package){
        $=root.jQuery; _=root.Package.underscore._; Meteor=root.Package.meteor.Meteor;
    }else{
        $=root.jQuery; _=root._; Meteor=root.Meteor;
    }

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

    //Formats
    Formats = {
        email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        money: /^[\$\€\£\¥]?[-]?[0-9]*[\.]?[0-9]+$/,
        integer: /^[-]?\d+$/,
        boolean: /^(yes|no|true|false|0|1)$/i,
        hex: /^[a-fA-F0-9]+$/,
        float: /^[-]?[0-9]*[\.]?[0-9]+$/,
        alphanumeric: /^[a-zA-Z0-9\ \']+$/,
        ipv4: /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
        phone:  /^([\+][0-9]{1,3}[\ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9\ \.\-\/]{3,20})((x|ext|extension)[\ ]?[0-9]{1,4})?$/,
        url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,

        //TODO: Cleanup..
        //      Move var declarations to the top since they are hoisted anyway
        //      Prefer while over do->while
        creditcard: function (val) {
            //spaces and dashes may be valid characters, but must be stripped to calculate the checksum.
            var valid = false, cardNumber = val.replace(/ +/g, '').replace(/-+/g, '');

            var numDigits = cardNumber.length;

            if (numDigits >= 14 && numDigits <= 16 && parseInt(cardNumber, 10) > 0) {

                var sum = 0, i = numDigits - 1, pos = 1, digit, luhn = "";
                do {
                    digit = parseInt(cardNumber.charAt(i), 10);
                    luhn += (pos++ % 2 === 0) ? digit * 2 : digit;
                } while (--i >= 0);

                for (i = 0; i < luhn.length; i++) {
                    sum += parseInt(luhn.charAt(i), 10);
                }
                valid = sum % 10 === 0;
            }
            return valid;
        }
    };

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
        //TODO: equalsField, notEqualsField
        maxFileSize: function(fieldValue, ruleValue) {
            return this.maxValue(fieldValue.fileSize, ruleValue);
        },
        acceptedFileTypes: function(fieldValue, ruleValue) {
            var fileType = fieldValue.FileType;
            return ruleValue.indexOf(fileType) >= 0;
        }

    };

    //Data transformation functions
    Transforms = {
        trim: function(string) {
            return _(string).trim();
        },
        clean: function(string) {
            return _(string).clean();
        },
        capitalize: function(string) {
            return _(string).capitalize();
        },
        slugify:function(string) {
            return _(string).slugify();
        },
        humanize:function(string) {
            return _(string).humanize();
        },
        stripTags: function(string) {
            return _(string).stripTags();
        },
        escapeHTML: function(string) {
            return _(string).escapeHTML();
        },
        toUpperCase: function(string) {
            return string.toUpperCase();
        },
        toLowerCase: function(string) {
            return string.toLowerCase();
        }
    };

    Form = function(fields, aggregates, removeFields, onSuccess, onFailure){
        this.fields = fields;
        this.onSuccess = onSuccess;
        this.onFailure = onFailure;
        this.aggregates = aggregates;
        this.removeFields = removeFields;
        this.erroredFields = {};
    };

    Form.prototype.validate = function (formFields, callback){
        var self = this, result, validationObject;
        var formFieldsObject = this.formToObject(formFields);

        self.erroredFields = {};

        //aggregate fields first so we can validate the new field later.
        _(self.aggregates).each( function(aggregateInfo, newFieldName) {
            var aggregateName = aggregateInfo[0];
            var aggregateFields = aggregateInfo[1];
            var aggregateArgs = aggregateInfo[2];
            var newField = Aggregates[aggregateName](aggregateFields, formFieldsObject, aggregateArgs);

            formFieldsObject[newFieldName] = newField;
        });

        _(self.fields).each( function(field, fieldName) {

            // get the current value of the field that we are validating
            var fieldValue = formFieldsObject[fieldName];

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
                                if (field.required.value === dependsOnValue)
                                    self.addFieldError(fieldName, "required");
                            } else
                                self.addFieldError(fieldName, "required");
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
                       _(fieldValue).each( function( subValue, key ) {
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
            self.erroredFields[key].message = self.erroredFields[key].required ? "*Required Field*" : self.fields[key].message || "*Invalid Input*";
        });
    };

    Form.prototype.addFieldError = function(fieldName, ruleName, key){

        if(!this.erroredFields[fieldName])
            this.erroredFields[fieldName] = {};
        if(key){
            if(!this.erroredFields[fieldName][ruleName])
                this.erroredFields[fieldName][ruleName] = [];
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
        }

        if(!format)
            throw new Error("Unknown format:"+fieldFormat);
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

    var getFormData = function(formElem){
        var formData = $(formElem).serializeArray(), fileInputs = $(formElem).find("input[type=file]");

        fileInputs.each(function () {
          var fileSize = 0, fileType = '', fieldName = this.name;

          if (this.files.length > 0) {
            fileSize = this.files[0].size;
            fileType = this.files[0].type;
          }
          formData.push({name: fieldName, fileSize: fileSize, fileType: fileType, files: this.files});
        });

        return formData;
    };

    var failureCallback = function(erroredFields, formHandle){
        $(".meso-error").text("");
        _(erroredFields).each( function( value, key, errObj ) {
            formHandle.find("#"+key+"-error").addClass("meso-error").text(value.message);
        });
    };

    var successCallback = function(formHandle){
        formHandle[0].reset();
        $(".meso-error").text("");
        $(".meso-error").removeClass("meso-error");
    };

    Mesosphere = function(optionsObject){
        var selector = "";
        var formIdentifier = optionsObject.name || optionsObject.id;

        optionsObject = _({onSuccess:successCallback, onFailure:failureCallback}).extend(optionsObject);

        //Make sure they've got all the info we need and they haven't provided the same form information twice
        if(!formIdentifier)
            throw new Error("Please specify the name of the form to validate.");
        if(!optionsObject.fields)
            throw new Error("Please specify which fields to validate.");
        if(Mesosphere[formIdentifier])
            throw new Error("Form is already being validated");

        //Create a new form object scoped to Mesosphere.formName
        Mesosphere[formIdentifier] = new Form(optionsObject.fields, optionsObject.aggregate, optionsObject.removeFields, optionsObject.onSuccess, optionsObject.onFailure);

        //if this is the browser, set up a submit event handler.
        if(Meteor.isClient){

            //decide which selector to use to grab the form handle
            if(optionsObject.name){
                selector = 'form[name='+optionsObject.name+']';
            }else{
                selector = '#'+optionsObject.id;
            }

            Mesosphere[formIdentifier].selector = selector;

            $(function(){
                //attach a submit event to the form
                $(root.document.body).on('submit', selector, function (event) {
                    event.preventDefault();

                    var formFields = getFormData(this);

                    if(_(optionsObject.method).isFunction()){
                        optionsObject.method(formFields);
                    }else{
                        Meteor.call(optionsObject.method, formFields);
                    }
                });
            });
        }
    };

    Mesosphere.Rules = Rules;
    Mesosphere.Transforms = Transforms;
    Mesosphere.Formats = Formats;
    Mesosphere.Aggregates = Aggregates;

    Mesosphere.registerAggregate = function (name, fn) {
      if (Mesosphere.Aggregates[name]) {
        throw new Error(name + " is already defined as a aggregate.");
      }
      Mesosphere.Transforms[name] = fn;
    };

    Mesosphere.registerFormat = function (name, fn) {
        if (Mesosphere.Formats[name]) {
            throw new Error(name + " is already defined as a format.");
        }
        Mesosphere.Formats[name] = fn;
    };

    Mesosphere.registerRule = function (name, fn) {
      if (Mesosphere.Rules[name]) {
        throw new Error(name + " is already defined as a rule.");
      }
      Mesosphere.Rules[name] = fn;
    };

    Mesosphere.registerTransform = function (name, fn) {
      if (Mesosphere.Transforms[name]) {
        throw new Error(name + " is already defined as a transform.");
      }
      Mesosphere.Transforms[name] = fn;
    };

    if (typeof exports === 'undefined' || typeof Package === 'undefined') {
        root.Mesosphere = Mesosphere;
    } else {
        exports.Mesosphere = Mesosphere;
    }

}(this));
