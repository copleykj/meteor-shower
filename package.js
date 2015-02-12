Package.describe({
  summary: "A form-data validation and transformation package for Meteor",
  version: "0.0.1",
  git: "https://github.com/Konecty/Mesosphere.git"
});

Package.on_use(function (api, where) {
  api.versionsFrom("METEOR@0.9.0");

    api.use(['templating','jquery', 'underscore', "mrt:underscore-string-latest@2.3.3"], ['client', 'server']);
    api.addFiles(['js/pre.js','js/mesosphere.js','js/post.js'], ['client', 'server']);
    api.addFiles('css/mesosphere.css', 'client');
    api.export('Mesosphere');
});

Package.on_test(function (api) {

    api.use(['jquery', 'underscore', 'test-helpers', 'tinytest', 'mrt:underscore-string-latest@2.3.3']);
    api.addFiles('js/mesosphere.js', ['client', 'server']);

    api.addFiles('tests/required_tests.js', ['client', 'server']);
    api.addFiles('tests/format_tests.js',  ['client', 'server']);
    api.addFiles('tests/rules_tests.js',  ['client', 'server']);
    api.addFiles('tests/transforms_tests.js',  ['client', 'server']);
    api.addFiles('tests/aggregate_tests.js', ['client', 'server']);
});
