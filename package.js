Package.describe({
    name:"copleykj:mesosphere",
    summary: "A form-data validation and transformation package for Meteor",
    version: "0.1.14",
    git: "https://github.com/copleykj/mesosphere.git"
});

Package.onUse(function (api) {
    api.versionsFrom("METEOR@0.9.0");

    api.use(['templating','jquery', 'underscore', "mrt:underscore-string-latest@2.3.3"], ['client', 'server']);
    api.addFiles(
        [
            'js/pre.js',
            'js/aggregates.js',
            'js/formats.js',
            'js/rules.js',
            'js/transforms.js',
            'js/utils.js',
            'js/form.js',
            'js/mesosphere.js'
        ],
        ['client', 'server']
    );

    api.addFiles('css/mesosphere.css', 'client');
    api.export('Mesosphere');
});

Package.onTest(function (api) {
    api.use(['jquery', 'underscore', 'test-helpers', 'tinytest', 'mrt:underscore-string-latest@2.3.3'], ['client', 'server']);
    api.addFiles(
        [
            'js/pre.js',
            'js/aggregates.js',
            'js/formats.js',
            'js/rules.js',
            'js/transforms.js',
            'js/utils.js',
            'js/form.js',
            'js/mesosphere.js'
        ],
        ['client', 'server']
    );

    api.addFiles('tests/required_tests.js', ['client', 'server']);
    api.addFiles('tests/format_tests.js',  ['client', 'server']);
    api.addFiles('tests/rules_tests.js',  ['client', 'server']);
    api.addFiles('tests/transforms_tests.js',  ['client', 'server']);
    api.addFiles('tests/aggregate_tests.js', ['client', 'server']);
    api.addFiles('tests/defaultValue_tests.js', ['client', 'server']);
});
