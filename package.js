Package.describe({
    summary: "A form-data validation and transformation package for Meteor"
});

Package.on_use(function (api, where) {

    api.use(['jquery', "underscore"], ['client', 'server']);

    api.add_files('js/mesosphere.js', ['client', 'server']);
    api.add_files('css/mesosphere.css', 'client');
});

Package.on_test(function (api) {
    api.use(['jquery', 'underscore', 'test-helpers', 'tinytest', 'underscore-string']);

    api.add_files('js/mesosphere.js', ['client', 'server']);

    api.use('session', 'client');
    api.add_files('tests/format_tests.js', 'client');

//    api.use('http', 'server');
//    api.add_files('tests/router_server_tests.js', 'server');
//
//    api.add_files('tests/router_common_tests.js', ['client', 'server']);
});