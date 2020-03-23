const ul = document.getElementById("geoIp");
const geoIpUrl = `https://freegeoip.app/json/`;

function getGeoIP(ip) {
  fetch(geoIpUrl)
    .then(res => res.json())
    .then(geoIp => {
      ip = geoIp;
      console.log(ip.country_code);
      const findMeHeading = document.querySelector("#heading");
      findMeHeading.innerHTML = `Hello <span>visitor</span>!<br/>
      Click on link below to find your location on <span>Google Open Street Maps</span>:`;
      const status = document.querySelector("#status");
      const mapLink = document.querySelector("#map-link");
      mapLink.href = ``;
      mapLink.textContent = ``;
      const div = document.querySelector(".center");
      div.innerHTML = `
	The <span>name</span> of the <span>country</span> you are hailing from is <span class="data">${ip["country_name"]}</span>.`;
      function geoSuccess(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        status.textContent = ``;
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `Your Coordinates are Latitude: ${latitude} ° and Longitude: ${longitude} °`;
      }
      function error() {
        status.textContent = `Geolocation is not supported by your browser`;
        console.log(`the status ${status}`);
      }
      if (!navigator.geolocation) {
        status.textContent = `Geolocation is not supported by your browser.`;
      } else {
        status.textContent = `Locating...`;
        navigator.geolocation.getCurrentPosition(geoSuccess, error);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

function refresh() {
  document.location.reload();
}

const btnRefresh = document.getElementById("refresh-me");
btnRefresh.textContent = `Refresh me!`.trim();
btnRefresh.addEventListener("mousedown", refresh);

const btnSuccess = document.querySelector("#find-me");
btnSuccess.textContent = `Find me!`.trim();
btnSuccess.addEventListener("mousedown", getGeoIP);
