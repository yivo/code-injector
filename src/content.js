(function() {
    'use strict';

    var buffer;

    function applyRules(rules) {
        buffer = document.createDocumentFragment();
        rules.forEach(applyRule);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(buffer);
    }

    function applyRule(rule) {
        var i, len, item;
        var css = rule.css;
        var js = rule.js;

        if (css) {
            for (i = 0, len = css.length; i < len; ++i) {
                item = css[i];
                if (item.filepath) {
                    injectCssFile(item.filepath);
                } else {
                    injectCssCode(item.code);
                }
            }
        }

        if (js) {
            for (i = 0, len = js.length; i < len; ++i) {
                item = js[i];
                if (item.filepath) {
                    injectJavaScriptFile(item.filepath);
                } else {
                    injectJavaScriptCode(item.code);
                }
            }
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

    chrome.runtime.onMessage.addListener(function(req) {
        if (req.command === 'apply-rules' && req.rules.length) {
            applyRules(req.rules);
        }
    });

})();
