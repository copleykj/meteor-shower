Package.describe({
    summary: "A form-data validation and transformation package for Meteor"
});

Package.on_use(function (api, where) {

    api.use(['jquery', "underscore", "Mesosphere"], ['client', 'server']);

    api.add_files('demo.js', ['client', 'server']);
    api.add_files('demo.css', 'client');
});
