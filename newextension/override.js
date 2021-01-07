console.log("Override injected!");

let targetIp = document.getElementById("ip-override").getAttribute("data-ipaddr");
console.log("Ip address is", targetIp);




// Poll and wait for getServer to exist before doing anything
let interval = setInterval(()=>{
	if(getServer) {
		clearInterval(interval);
		getServer = function(){return {ip: "ws://" + targetIp, ip4: targetIp, ip6: targetIp, ping:0}}
	}
}, 100);