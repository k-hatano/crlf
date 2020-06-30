
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.dir(request);
		let content = document.documentElement.innerHTML;
		if (request.name == "requestContent") {
			sendResponse({content: content});
			return;
		}
		sendResponse(undefined);
	});
