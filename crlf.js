
chrome.runtime.sendMessage({
	name: "requestContentToBackground"
}, function(response) {
	console.dir(response);
	let content = document.getElementById("content");
	console.dir(content);
	content.innerHTML = response.content;
});
