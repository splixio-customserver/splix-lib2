console.log("Debug injected!");

// Messy code that uses prototypes when it doesn't really need to, but it works and would be a pain to recreate. 
// But more or less it hooks onMessage and wsSendMsg in the game and prints what was transferred in a human readable format in the console.
// If it's a CHUNK_OF_BLOCKS message, it sends it differently to make it more readable. Line 32 does that and it's commented out to make
// the log look more consistent.  

Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() { return that.apply(this, arguments); };
    for(var key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
};
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  
wsmg = wsSendMsg.clone();
wsSendMsg = function(t, n) {
    console.log("SEND ",getKeyByValue(sendAction, t), n);
    wsmg(t, n);
}

oM = onMessage.clone();
onMessage = function(e) {
    var t, n, a, i, o, r, s, l, c, d, m = new Uint8Array(e.data);
    console.log("RECIEVE ", getKeyByValue(receiveAction, m[0]), m.slice(1));
if(m[0] == receiveAction.CHUNK_OF_BLOCKS || m[0] == receiveAction.LEADERBOARD) {
        //console.log(m.slice(1).toString());
    }
    oM(e);
}