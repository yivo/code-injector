var buffer;

function shouldBeLaunched(injector) {
	return /*injector.enabled && */injector.rules;
}

function matchesTargets(list, target) {
	for (var i = 0, len = list.length; i < len; ++i) {
		try {
			var regex = new RegExp(list[i]);
		} catch(e) {
			continue;
		}
		if (regex.test(target)) return true;
	}
}

function shouldRuleBeApplied(rule) {
	return rule.enabled && (rule.css || rule.js) && rule.targets && matchesTargets(rule.targets, location.href);
}

function launchInjector(injector) {
	buffer = document.createDocumentFragment();
	injector.rules.forEach(applyRule);
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(buffer);
}

function applyRule(rule) {
	if (!shouldRuleBeApplied(rule)) return;
	
	if (rule.css) {
		rule.css.forEach(function(item) {
			if (item.filepath) {
				injectCssFile(item.filepath);
			} else {
				injectCssCode(item.code);
			}
		});
	}
	
	if (rule.js) {
		rule.js.forEach(function(item) {
			if (item.filepath) {
				injectJavaScriptFile(item.filepath);
			} else {
				injectJavaScriptCode(item.code);
			}
		});
	}
}

function injectJavaScriptCode(code) {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.innerHTML = code;
	buffer.appendChild(script);
}

function injectJavaScriptFile(filepath) {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', filepath);
	buffer.appendChild(script);
}

function injectCssCode(code) {
	var style = document.createElement('style');
	style.setAttribute('type', 'text/css');
	style.innerHTML = code;
	buffer.appendChild(style);
}

function injectCssFile(filepath) {
	var link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('href', filepath);
	buffer.appendChild(link);
}

chrome.storage.local.get('injector', function(data) {
	
	if (data && shouldBeLaunched(data.injector)) {
		launchInjector(data.injector);
	}
	
});