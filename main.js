// landform Layer
const map = L.map('lfmap').setView([24.6862, 72.09298], 7);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let myLayer = L.geoJSON().addTo(map);
myLayer.addData(villageData);
map.fitBounds(myLayer.getBounds());

// Soil Depth Layer
const sdmap = L.map('sdmap').setView([24.6862, 72.09298], 7);

const tiles1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(sdmap);

let sdLayer = L.geoJSON().addTo(sdmap);
sdLayer.addData(villageData);
sdmap.fitBounds(sdLayer.getBounds());

// Soil AWC Layer
const awcmap = L.map('awcmap').setView([24.6862, 72.09298], 7);

const tiles2 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(awcmap);

let awcLayer = L.geoJSON().addTo(awcmap);
awcLayer.addData(villageData);
awcmap.fitBounds(awcLayer.getBounds());

// Soil OC Layer
const ocmap = L.map('ocmap').setView([24.6862, 72.09298], 7);

const tiles3 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(ocmap);

let ocLayer = L.geoJSON().addTo(ocmap);
ocLayer.addData(villageData);
ocmap.fitBounds(ocLayer.getBounds());

let uniTaluka = [];
let uniVillages = [];


function GetTalukaName() {
  let select1 = document.getElementById("thnid");
  let selectCityText = select1.options[select1.selectedIndex].text;

  let selectVillage = document.getElementById("villid");
  selectVillage.innerHTML = "";
  let uniVillages = [];
  for (let i = 0; i < villageData.features.length; i++) {
    let dist = villageData.features[i].properties;
    let thn = villageData.features[i].properties;
    let vill = villageData.features[i].properties;
    if (thn.thmname == selectCityText) {
      let chk = uniVillages.includes(vill);
      if (chk == false) {
        uniVillages.push(vill.vincode);
        var option = document.createElement("option");
        option.text = vill.vilmname;
        option.value = vill.vincode;
        selectVillage.appendChild(option);
      }
    }
  }
  LoadTaluka()
}

function GetDistrictName() {
  let select = document.getElementById("distid");
  let selectDistrictText = select.options[select.selectedIndex].text;

  let selectTaluka = document.getElementById("thnid");
  selectTaluka.innerHTML = "";

  for (let i = 0; i < villageData.features.length; i++) {
    let dist = villageData.features[i].properties;
    let thn = villageData.features[i].properties;
    if (dist.dtmname == selectDistrictText) {
      let chk = uniTaluka.includes(thn.thncode);
      if (chk == false) {
        uniTaluka.push(thn.thncode);
        var option = document.createElement("option");
        option.text = thn.thmname;
        option.value = thn.thncode;
        selectTaluka.appendChild(option);
      }
    }
  }
  LoadDistrict()
}


//Create Dropdown for District

let selectdistrict = document.getElementById("distid");
let uniDistrict = [];
// Collect district names and values
for (let i = 0; i < villageData.features.length; i++) {
  let dist = villageData.features[i].properties;

  let chk = uniDistrict.includes(dist.dtncode);


  if (chk == false) {
    uniDistrict.push(dist.dtncode);
    var option = document.createElement("option");
    option.text = dist.dtmname;
    option.value = dist.dtncode;
    selectdistrict.appendChild(option);
    // seletState.add(new Option(stateName, stateName))
  }
}

// console.log(uniDistrict);

let filterFeatures = [];

function LoadDistrict() {
  let districtData = villageData.features;
  filterFeatures = [];

  let select = document.getElementById("distid");
  let selectDistrictText = select.options[select.selectedIndex].text;

  districtData.forEach(function (e) {
    let disName = e.properties['dtmname'];
    if (disName == selectDistrictText) {
      filterFeatures.push(e);
    }
  });

  let distGeoJson = { type: 'FeatureCollection', features: filterFeatures }

  map.removeLayer(myLayer)
  myLayer = L.geoJSON(distGeoJson).addTo(map);
  map.fitBounds(myLayer.getBounds());

  sdmap.removeLayer(sdLayer)
  sdLayer = L.geoJSON(distGeoJson).addTo(sdmap);
  sdmap.fitBounds(myLayer.getBounds());

  awcmap.removeLayer(awcLayer)
  awcLayer = L.geoJSON(distGeoJson).addTo(awcmap);
  awcmap.fitBounds(myLayer.getBounds());

  ocmap.removeLayer(ocLayer)
  ocLayer = L.geoJSON(distGeoJson).addTo(ocmap);
  ocmap.fitBounds(myLayer.getBounds());
}

function LoadTaluka() {
  let districtData = villageData.features;
  filterFeatures = [];

  let select1 = document.getElementById("thnid");
  let selectTalukaText = select1.options[select1.selectedIndex].value;

  let select = document.getElementById("distid");
  let selectDistrictText = select.options[select.selectedIndex].value;

  districtData.forEach(function (e) {
    let disName = e.properties['thncode'];
    if (disName == selectTalukaText) {
      filterFeatures.push(e);
    }
  });

  let talukaGeoJson = { type: 'FeatureCollection', features: filterFeatures }

  map.removeLayer(myLayer)
  myLayer = L.geoJSON(talukaGeoJson).addTo(map);
  map.fitBounds(myLayer.getBounds());

  sdmap.removeLayer(sdLayer)
  sdLayer = L.geoJSON(talukaGeoJson).addTo(sdmap);
  sdmap.fitBounds(myLayer.getBounds());

  awcmap.removeLayer(awcLayer)
  awcLayer = L.geoJSON(talukaGeoJson).addTo(awcmap);
  awcmap.fitBounds(myLayer.getBounds());

  ocmap.removeLayer(ocLayer)
  ocLayer = L.geoJSON(talukaGeoJson).addTo(ocmap);
  ocmap.fitBounds(myLayer.getBounds());
}

function LoadVillage() {
  let districtData = villageData.features;
  filterFeatures = [];

  let select2 = document.getElementById("villid");
  let selectVillageText = select2.options[select2.selectedIndex].value;

  let select1 = document.getElementById("thnid");
  let selectTalukaText = select1.options[select1.selectedIndex].value;

  let select = document.getElementById("distid");
  let selectDistrictText = select.options[select.selectedIndex].value;

  districtData.forEach(function (e) {
    let disName = e.properties['vincode'];
    if (disName == selectVillageText) {
      filterFeatures.push(e);
    }
  });

  let villageGeoJson = { type: 'FeatureCollection', features: filterFeatures }

  map.removeLayer(myLayer)
  myLayer = L.geoJSON(villageGeoJson).addTo(map);
  map.fitBounds(myLayer.getBounds());

  sdmap.removeLayer(sdLayer)
  sdLayer = L.geoJSON(villageGeoJson).addTo(sdmap);
  sdmap.fitBounds(myLayer.getBounds());

  awcmap.removeLayer(awcLayer)
  awcLayer = L.geoJSON(villageGeoJson).addTo(awcmap);
  awcmap.fitBounds(myLayer.getBounds());

  ocmap.removeLayer(ocLayer)
  ocLayer = L.geoJSON(villageGeoJson).addTo(ocmap);
  ocmap.fitBounds(myLayer.getBounds());
}


