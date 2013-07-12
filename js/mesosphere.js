(function(root){
    //Local variable declarations
    var $, _, Meteor, Helpers, Rules, Form, Mesosphere, Formats, Transforms;

    //Setup access to jQuery, Underscore and Meteor
    $=root.jQuery; _=root._; Meteor=root.Meteor;

    //Formats
    Formats = {
        email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        money: /^[\$\€\£\¥]?[-]?[0-9]*[\.]?[0-9]+$/,
        integer: /^[-]?[0-9]+$/,
        hex: /^[a-fA-F0-9]+$/,
        float: /^[-]?[0-9]*[\.]?[0-9]+$/,
        alphanumeric: /^[a-zA-Z0-9_-]+$/,
        creditcard: function(val) {}
    };

    //Rules are always passed 5 arguments, fieldValue, ruleValue, FieldName, formFieldsObject and fieldRequirements respectively.
    Rules = {
        maxLength: function(fieldValue, ruleValue){
            return fieldValue.length <= ruleValue;
        },
        minLength: function(fieldValue, ruleValue){
            return fieldValue.length >= ruleValue;
        },
        exactLength: function (fieldValue, ruleValue) {
          return fieldValue.length === ruleValue.exact_length;
        },
//        email: function (fieldValue) {
//          var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//          return re.test(str);
//        },
        maxValue: function(fieldValue, ruleValue){
            return fieldValue <= ruleValue;
        },
        maxFileSize: function(fieldValue, ruleValue){
            return this.maxValue(fieldValue.value, ruleValue);
        },
        acceptedFileTypes: function(fieldValue, ruleValue){
            var fileType = fieldValue.FileType;
            return !!ruleValue.indexOf(fileType);
        }
//      ,
//        regTest: function(fieldValue, ruleValue){
//            if(_(ruleValue).isRegExp()){
//                return ruleValue.test(fieldValue);
//            }
//        }
    };

    //Data transformation functions
    Transforms = {
        trim:function(string){
            return _(string).trim();
        },
        ucfirst:function(string){
            string = _(string).ltrim();
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        stripTags:function(string){
            return _(string).stripTags();
        },
        escapeHTML:function(string){
            return _(string).escapeHTML();
        }
    };

    Form = function(fields, onSuccess, onFailure){
        this.fields = fields;
        this.onSuccess = onSuccess;
        this.onFailure = onFailure;
        this.ErroredFields = {};
    };

    Form.prototype.validate = function (formFields){
        var self = this, result, fieldValue;
        var formFieldsObject = this.formToObject(formFields);

        self.ErroredFields = {};

        _(self.fields).each( function( field, fieldName ) {
            //get the current value of the field that we are validating
            fieldValue = formFieldsObject[fieldName];

            //if there is a value we are going to validate it
            if(fieldValue){

                //transform the data if need be.
                if(field.transforms){

                    fieldValue=transform(fieldValue, field.transforms);
                    formFieldsObject[fieldName]=fieldValue;
                }

                _(field.rules).each( function( ruleValue, ruleName ) {
                    if(_(fieldValue).isArray()){
                       _(fieldValue).each( function( subValue, key ) {
                           result = Rules[ruleName](subValue, ruleValue, fieldName, formFieldsObject, self.fields);
                           if(!result)
                               self.addFieldError(fieldName, ruleName, key);
                       });
                    }else{
                        result = Rules[ruleName](fieldValue, ruleValue, fieldName, formFieldsObject, self.fields);
                        if(!result)
                            self.addFieldError(fieldName, ruleName);
                    }
                });


            //otherwise we'll check if it is a required field or required dependently of another field
            }else if(field.required && (field.required === true || formFieldsObject[field.required.dependsOn] == field.required.value)){
                self.addFieldError(fieldName, "required");
            }
        });

        if(_(self.ErroredFields).isEmpty()){
            self.ErroredFields = false;
            if(Meteor.isClient){
                self.onSuccess(formFieldsObject);
            }
        }else{
            self.addMessages();
            if(Meteor.isClient){
                self.onFailure(self.ErroredFields);
            }
        }

        return {errors:self.ErroredFields, formData:formFieldsObject};

    };

    Form.prototype.addMessages = function(){
        var self = this;
        _(self.ErroredFields).each( function( value, key ) {
            if(self.fields[key].message){
                self.ErroredFields[key].message = self.ErroredFields[key].required ? "Required" : self.fields[key].message;
            }
        });
    };

    Form.prototype.addFieldError = function(fieldName, ruleName, key){

        if(!this.ErroredFields[fieldName])
            this.ErroredFields[fieldName] = {};
        if(key){
            if(!this.ErroredFields[fieldName][ruleName]);
                this.ErroredFields[fieldName][ruleName] = [];
            this.ErroredFields[fieldName][ruleName][key] = true;
        }else{
           this.ErroredFields[fieldName][ruleName] = true;
        }
    };

    Form.prototype.formToObject = function(formFields){
        var formFieldsObject = {};

        _(formFields).each( function( field ) {
            var name = field.name;
            var value = field.fileType ? _(field).pick(value, fileType) : field.value;

            if(typeof formFieldsObject[name] === 'undefined'){
                formFieldsObject[name] = value;
            }else if(_(formFieldsObject[name]).isArray()){
                formFieldsObject[name].push(value);
            }else{
                formFieldsObject[name] = [formFieldsObject[name], value];
            }
        });

        return formFieldsObject;
    };

    var transform = function(fieldValue, transformList){
        _(transformList).each( function(transformName) {
            // BUG: if multiple transforms - only last one evaluated
            fieldValue = Transforms[transformName](fieldValue);
        });
        return fieldValue;
    };

    var getFormData = function(formElem){
        var formData = $(formElem).serializeArray(), fileInputs = $(formElem).find("input[type=file]");

        fileInputs.each(function () {
          var fileSize, fileType, fieldName = this.name;

          if (this.files.length > 0) {
            fileSize = this.files[0].size;
            fileType = this.files[0].type;
          } else {
            fileSize = 0;
            fileType = '';
          }
          formData.push({name: fieldName, value: fileSize, fileType: fileType, files: this.files});
        });

        return formData;
    };

    var failureCallback = function(erroredFields){
        _(erroredFields).each( function( value, key, errObj ) {
            $("#"+key+"-error").addClass("meso-error").text(value.message);
        });
    };

    var successCallback = function(){
        $(".meso-error").text("");
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
        Mesosphere[formIdentifier] = new Form(optionsObject.fields, optionsObject.onSuccess, optionsObject.onFailure);

        //if this is the browser, set up a submit event handler.
        if(Meteor.isClient){

            //decide which selector to use to grab the form handle
            if(optionsObject.name){
                selector = 'form[name='+optionsObject.name+']';
            }else{
                selector = '#'+optionsObject.id;
            }

            //attach a submit event to the form
            $(root.document).on('submit', selector, function (event) {
                event.preventDefault();

                var formFields = getFormData(this);

                if(_(optionsObject.method).isFunction()){
                    optionsObject.method(formFields);
                }else{
                    Meteor.call(optionsObject.method, formFields);
                }
            });
        }
    };

    Mesosphere.Rules = Rules;
    Mesosphere.Transforms = Transforms;
    Mesosphere.Formats = Formats;

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

    root.Mesosphere = Mesosphere;
}(this));