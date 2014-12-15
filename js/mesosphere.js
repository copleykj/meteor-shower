Mesosphere = function(optionsObject){
    var selector = "";
    var formIdentifier = optionsObject.name || optionsObject.id;

    optionsObject = _({onSuccess:Utils.successCallback, onFailure:Utils.failureCallback}).extend(optionsObject);

    //Make sure they've got all the info we need and they haven't provided the same form information twice
    if(!formIdentifier){
        throw new Error("Please specify the name of the form to validate.");
    }
    if(!optionsObject.fields){
        throw new Error("Please specify which fields to validate.");
    }
    if(Mesosphere[formIdentifier]){
        throw new Error("Form is already being validated");
    }

    //Create a new form object scoped to Mesosphere.formName
    Mesosphere[formIdentifier] = new Form(optionsObject.fields, optionsObject.aggregates, optionsObject.removeFields, optionsObject.onSuccess, optionsObject.onFailure);

    //if this is the browser, set up a submit event handler.
    if(Meteor.isClient){
        var events = {};

        //decide which selector to use to grab the form handle
        if(optionsObject.name){
            selector = 'form[name='+formIdentifier+']';
        }else{
            selector = '#'+formIdentifier;
        }


        if(!optionsObject.disableSubmit){

            if(optionsObject.template && _(optionsObject.template).isString()){
                events['submit '+ selector] = function (event) {
                    var formFields = Mesosphere.Utils.getFormData(event.target);
                    Mesosphere[formIdentifier].setSelector(event.target);
                    event.preventDefault();

                    if(optionsObject.onSubmit){
                        optionsObject.onSubmit(event);
                    }

                    if(_(optionsObject.method).isFunction()){
                        optionsObject.method(formFields, this);
                    }else{
                        Meteor.call(optionsObject.method, formFields, this);
                    }
                };
                Template[optionsObject.template].events(events);
            }else{
                $(function(){
                    //attach a submit event to the form
                    $(document.body).on('submit', selector, function (event) {
                        event.preventDefault();

                        if(optionsObject.onSubmit){
                            optionsObject.onSubmit(event);
                        }

                        var formFields = Utils.getFormData(this);
                        Mesosphere[formIdentifier].setSelector(event.target);

                        if(_(optionsObject.method).isFunction()){
                            optionsObject.method(formFields);
                        }else{
                            Meteor.call(optionsObject.method, formFields);
                        }
                    });
                });
            }


        }


    }
};

Mesosphere.Rules = Rules;
Mesosphere.Transforms = Transforms;
Mesosphere.Formats = Formats;
Mesosphere.Aggregates = Aggregates;
Mesosphere.Utils = Utils;

Mesosphere.registerAggregate = function (name, fn) {
    if (Mesosphere.Aggregates[name]) {
        throw new Error(name + " is already defined as a aggregate.");
    }
    Mesosphere.Aggregates[name] = fn;
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
