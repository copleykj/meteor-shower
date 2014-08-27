Package.describe({
    summary: "A form-data validation and transformation package for Meteor",
  version: "0.1.9",
  git: "https://github.com/copleykj/Mesosphere.git"
});

Package.on_use(function (api, where) {
    api.versionsFrom("METEOR@0.9.0");

    api.use(['templating','jquery', 'underscore', "mrt:underscore-string-latest@2.3.3"], ['client', 'server']);
    api.add_files(['js/pre.js','js/mesosphere.js','js/post.js'], ['client', 'server']);
    api.add_files('css/mesosphere.css', 'client');
    api.export('Mesosphere');
});

Package.on_test(function (api) {

    api.use(['jquery', 'underscore', 'test-helpers', 'tinytest', 'underscore-string-latest']);
    api.add_files('js/mesosphere.js', ['client', 'server']);

    api.add_files('tests/required_tests.js', ['client', 'server']);
    api.add_files('tests/format_tests.js',  ['client', 'server']);
    api.add_files('tests/rules_tests.js',  ['client', 'server']);
    api.add_files('tests/transforms_tests.js',  ['client', 'server']);
    api.add_files('tests/aggregate_tests.js', ['client', 'server']);
});