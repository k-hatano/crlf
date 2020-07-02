
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({
		url: 'crlf.html',
		active: false
	}, function(newTab){
		
	});
});
