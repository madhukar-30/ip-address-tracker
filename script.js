
//map initialization


const search = document.querySelector(".arrow-img");


search.addEventListener("click",function(e){
    const userInput = document.querySelector(".input-container input").value; 
 if(!userInput){
 
alert("please enter a valid ip address or domain name");
return;
}
const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const ipv6Pattern = /([a-fA-F0-9]{1,4}:){7}([a-fA-F0-9]{1,4}|:)|::/;
const domainValid =/^(?=.{1,253}$)(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z]{2,6})+$/;
// Check if the input is an IPv4 or IPv6 address
if (ipv4Pattern.test(userInput) || ipv6Pattern.test(userInput) ) {
    
    getGeolocation(userInput,"ipAddress");
} 
else if( domainValid.test(userInput)){
    getGeolocation(userInput,"domain");
}
else{
    alert("please enter a valid ip address or domain name");
}
})

var map = L.map('map').setView([21.7679, 78.0421], 5);



googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleStreets.addTo(map);

var myIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [40, 40],
    iconAnchor: [22, 94],
 
});

var marker=L.marker([21.7679, 78.0421], {icon: myIcon}).addTo(map);

function getGeolocation(userInput,flag){
 
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_c3zWdo8XEpWfpd8RtlQqKM1MQC3SM&${flag}=${userInput}`)
    .then(response=>response.json())
    .then(data=>{
     console.log(data);
     document.querySelector(".ip-result p").textContent= data.ip;
     document.querySelector(".location-result p").textContent =`${data.location.city}, ${data.location.region},  ${data.location.country}   ${data.location.postalCode}`;
     document.querySelector(".isp-result p").textContent=data.isp;
     document.querySelector(".timezone-result p").textContent= `UTC ${data.location.timezone}`;
     const latitude = data.location.lat;
     const longitude = data.location.lng;
     document.querySelector(".result").style.display="flex";
   // Update the map view to the new location
  map.setView([latitude, longitude], 13);  // Set new map center and zoom level

// Update marker position
 marker.setLatLng([latitude, longitude]);

    })
}