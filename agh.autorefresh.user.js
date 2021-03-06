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
document.getElementsByTagName("div")[25].innerHTML = numFormat(data.num_dns_queries);
document.getElementsByTagName("div")[34].innerHTML = numFormat(data.num_blocked_filtering);
document.getElementsByTagName("div")[44].innerHTML = numFormat(data.num_replaced_safebrowsing);
document.getElementsByTagName("div")[54].innerHTML = numFormat(data.num_replaced_parental);
document.getElementsByTagName("span")[2].innerHTML = numFormat(data.num_dns_queries);
document.getElementsByTagName("span")[3].innerHTML = numFormat(data.num_blocked_filtering);
document.getElementsByTagName("span")[4].innerHTML = numFormat(data.num_replaced_safebrowsing);
document.getElementsByTagName("span")[5].innerHTML = numFormat(data.num_replaced_parental);
document.getElementsByTagName("span")[6].innerHTML = numFormat(data.num_replaced_safesearch);

})
.catch((error) => {
console.error('Error:', error);
});

}

function numFormat(num) {
return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
})();
