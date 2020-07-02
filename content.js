
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.dir(request);
		let content = document.body.textContent;
		if (request.name == "requestContent") {
			sendResponse({content: content});
			return;
		}
		sendResponse(undefined);
	});
