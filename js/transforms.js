//Data transformation functions
Transforms = {
    trim: function(string) {
        return _(string).trim();
    },
    clean: function(string) {
        return _(string).clean();
    },
    capitalize: function(string) {
        return _(string).capitalize();
    },
    slugify:function(string) {
        return _(string).slugify();
    },
    humanize:function(string) {
        return _(string).humanize();
    },
    stripTags: function(string) {
        return _(string).stripTags();
    },
    escapeHTML: function(string) {
        return _(string).escapeHTML();
    },
    toUpperCase: function(string) {
        return string.toUpperCase();
    },
    toLowerCase: function(string) {
        return string.toLowerCase();
    }
};
