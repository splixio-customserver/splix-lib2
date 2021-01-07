

/** Inject a script into the DOM for running in the site's context */
function inject(fileName, attributeName, attributeContent, id) {
	let script = document.createElement("script");
	if(attributeName) script.setAttribute(attributeName, attributeContent);
	if(id) script.id = id;
	script.src = chrome.extension.getURL(fileName);
	script.async = false;
	document.documentElement.append(script);    
}

chrome.storage.local.get(["enableDebug", "enableIpOverride", "overrideIp"], (result)=>{
	console.log(result);
	if(result.enableDebug) {
		inject("debug.js", "debug");
	}
	if(result.enableIpOverride && result.overrideIp) {
		inject("override.js", "data-ipaddr", result.overrideIp, "ip-override");
	}
});