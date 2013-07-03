Package.describe({
	summary: "A form-data validation and transformation package for Meteor"
});

Package.on_use(function (api, where) {

	api.use(['jquery', "underscore"], ['client', 'server']);

	api.add_files('js/mesosphere.js', ['client', 'server']);

});
