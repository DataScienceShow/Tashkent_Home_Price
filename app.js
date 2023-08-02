function getTypeHome() {
    var uiHousetype = document.getElementsByName("uiHousetype");
    for(var i in uiHousetype) {
      if(uiHousetype[i].checked) {
          return uiHousetype[i].value;
      }
    }
    return ""; // Invalid Value
  }
  
function getNumRooms() {
var uiroom = document.getElementsByName("uiBHK");
for(var i in uiroom) {
    if(uiroom[i].checked) {
        return uiroom[i].value;
    }
}
return -1; // Invalid Value
}

function onClickedEstimatePrice() {
console.log("Estimate price button clicked");
var sqft = document.getElementById("uiSqft");
var room = getNumRooms();
var typeofHome = getTypeHome();
var location = document.getElementById("uiLocations");
var estPrice = document.getElementById("uiEstimatedPrice");


console.log(room)

var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
//var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
// var url= "http://127.0.0.1:5000/get_location_name"
$.post(url, {
    headers: {
        'Content-Type': 'application/json'
    },
    Area: parseFloat(sqft.value),
    rooms: room,
    type: typeofHome,
    district: location.value.replace(' district','')
},function(data, status) {
    console.log(data);
    estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " USD  </h2>";
    console.log(status);
});
}

function onPageLoad() {
console.log( "document loaded" );

var url = "http://127.0.0.1:5000/get_location_name";
// var url = "/api/get_location_name";
$.get(url,function(data, status) {
    console.log("got response for get_location_names request");
    if(data) {
        var locations = data.locations;
        var uiLocations = document.getElementById("uiLocations");
        $('#uiLocations').empty();
        for(var i in locations) {
            var opt = new Option(locations[i]);

            $('#uiLocations').append(opt)
        }
    }
});
}

window.addEventListener('load',onPageLoad)

window.addEventListener('load',switchLang)


function switchLang() {
    const langValue = document.querySelector('.form-lang').value

    document.querySelector('.area-title').innerHTML = langValue === 'Uzbek' ? 'Maydon (kvadrat metr)' : langValue === 'Russian' ? 'Площадь (квадратные метры)' : 'Area (square meter)'

    document.querySelector('.rooms-title').innerHTML = langValue === 'Uzbek' ? 'Xonalar' : langValue === 'Russian' ? 'Комнаты' : 'Rooms'

    document.querySelector('.home-title').innerHTML = langValue === 'Uzbek' ? 'Uy turi' : langValue === 'English' ? 'Type of Home' : 'Тип жилья'

    document.querySelector('.location-title').innerHTML = langValue === 'Uzbek' ? 'Joylashuv' : langValue === 'Russian' ? 'Местоположение' : 'Location'

    document.querySelector('.submit').innerHTML = langValue === 'Uzbek' ? "Taxminiy narx" : langValue === 'English' ? 'Estimate Price' : 'Ориентировочная цена'

    document.querySelector('.choose').innerHTML = langValue === 'Uzbek' ? 'Joyni tanlang' : langValue === 'Russian' ? "Выберите место" : 'Choose a Location' 

    document.querySelector('.new').innerHTML = langValue === 'Uzbek' ? 'Yangi' : langValue === 'Russian' ? 'Новый' : 'New'

    document.querySelector('.sec').innerHTML = langValue === 'Uzbek' ? 'Oldin yashalgan' : langValue === 'Russian' ? 'Вторичный' : 'Secondary'
}



