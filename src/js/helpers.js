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
	
	var regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

	return function(url) {
		return regex.test(url);
	};
	
})();