// landform Layer
const map = L.map('lfmap').setView([24.6862, 72.09298], 7);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let myLayer = L.geoJSON().addTo(map);
myLayer.addData(villageData);
map.fitBounds(myLayer.getBounds());

let uniTaluka = [];
let uniVillages = [];


function GetTalukaName() {
  let select1 = document.getElementById("thnid");
  let selectCityText = select1.options[select1.selectedIndex].text;

  let selectVillage = document.getElementById("villid");
  selectVillage.innerHTML = "";
  let uniVillages = [];
  for (let i = 0; i < villageData.features.length; i++) {
    let dist = villageData.features[i].properties.dtmname;
    let thn = villageData.features[i].properties.thmname;
    let vill = villageData.features[i].properties.vilmname;
    if (thn == selectCityText) {
      let chk = uniVillages.includes(vill);
      if (chk == false) {
        uniVillages.push(vill);
        var option = document.createElement("option");
        option.text = vill;
        option.value = vill;
        selectVillage.appendChild(option);
      }
    }
  }
}

function GetDistrictName() {
  let select = document.getElementById("distid");
  let selectDistrictText = select.options[select.selectedIndex].text;

  let selectTaluka = document.getElementById("thnid");
  selectTaluka.innerHTML = "";

  for (let i = 0; i < villageData.features.length; i++) {
    let dist = villageData.features[i].properties.dtmname;
    let thn = villageData.features[i].properties.thmname;
    // console.log(thn)
    if (dist == selectDistrictText) {
      let chk = uniTaluka.includes(thn);
      if (chk == false) {
        uniTaluka.push(thn);
        var option = document.createElement("option");
        option.text = thn;
        option.value = thn;
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

  let chk = uniDistrict.includes(dist.dtmname);


  if (chk == false) {
    uniDistrict.push(dist.dtmname);
    var option = document.createElement("option");
    option.text = dist.dtmname;
    option.value = dist.dtmname;
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

  let newGeoJson = { type: 'FeatureCollection', features: filterFeatures}

  map.removeLayer(myLayer)
  myLayer = L.geoJSON(newGeoJson).addTo(map);
  map.fitBounds(myLayer.getBounds());
}



