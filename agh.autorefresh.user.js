// ==UserScript==
// @name Auto refresh AdGuardHome
// @version 0.1
// @author Laksamadi Guko
// @match http://ip_server_adguard/
// @grant none
// ==/UserScript==

(function() {
'use strict';
var host = "ip_server_adguard";
var interval = 3 // in seconds
setInterval(function(){
let btnRefresh = document.getElementsByTagName("button")[1];
if(btnRefresh.innerHTML == "Refresh statistics" || btnRefresh.innerHTML == "Segarkan statistik"){
//btnRefresh.click(); // auto click refresh button
lData(); //ajax mode
}
},interval*1000)
function lData(){
var dataUrl = "http://"+host+"/control/stats";
fetch(dataUrl)
.then((response) => {
return response.json();
})
.then((data) => {
// render to index
document.getElementsByTagName("div")[25].innerHTML = data.num_dns_queries;
document.getElementsByTagName("div")[34].innerHTML = data.num_blocked_filtering;
document.getElementsByTagName("span")[2].innerHTML = data.num_dns_queries;
document.getElementsByTagName("span")[3].innerHTML = data.num_blocked_filtering;
})
.catch((error) => {
console.error('Error:', error);
});
}
})();
