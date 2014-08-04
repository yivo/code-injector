function openOptionsPage() {
   var optionsUrl = chrome.extension.getURL('options.html'); 
   chrome.tabs.query({}, function(extensionTabs) {
      var found = false;
      for (var i = 0, len = extensionTabs.length; i < len; ++i) {
         found = optionsUrl === extensionTabs[i].url;
		 if (found) {
            chrome.tabs.update(extensionTabs[i].id, {'selected': true});
			return;
         }
      }
      if (found === false) {
          chrome.tabs.create({url: 'options.html'});
      }
   });
}

chrome.browserAction.onClicked.addListener(function(tab) {
   openOptionsPage();
});
