var ucfirst = function(string) {
    return string[0].toUpperCase() + string.slice(1);
};

var toCamelCase = function(method, delimiter) {
    var tokens = method.split(delimiter), camelCase = tokens[0];
    for (var i = 1; i < tokens.length; ++i) {
        camelCase += ucfirst( tokens[i] );
    }
    return camelCase;
};

var isUrl = (function() {
	
    var regex = /^[a-z]+:\/\//i;

	return function(url) {
		return regex.test(url);
	};
	
})();

var guid = (function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})();