
chrome.browserAction.onClicked.addListener(function(tab) {
	var pinned = tab.pinned;
	chrome.tabs.create({
		url: 'crlf.html'
	}, function(newTab){

	});
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.name == "requestContentToBackground") {
			chrome.runtime.sendMessage({
				name: "requestContent"
			}, function(response) {
				sendResponse({content: content});
				return;
			});
			return;
		}
		sendResponse(undefined);
	});
