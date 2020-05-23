const mapboxAccessToken = `pk.eyJ1IjoiYmVub3pvcmUiLCJhIjoiY2thNWpqd2F5MDB1dTNvcGc2b2EweDd3aSJ9.492kw13XYr7zZAv0FfkgKw`;
const transitApiKey = `zqAH1xZnEZviNZHUaz6`;
const originForm = document.querySelector(".origin-form");
const listOrigin = document.querySelector(".origins");
const destinationForm = document.querySelector(".destination-form");
const destinationOrigin = document.querySelector(".destinations");
const button = document.querySelector(".plan-trip");
let originArray = [];
let destinationArray = [];

originForm.onsubmit = e => {
  const input = e.target.querySelector('input');
  if (input.value.length > 0) {
    getOrigin(input.value);
  }
  input.value = "";
  e.preventDefault();
}

destinationForm.onsubmit = e => {
  const input = e.target.querySelector('input');
  if(input.value.length > 0) {
    getDestination(input.value);
  }
  input.value = "";
  e.preventDefault();
}

button.onclick = e => {

  if(e.target.nodeName === 'BUTTON') {
    // if() {

    // } 
  }
}

function getOrigin(query) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxAccessToken}&limit=10&&bbox=-97.325875,49.766204,-96.953987,49.99275`)
  .then(resp => resp.json())
  .then(data => {
    data.features.forEach(listItem => {
      let fullAddressOfPlace = listItem.place_name;
      const mainAddress = fullAddressOfPlace.split(',');
      listOrigin.insertAdjacentHTML('beforeend', `
      <li data-long="${listItem.center[0]}" data-lat="${listItem.center[1]}" class="">
        <div class="name">${listItem.text}</div>
        <div>${mainAddress[1]}</div>
      </li>
      `)
    });
  });
  listOrigin.innerHTML = "";
}

function getDestination(query) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxAccessToken}&limit=10&&bbox=-97.325875,49.766204,-96.953987,49.99275`)
  .then(resp => resp.json())
  .then(data => {
    data.features.forEach(listItem => {
      let fullAddressOfPlace = listItem.place_name;
      const mainAddress = fullAddressOfPlace.split(',');
      destinationOrigin.insertAdjacentHTML('beforeend', `
      <li data-long="${listItem.center[0]}" data-lat="${listItem.center[1]}" class="">
        <div class="name">${listItem.text}</div>
        <div>${mainAddress[1]}</div>
      </li>
      `)
    });
  });
  destinationOrigin.innerHTML = "";
}

listOrigin.onclick = e => {
  const clickedEle = e.target.closest('li');
  for (let child of listOrigin.children) {
    child.className = "";
  }
  clickedEle.className = "selected";
  originArray = [];
  originArray.push(clickedEle.dataset.long, clickedEle.dataset.lat)
  console.log(originArray)
  return originArray;
}

destinationOrigin.onclick = e => {
  const clickedEle = e.target.closest('li');
  for(let child of destinationOrigin.children) {
    child.className = "";
  }
  clickedEle.className = "selected";
  destinationArray = [];
  destinationArray.push(clickedEle.dataset.long, clickedEle.dataset.lat)
  console.log(destinationArray);
  return destinationArray;
}




