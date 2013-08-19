Package.describe({
    summary: "A form-data validation and transformation package for Meteor"
});

Package.on_use(function (api, where) {

    api.use(['jquery', "underscore"], ['client', 'server']);
    api.add_files(['js/pre.js','js/mesosphere.js','js/post.js'], ['client', 'server']);
    api.add_files('css/mesosphere.css', 'client');
    api.export('Mesosphere');
});

Package.on_test(function (api) {

    api.use(['jquery', 'underscore', 'test-helpers', 'tinytest', 'underscore-string']);
    api.add_files('js/mesosphere.js', ['client', 'server']);

    api.add_files('tests/required_tests.js', ['client', 'server']);
    api.add_files('tests/format_tests.js',  ['client', 'server']);
    api.add_files('tests/rules_tests.js',  ['client', 'server']);
    api.add_files('tests/transforms_tests.js',  ['client', 'server']);
    api.add_files('tests/aggregate_tests.js', ['client', 'server']);
});