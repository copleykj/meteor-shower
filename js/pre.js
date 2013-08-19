if(typeof _.str === "undefined" && Meteor.isServer){
	var message = "underscore-string dependency for Mesosphere is unresolved. This is likely due to the fact that you are using Meteor 0.6.5 and"+
	" underscore-string has not been updated on Atmosphere\n\n Please refer to https://github.com/copleykj/Mesosphere/blob/master/README.md for more details";
	console.log(message);
}

exports = {};