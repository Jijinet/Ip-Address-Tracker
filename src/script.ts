import './styles/main.scss';
import { map, latLng, tileLayer, MapOptions,marker, icon } from "leaflet";
import L from 'leaflet';
import mapIcon from './assets/icon-location.svg';


const options: MapOptions = {
    center: latLng(40.731253, -73.996139),
    zoom: 12,
  };
  
  const mymap = map('map', options);
  
  const key = "OHAqobFaRbdeLqimS7VY";
  
  tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,{ //style URL
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    crossOrigin: true,
  }).addTo(mymap);

;

  var locationIcon = L.icon({
    iconUrl: mapIcon,
    shadowUrl: '',

    iconSize:     [38, 48], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});



  const ipInput=document.querySelector('#ip-input') as HTMLInputElement;
  const searchBtn=document.querySelector('#ip-search') as HTMLDivElement;
  const ipValue=document.querySelector('#ip-value') as HTMLDataElement;
  const addressValue=document.querySelector('#address-value') as HTMLDataElement;
  const utcValue=document.querySelector('#utc-value') as HTMLDataElement;
  const ispValue=document.querySelector('#isp-value') as HTMLDataElement;

  // Calculate the offset
var offset = mymap.getSize().x*0.15;
// Then move the map


  searchBtn.addEventListener('click',(e:Event)=>{
    if(ipInput.value != ""){
        fetch(`https://freeipapi.com/api/json/${ipInput.value}`) // api for the get request
    .then(response => response.json())
    .then(data => {
        console.log(data);
        ipValue.innerText=data.ipAddress;
        addressValue.innerText=`${data.countryName}, ${data.cityName} ${data.zipCode}`;
        utcValue.innerText=data.timeZone;
        ispValue.innerText=data.regionName;

        mymap.flyTo([data.latitude,data.longitude],14,{duration:2});
        L.marker([data.latitude, data.longitude],{icon:locationIcon})
  .addTo(mymap)
  .openPopup();

        ipInput.value="";


    } );
    }

  })

  

