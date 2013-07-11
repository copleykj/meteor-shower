#Mesosphere

A dual client/server side form data validation and transformation package for **Meteor**

##Requirements
Requirements *should* be taken care of by **Meteorite** if adding Mesosphere as a smart package from **Atmosphere**. Otherwise you will need include the following libraries in your project.

jQuery >= 1.7

underscore.js >= 1.3.3

underscore.string >= 2.0.0

##Usage

    Mesosphere(formDescriptionObject);
    
When invoked Mesosphere creates a new form object and stores it as a property of itself. You can then gain access to the form by referring to *Mesosphere.formName*.

To validate a form when can then call the validate function of the form object and it will return an object containing any errors as well as the validated and transformed form-data.

*example:*

    validationObject = Mesosphere.loginForm.validate(formData);

This will return an object in this format:

```
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

To achieve dual client/server validation, pass in the name of the Meteor server method as a string to the method attribute of the formDescriptionObject. On the client, Mesosphere will then call the method when the form is submitted, passing in the form data. Then use the forms validate function in the server method and pass in the form-data.

*Example:*

```
Meteor.methods({
    login:function(rawFormData){
        validationObject = Mesosphere.loginForm.validate(rawFormData);
        if(!validationObject.errors){
            //Do what we need to do here;
        }
    }
});
```

    
###Form description

Mesosphere takes one argument. This argument is an object describing the form, how to validate and transform the data, the Meteor method to use, and the client side callbacks.

Simple example:

```
Mesosphere({
    name:"loginForm",
    method:'login',
    fields:{
        username:{
            required:true,
            message:"letters or numbers, between 3 and 20 characters.",
            rules:{
                regTest:/^[A-Z0-9]{3,20}$/i
            },
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

**name/id** - The form options object must contain either a name or an id key which corresponds to the name or id of the form element in your html. This will create a new form object scoped to Mesosphere.formName or Mesosphere.formID

**method** - The method specifies what to call after gathering the form data. If you pass in a string for the method, Mesosphere will call the Meteor server method by this name, if you pass in a function then it will call the function. Either way it passes one argument to the method or function which is the raw data taken from the form.

**fields** - This is a list of fields with each key being the name of a form field and the value being an object telling Mesosphere about that field

*Example:*

```
fields:{
	postText:{
		//field description
	},
	userID:{
		//field description
	}
}
```

**required** - The required key tells Mesosphere if this is a required field or if the field is required dependently of another field. If required dependently the field will only be required if the other field has the value specified. Otherwise if the field is not required it will only be checked for valid data if data is entered.

*Example:* 

```
   required: true 
    
    or
    
   required:{
      dependsOn:"country",
      value:"United States"
   }

```
    
**message** - The message key is the message added to the fields in the erroredFields object which is returned from the validate function and passed to the *onFailure* callback when validation fails. if message is not defined, the error labelling is simply ignored.

**rules** - This is the list of rules for validation in the form of key as the rule name and the value as the constraint for the rule.

*Example:*

```
 rules:{
     maxLength:20,
     minLength:4
 }
```

Predefined rules are maxLength, minLength, exactLength, maxValue, maxFileSize, acceptedFileTypes, regTest

**transforms** - This is an array telling Mesosphere the transforms you wish to perform on the field. Note that multiple transforms can be applied.

The following transforms are currently implemented:

* trim - Trims left & right spaces
* ucfirst - Upper Case first letter
* stripTags - Removes any xml tags
* escapeHTML - Escapes HTML tags

**onFailure** - The client side callback when validation has failed. When this is called it passes in an erroredFields object which has each field that failed validation, which rules it failed and the message you provided.

By default this tries to insert the error message provided in an element with an id of fieldname-error

For example for a field with a name of username, this function will try to insert the message text in an element like this.

    <span id='username-error'></span>

When overriding the default call back you can maintain default functionality, while building upon it, by calling the *failureCallback* function and passing in the erroredFields object that was passed to the onFailure callback.

```
onFailure: function(erroredFields){
   //custom code here
   failureCallback(erroredFields);
}
```

**onSuccess** - The client side callback when validation has succeeded. This is passed an object of validated and transformed form-data as *key:value* pairs. By default this just clears all the displayed errors.

This, like the onFailure callback can maintain and build upon the default functionality by calling the *successCallback*. This however does not require you to pass in the form-data since it doesn't use it.

```
onSuccess: function(formData){
   //custom code here
   successCallback();
}
```
##Extending

You may add you own set of rules & transforms by using the following methods:

    // fn takes the fieldValue and the defined ruleValue
    Mesosphere.registerRule = function (name, fn);
    // fn takes the string to transform
    Mesosphere.registerTransform = function (name, fn);


For instance,

```
Mesosphere.registerRule("force-zipcode", function(fieldValue, ruleValue){
            return fieldValue.length === ruleValue;
        })
        
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

##Complete Usage Example


###Form

    <form name="signupForm">
        <p><input type="text" name="username" placeholder="Username"></p>
        <span id="username-error"></span>
        <p><input type="password" name="password" placeholder="password"></p>
        <span id="password-error"></span>
        <p>
            <select name="country">
                <option value="" disabled selected>Country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
            </select>
        </p>
        <p><input type="text" name="zipcode" placehoder="zipcode"></p>
        <span id="zipcode-error"></span>
        <input type="submit" value="Sign Up">
    </form>

###Mesosphere

    Mesosphere({
        name:"signupForm",
        method:"signup",
        fields:{
            username:{
                required:true,
                rules:{
                    maxLength:20,
                    minLength:4
                },
                transforms:["trim"],
                message:"Invalid length"
            },
            password:{
                required:true,
                rules:{
                    minLength:6
                },
                message:"Minimum length is 6 chars"
            },
            country:{
                required:true
            },
            zipcode:{
                required:{
                    dependsOn:"country",
                    value:"United States"
                },
                rules:{
                    regTest:/^[0-9]{5}$/
                },
                message:"Invalid zip code"
            }
        }
    });

###Meteor

    Meteor.methods({
        signup:function(rawFormData){
            var validationObject = Mesosphere.signupForm.validate(rawFormData);
            var newUser;
            if(!validationObject.errors){
                newUser = processUser(validationObject.formData);
                db.users.insert(newUser);
            }
        }
    });
    