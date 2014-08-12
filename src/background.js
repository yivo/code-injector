(function() {
    var rules;

    function openOptionsPage() {
        var optionsUrl = chrome.extension.getURL('options.html');
        allTabs(function(tabs) {
            var found = false;
            for (var i = 0, len = tabs.length; i < len; ++i) {
                found = optionsUrl === tabs[i].url;
                if (found) {
                    return chrome.tabs.update(tabs[i].id, { selected: true });
                }
            }
            if (found === false) {
                chrome.tabs.create({ url: 'options.html' });
            }
        });
    }

    function isFrame(o) {
        return !o || o.frameId !== 0;
    }

    function allTabs(cb) {
        return chrome.tabs.query({
            currentWindow: true,
            windowType: 'normal'
        }, cb);
    }

    function specificTab(list, id) {
        var el;
        for (var i = 0, len = list.length; i < len; ++i) {
            if ((el = list[i]).id === id) return el;
        }
    }

    function isChromeUrl(url) {
        return url.indexOf('chrome://') !== -1;
    }

    function ruleMatchesUrl(rule, url) {
        var targets = rule.targets;
        var regexes = rule.regexes;
        var i, len, pattern, regex;

        if (regexes) {
            for (i = 0, len = regexes.length; i < len; ++i) {
                if (regexes[i].test(url)) return true;
            }
        } else {
            regexes = rule.regexes = [];
        }

        while (pattern = targets.shift()) {
            try {
                regex = new RegExp(pattern);
                regexes.push(regex);
                if (regex.test(url)) return true;
            } catch(e) {}
        }

        return false;
    }

    function filterRules(rules, o) {
        var result = [];
        if (!rules || !rules.length) return result;
        o || (o = {});
        var onlyEnabled = o.enabled;
        var withScripts = o.scripts;
        var withTargets = o.targets;
        var i = 0;
        var len = rules.length;
        var rule;

        for (; i < len; ++i) {
            rule = rules[i];
            if (onlyEnabled && !rule.enabled) continue;
            if (withTargets && !(rule.targets || rule.targets.length)) continue;
            var hasCss = rule.css && rule.css.length;
            var hasJs = rule.js && rule.js.length;
            if (withScripts && !(hasCss || hasJs)) continue;
            result.push(rule);
        }

        return result;
    }

    function inject(assetsType, tab, rule) {
        var assets = rule[assetsType];
        if (!assets || assets.length < 1) return;
        var id = tab.id;
        var i, len, item;
        var method = assetsType === 'js' ? 'executeScript' : 'insertCSS';
        for (i = 0, len = assets.length; i < len; ++i) {
            item = assets[i];
            chrome.tabs[method](id, {
                code: item.code,
                file: item.filepath,
                runAt: item.runAt
            });
        }
    }

    function onPageCommitted(o) {
        if (isFrame(o) || isChromeUrl(o.url)) return;

        allTabs(function(tabs) {
            var id = o.tabId;
            var tab = specificTab(tabs, id);
            if (!tab) return;

            var i, len, rule;
            var url = tab.url;

            for (i = 0, len = rules.length; i < len; ++i) {
                rule = rules[i];
                if (!ruleMatchesUrl(rule, url)) continue;
                inject('css', tab, rule);
                inject('js', tab, rule);
            }
        });

    }

    function onStorageChange(changes, namespace) {
        rules = filterRules(changes.injector.newValue.rules, {
            enabled: true,
            scripts: true,
            targets: true
        });
    }

    function bindEvents() {
        chrome.webNavigation.onCommitted.addListener(onPageCommitted);
        chrome.storage.onChanged.addListener(onStorageChange);
    }

    chrome.storage.sync.get('injector', function(data) {
        rules = data.injector ? data.injector.rules || [] : [];
        bindEvents();
    });

    chrome.browserAction.onClicked.addListener(openOptionsPage);
})();