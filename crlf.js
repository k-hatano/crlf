
chrome.windows.getCurrent(function(currentWindow){
	chrome.tabs.getSelected(currentWindow.id, function(selectedTab){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			console.dir(xhr);
			switch (xhr.readyState) {
				case 4: {
					if ( xhr.status == 200 || xhr.status == 304 ) {
				    	let contentDiv = document.getElementById("content");

						let content = xhr.responseText;
						let result = "";
						while (content.length > 0) {
							let linebreak = false;
							if (content.charAt(0) == "\r") {
								linebreak = true;
								result += "<span class='cr'>CR</span>";
								content = content.substring(1);
							}
							if (content.charAt(0) == "\n") {
								linebreak = true;
								result += "<span class='lf'>LF</span>";
								content = content.substring(1);
							}
							if (linebreak) {
								result += "<br />";
								continue;
							}

							if (content.charAt(0) == "\t") {
								result += "&emsp;";
								content = content.substring(1);
								continue;
							}
							if (content.charAt(0) == " ") {
								result += "&nbsp;";
								content = content.substring(1);
								continue;
							}

							result += escapeHtml(content.charAt(0));
							content = content.substring(1);
						}
						showMessages("", "");
						contentDiv.innerHTML = result;
					} else {
						let errorMessage = "" + xhr.status;
						if (xhr.statusText != undefined && xhr.statusText.length > 0) {
							errorMessage += ": " + xhr.statusText;
						}

						showMessages("", "An error occurred." + "<br />" + errorMessage);
					}
				}
				default:
					break;
			}
    	};
		xhr.open("GET", selectedTab.url, true);
		xhr.send(null);

		chrome.tabs.getCurrent(function(currentTab){
			chrome.tabs.update(currentTab.id, {active: true}, function(ignore){ });
		});
	});
});

function escapeHtml (string) {
  if (typeof string !== 'string') {
    return string;
  }
  return string.replace(/[&'`"<>]/g, function(match) {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    }[match]
  });
}

function showMessages(message, caution) {
	let messageSpan = document.getElementById("message");
	let cautionSpan = document.getElementById("caution");

	messageSpan.innerHTML = message;
	cautionSpan.innerHTML = caution;
}