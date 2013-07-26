# Mesosphere

A dual client/server side form data validation and transformation package for **Meteor**

## Features

* Same validations logic on client **and** server sides
* Clean validation workflow with
  * Transformations: trim, capitalize, clean...
  * Formats: email, float, boolean, url, creditcard...
  * Rules: min, max, equals...
* Field Aggregation
* Conditional required fields
* Frontend hooks
* Extensible via api

## Requirements

The project depends on the following libraries:

* jQuery >= 1.7
* underscore.js >= 1.3.3
* underscore.string >= 2.0.0

If you use **Meteorite**, there is nothing to do. Just type the following statement in  your project:

    mrt add Mesosphere


## Usage

Mesosphere invocation happens in two steps:

1. First a configuration step
2. Then runtime validation step

### Configuration
```javascript
    Mesosphere(formDescriptionObject);
```   
When invoked, Mesosphere creates a new form object and stores it as a property of itself. You can then gain access to the form by referring to *Mesosphere.***formName**.

### Validation

    var validationObject = Mesosphere.loginForm.validate(formData);

To validate a form, call the **validate()** function on the form object and it will return an object containing errors and validated/transformed form-data. Validation can happen client and server side.

For instance, the above call could return:

```javascript
validationObject:{
    errors:{
        username:{
            required:true,
            message:"Required"
        }
    },
    formData:{
        username:"",
        password:"C00lPa$$w0rd"
    }
}
```

If there are no errors, **validationObject.errors equals false**;
The validation workflow is processed as follows: first the fields are _transformed_, then checked for _required_, compared aginst their _format_ and finally evaluated against each _rule_
    
## Form description

Mesosphere requires an object that describe the form and fields elements. This section describes the different elements which can compose that description.

### Basics elements

**name/id** - The form must contain either a name or an id key which corresponds to the name or id of the form element in your html. This will create a new form object scoped to **Mesosphere.formName** or **Mesosphere.formId**. These accessors are the main access point to any validation checks.

**method** - The name of an optional remote method to call. If you pass in a string for the method, Mesosphere will call the Meteor server method by this name, if you pass in a function then it will call the function. Either way it passes one argument to the method or function which is the raw data taken from the form.

**aggregate** - An object who's keys are the name of a new field to be created from a set of other form elements. The value for each key is an array with it's first element as the name of the aggregate function, an the second another array containing the names of the fields you would like to aggregate. A third element to the array can be added which will be passed as an argument to the aggregate function.

```javascript
aggregate:{
	birthDate:["join", ["month", "day", "year"], " "],
	fullName:["join", ["firstName", "LastName"], " "]
}
```

Aggregation will be performed prior to validation, giving you the opportunity to validate the field created by the aggregation as well.

Current aggregation functions are:

* sum - calculates the sum of the specified fields.
* avg - calculates the average of specified fields.
* join - concatenates the values of the specified fields. Takes optional separator argument.
* arraySet - creates new array of values of the specified fields.
* objectSet - creates new object of key:value pairs of specified fields.

**removeFields** - list of fields that should be removed from returned form values. Especially useful if you wish to remove fields that have been aggregated together into new fields.

```javascript
   removeFields["month", "day", "year", "firstName", "lastName"]
```

**fields** - This is a list of fields with each key being the name of a form field and the value being an object telling Mesosphere about that field. See next chapter.

```javascript
fields:{
	firstname:{
		//field description
	},
	userID:{
		//field description
	}
}
```

### Field description

**required** - The required key tells Mesosphere if this is a required field, if the field is required dependently of another field, or if the field is required only when the field is absent from the submitted fields. If required dependently the field can be conditionaly required based on another field value.

Let's see this in practice:

```javascript

   // field is required
   required: true 
    
   or
   
   // field is required when country is set
   required:{
      dependsOn:"country"
   }
   
   or
   
   // field is required when country is set to "USA"
   required:{
      dependsOn:"country",
      value:"USA"
   }

   or

   // field is only required if other field is missing in form submission
   required:{
      whenFieldAbsent:"country"
   }
```
    
**message** - The message key is the message added to the fields in the erroredFields object which is returned from the validate function and passed to the *onFailure* callback when validation fails. if message is not defined, the error labelling is simply ignored.

#### Transformations

```javascript
Mesosphere({
    name: "testForm",
    fields: {
        firstname: {
            required: true,
            transforms: ["clean", "capitalize"],
            format: "alphanumeric",
            message: "That's a weird first name!"
        }
});

```

Array telling Mesosphere the transforms to perform on the field prior to any validation. Note that multiple transforms can be applied.

The following transforms are currently implemented:

* trim - Trims left & right spaces
* clean - Trims and removes extra spaces
* capitalize - Upper Case first letter
* stripTags - Removes any xml tags
* escapeHTML - Escapes HTML tags
* toUpperCase - all to UPPERCASE
* toLowerCase - all to lowercase
* slugify
* humanize

Please check the [underscore.js documentation](http://underscorejs.org/) and [underscore.string documentation](https://github.com/epeli/underscore.string) for more details about these operations.

#### Formats

Element that defines the field data format. the format can be expressed as a predefined string, a regex or a function.

* boolean - _0, 1, true, false, yes, no_
* integer - _65342, -1_
* hex - _FE7B, 1b83de_
* float - _127.1, -57.3_
* alphanumeric - _that's it_
* email _dest@domain.ext_
* money _$100.00, $-200_
* ipv4 _127.0.0.1_
* phone _+1 (305) 1234567, +33 47 57 11 22_
* url _https://www.crionics.com, ftp://127.0.1.3_
* creditcard _378282246310005, 4012-8888-8888-1881, 4012 8888 8888 1881_

When using a regex, you could for instance use something as follows. Note how the format references a RegEx.

```javascript
Mesosphere({
    name: "testForm",
    fields: {
        zipcode: {
            required: true,
            format: /^[0-9]{5}$/,
            message: "bad zip code"
        }
});

```

Using a function is equally straighforward. For instance in the exmaple below, we define a function that only accepts strings with a "Thank you" note. Format functions are typically used when a regular expression falls short.

```javascript
Mesosphere({
    name: "testForm",
    fields: {
        msg: {
            required: true,
            format: function(val) { return val.indexOf("Thank you")},
            message: "bad zip code"
        }
});

```

#### Rules

List of rules for validating the field value. Note that this is different from a **the format** which acts more as a _regular expression_. Rules implement precise logic such as boundaries or edge case detection.

```javascript
Mesosphere({
    name: "testForm",
    fields: {
        firstname: {
            required: true,
            format: "alphanumeric",
            message: "bad zip code",
            rules:{
  			   maxLength:20,
    		   minLength:4
			}
        }
});

```

The list of predefined rules is the following:

* maxLength
* minLength
* exactLength
* failIfFound
* minValue
* maxValue
* equalsValue
* maxFileSize
* acceptedFileTypes

### Error management

**onFailure** - The client side callback when validation has failed. When this is called it passes in an erroredFields object which has each field that failed validation, which rules it failed and the message you provided.

By default this tries to insert the error message provided in an element with an id of fieldname-error

For example for a field with a name of username, this function will try to insert the message text in an element like this.

```html
<span id='username-error'></span>
```
When overriding the default call back you can maintain default functionality, while building upon it, by calling the *failureCallback* function and passing in the erroredFields object that was passed to the onFailure callback.

```javascript
onFailure: function(erroredFields){
   //custom code here
   failureCallback(erroredFields);
}
```

**onSuccess** - The client side callback when validation has succeeded. This is passed an object of validated and transformed form-data as *key:value* pairs. By default this just clears all the displayed errors.

This, like the onFailure callback can maintain and build upon the default functionality by calling the *successCallback*. This however does not require you to pass in the form-data since it doesn't use it.

```javascript
onSuccess: function(formData){
   //custom code here
   successCallback();
}
```


### Dual client/server validation

To achieve dual client/server validation, pass in the name of the Meteor server method as a string to the method attribute of the formDescriptionObject. On the client, Mesosphere will then call the method when the form is submitted, passing in the form data. Then use the forms validate function in the server method and pass in the form-data.

```javascript
Meteor.methods({
    login:function(rawFormData){
        Mesosphere.loginForm.validate(rawFormData, function(errors, formFieldsObject){
            if(!errors){
               //Do what we need to do here;
            }
        });
    }
});

```

Mesosphere takes one argument. This argument is an object describing the form, how to validate and transform the data, the Meteor method to use, and the client side callbacks.

Simple example:

```javascript
Mesosphere({
    name:"loginForm",
    method:'login',
    fields:{
        username:{
            required:true,
            message:"letters or numbers, between 3 and 20 characters.",
            format:/^[A-Z0-9]{3,20}$/i,
            transform:["trim"]
        },
        password:{
            required:true,
            message:"Must be at least 6 characters.",
            rules:{
                minLength:6
            }
        }
    }
});
```




## Extending

You may add you own set of rules & transforms by using the following methods:

```javascript
// fn takes the fieldValue and the defined ruleValue
Mesosphere.registerFormat(name, fn);
// fn takes the fieldValue and the defined ruleValue
Mesosphere.registerRule(name, fn);
// fn recieves the string to transform
Mesosphere.registerTransform(name, fn);
//fn recieves an array of field names, an object containing the current submitted form values and optionally an argument passed to the function.
Mesosphere.registerAggregate(name, fn);
```

For instance,

```javascript
Mesosphere.registerRule("force-zipcode", function(fieldValue, ruleValue){
            return fieldValue === ruleValue;
});
        
Mesosphere({
    name:"myForm",
    method:'checkZip',
    fields:{
        zipcode:{
            required:true,
            message:"Zip code 33178 is required",
            rules:{
                force-zipcode:"33178"
            },
            transform:["trim"]
        }
    }
});

```

## Complete Usage Example

The project comes with a fully functional demonstration and unit tests.
    
## Contribution

Contributions are always welcome, please follow these steps to submit your changes via a github pull request.

Your code should include unit tests & documentation changes when applicable.

Ensure all unit tests pass sucessfully.

    mrt test-packages ./
    
