// Initialize the landform map with a view centered at specified coordinates and zoom level
const map = L.map('lfmap').setView([24.6862, 72.09298], 7);

// Add OpenStreetMap tile layer to the landform map
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19, // Set maximum zoom level
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' // Provide attribution
}).addTo(map);

// Initialize a GeoJSON layer for the landform map
let myLayer = L.geoJSON().addTo(map);

// Add GeoJSON data (villageData) to the landform map
myLayer.addData(villageData);

// Adjust the map view to fit the bounds of the GeoJSON layer
map.fitBounds(myLayer.getBounds());

var wmsLayer = L.Geoserver.wms("http://localhost:8080/geoserver/Local_postgres/wms", {
  layers: "Local_postgres:nbss_all_soil_data",
});
wmsLayer.addTo(map);

// Initialize the soil depth map with a view centered at specified coordinates and zoom level
const sdmap = L.map('sdmap').setView([24.6862, 72.09298], 7);

// Add OpenStreetMap tile layer to the soil depth map
const tiles1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19, // Set maximum zoom level
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' // Provide attribution
}).addTo(sdmap);

// Initialize a GeoJSON layer for the soil depth map
let sdLayer = L.geoJSON().addTo(sdmap);

// Add GeoJSON data (villageData) to the soil depth map
sdLayer.addData(villageData);

// Adjust the soil depth map view to fit the bounds of the GeoJSON layer
sdmap.fitBounds(sdLayer.getBounds());

// Initialize the soil available water capacity (AWC) map with a view centered at specified coordinates and zoom level
const awcmap = L.map('awcmap').setView([24.6862, 72.09298], 7);

// Add OpenStreetMap tile layer to the AWC map
const tiles2 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19, // Set maximum zoom level
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' // Provide attribution
}).addTo(awcmap);

// Initialize a GeoJSON layer for the AWC map
let awcLayer = L.geoJSON().addTo(awcmap);

// Add GeoJSON data (villageData) to the AWC map
awcLayer.addData(villageData);

// Adjust the AWC map view to fit the bounds of the GeoJSON layer
awcmap.fitBounds(awcLayer.getBounds());

// Initialize the soil organic carbon (OC) map with a view centered at specified coordinates and zoom level
const ocmap = L.map('ocmap').setView([24.6862, 72.09298], 7);

// Add OpenStreetMap tile layer to the OC map
const tiles3 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19, // Set maximum zoom level
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' // Provide attribution
}).addTo(ocmap);

// Initialize a GeoJSON layer for the OC map
let ocLayer = L.geoJSON().addTo(ocmap);

// Add GeoJSON data (villageData) to the OC map
ocLayer.addData(villageData);

// Adjust the OC map view to fit the bounds of the GeoJSON layer
ocmap.fitBounds(ocLayer.getBounds());

// Initialize arrays to store unique taluka and village data
let uniTaluka = [];
let uniVillages = [];

// Function to populate village dropdown based on selected taluka
function GetTalukaName() {
  let select1 = document.getElementById("thnid"); // Get the taluka dropdown element
  let selectCityText = select1.options[select1.selectedIndex].text; // Get selected taluka name

  let selectVillage = document.getElementById("villid"); // Get the village dropdown element
  selectVillage.innerHTML = ""; // Clear existing options
  let uniVillages = []; // Initialize unique villages array

  // Loop through village data to populate village dropdown based on selected taluka
  for (let i = 0; i < villageData.features.length; i++) {
    let dist = villageData.features[i].properties; // Get village properties
    let thn = villageData.features[i].properties; // Get taluka properties
    let vill = villageData.features[i].properties; // Get village properties again (redundant but consistent)
    
    // Check if the village belongs to the selected taluka
    if (thn.thmname == selectCityText) {
      let chk = uniVillages.includes(vill); // Check if village is already added to the unique list
      if (chk == false) {
        uniVillages.push(vill.vincode); // Add unique village code to the array
        var option = document.createElement("option"); // Create a new option element
        option.text = vill.vilmname; // Set village name as option text
        option.value = vill.vincode; // Set village code as option value
        selectVillage.appendChild(option); // Append the option to the village dropdown
      }
    }
  }
  LoadTaluka(); // Load map layers based on selected taluka
}

// Function to populate taluka dropdown based on selected district
function GetDistrictName() {
  let select = document.getElementById("distid"); // Get the district dropdown element
  let selectDistrictText = select.options[select.selectedIndex].text; // Get selected district name

  let selectTaluka = document.getElementById("thnid"); // Get the taluka dropdown element
  selectTaluka.innerHTML = ""; // Clear existing options

  // Loop through village data to populate taluka dropdown based on selected district
  for (let i = 0; i < villageData.features.length; i++) {
    let dist = villageData.features[i].properties; // Get district properties
    let thn = villageData.features[i].properties; // Get taluka properties
    
    // Check if the taluka belongs to the selected district
    if (dist.dtmname == selectDistrictText) {
      let chk = uniTaluka.includes(thn.thncode); // Check if taluka is already added to the unique list
      if (chk == false) {
        uniTaluka.push(thn.thncode); // Add unique taluka code to the array
        var option = document.createElement("option"); // Create a new option element
        option.text = thn.thmname; // Set taluka name as option text
        option.value = thn.thncode; // Set taluka code as option value
        selectTaluka.appendChild(option); // Append the option to the taluka dropdown
      }
    }
  }
  LoadDistrict(); // Load map layers based on selected district
}

// Create dropdown for district selection
let selectdistrict = document.getElementById("distid"); // Get the district dropdown element
let uniDistrict = []; // Initialize unique districts array

// Collect district names and values for the dropdown
for (let i = 0; i < villageData.features.length; i++) {
  let dist = villageData.features[i].properties; // Get district properties

  let chk = uniDistrict.includes(dist.dtncode); // Check if district is already added to the unique list

  if (chk == false) {
    uniDistrict.push(dist.dtncode); // Add unique district code to the array
    var option = document.createElement("option"); // Create a new option element
    option.text = dist.dtmname; // Set district name as option text
    option.value = dist.dtncode; // Set district code as option value
    selectdistrict.appendChild(option); // Append the option to the district dropdown
  }
}

// Initialize an array to store filtered features for map layers
let filterFeatures = [];

// Function to load map layers based on selected district
function LoadDistrict() {
  let districtData = villageData.features; // Get all village data features
  filterFeatures = []; // Clear filtered features array

  let select = document.getElementById("distid"); // Get the district dropdown element
  let selectDistrictText = select.options[select.selectedIndex].text; // Get selected district name

  // Filter features based on selected district
  districtData.forEach(function (e) {
    let disName = e.properties['dtmname']; // Get district name property
    if (disName == selectDistrictText) {
      filterFeatures.push(e); // Add matching feature to the filtered array
    }
  });

  let distGeoJson = { type: 'FeatureCollection', features: filterFeatures }; // Create GeoJSON from filtered features

  // Update map layers with filtered GeoJSON for district level
  map.removeLayer(myLayer);
  myLayer = L.geoJSON(distGeoJson).addTo(map);
  map.fitBounds(myLayer.getBounds());

  sdmap.removeLayer(sdLayer);
  sdLayer = L.geoJSON(distGeoJson).addTo(sdmap);
  sdmap.fitBounds(myLayer.getBounds());

  awcmap.removeLayer(awcLayer);
  awcLayer = L.geoJSON(distGeoJson).addTo(awcmap);
  awcmap.fitBounds(myLayer.getBounds());

  ocmap.removeLayer(ocLayer);
  ocLayer = L.geoJSON(distGeoJson).addTo(ocmap);
  ocmap.fitBounds(myLayer.getBounds());
}

// Function to load map layers based on selected taluka
function LoadTaluka() {
  let districtData = villageData.features; // Get all village data features
  filterFeatures = []; // Clear filtered features array

  let select1 = document.getElementById("thnid"); // Get the taluka dropdown element
  let selectTalukaText = select1.options[select1.selectedIndex].value; // Get selected taluka code

  let select = document.getElementById("distid"); // Get the district dropdown element
  let selectDistrictText = select.options[select.selectedIndex].value; // Get selected district code

  // Filter features based on selected taluka
  districtData.forEach(function (e) {
    let disName = e.properties['thncode']; // Get taluka code property
    if (disName == selectTalukaText) {
      filterFeatures.push(e); // Add matching feature to the filtered array
    }
  });

  let talukaGeoJson = { type: 'FeatureCollection', features: filterFeatures }; // Create GeoJSON from filtered features

  // Update map layers with filtered GeoJSON for taluka level
  map.removeLayer(myLayer);
  myLayer = L.geoJSON(talukaGeoJson).addTo(map);
  map.fitBounds(myLayer.getBounds());

  sdmap.removeLayer(sdLayer);
  sdLayer = L.geoJSON(talukaGeoJson).addTo(sdmap);
  sdmap.fitBounds(myLayer.getBounds());

  awcmap.removeLayer(awcLayer);
  awcLayer = L.geoJSON(talukaGeoJson).addTo(awcmap);
  awcmap.fitBounds(myLayer.getBounds());

  ocmap.removeLayer(ocLayer);
  ocLayer = L.geoJSON(talukaGeoJson).addTo(ocmap);
  ocmap.fitBounds(myLayer.getBounds());
}

// Function to load map layers based on selected village
function LoadVillage() {
  let districtData = villageData.features; // Get all village data features
  filterFeatures = []; // Clear filtered features array

  let select2 = document.getElementById("villid"); // Get the village dropdown element
  let selectVillageText = select2.options[select2.selectedIndex].value; // Get selected village code

  let select1 = document.getElementById("thnid"); // Get the taluka dropdown element
  let selectTalukaText = select1.options[select1.selectedIndex].value; // Get selected taluka code

  let select = document.getElementById("distid"); // Get the district dropdown element
  let selectDistrictText = select.options[select.selectedIndex].value; // Get selected district code

  // Filter features based on selected village
  districtData.forEach(function (e) {
    let disName = e.properties['vincode']; // Get village code property
    if (disName == selectVillageText) {
      filterFeatures.push(e); // Add matching feature to the filtered array
    }
  });

  let villageGeoJson = { type: 'FeatureCollection', features: filterFeatures }; // Create GeoJSON from filtered features

  // Update map layers with filtered GeoJSON for village level
  map.removeLayer(myLayer);
  myLayer = L.geoJSON(villageGeoJson).addTo(map);
  map.fitBounds(myLayer.getBounds());

  sdmap.removeLayer(sdLayer);
  sdLayer = L.geoJSON(villageGeoJson).addTo(sdmap);
  sdmap.fitBounds(myLayer.getBounds());

  awcmap.removeLayer(awcLayer);
  awcLayer = L.geoJSON(villageGeoJson).addTo(awcmap);
  awcmap.fitBounds(myLayer.getBounds());

  ocmap.removeLayer(ocLayer);
  ocLayer = L.geoJSON(villageGeoJson).addTo(ocmap);
  ocmap.fitBounds(myLayer.getBounds());
}
