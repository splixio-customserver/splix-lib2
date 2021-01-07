// Nothing super special here, just loading and saving changes made in the UI. 
let serverIpTextBox = document.getElementById("serverIp");
let serverIpApply = document.getElementById("applyIp");

let debugCheckbox = document.getElementById("debug");
let enableServerIp = document.getElementById("enableServerIp");

debugCheckbox.addEventListener("change", ()=>{
	chrome.storage.local.set({enableDebug: debugCheckbox.checked
	}, ()=>{
		console.log("Saved, set enableDebug to", debugCheckbox.checked);
	});
});

enableServerIp.addEventListener("change", ()=>{
	chrome.storage.local.set({enableIpOverride: enableServerIp.checked
	}, ()=>{
		console.log("Saved, set enableIpOverride to", enableServerIp.checked);
	});
});

serverIpApply.addEventListener("click", ()=>{
	if(serverIpTextBox.value.indexOf("wss://") === 0 || serverIpTextBox.value.indexOf("ws://") === 0) {
		chrome.storage.local.set({overrideIp: serverIpTextBox.value
		}, ()=>{
			console.log("Saved, set overrideIp to", serverIpTextBox.value);
		})
	}
})

chrome.storage.local.get(["overrideIp", "enableDebug", "enableIpOverride"], (result)=>{
	if(result.enableIpOverride !== undefined) enableServerIp.checked = result.enableIpOverride;
	if(result.enableDebug !== undefined) debugCheckbox.checked = result.enableDebug;
	if(result.overrideIp !== undefined) serverIpTextBox.value = result.overrideIp;
});