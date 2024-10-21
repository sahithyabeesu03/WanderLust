mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style:"mapbox://styles/mapbox/streets-v12",
   center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 10// starting zoom
});


const marker = new mapboxgl.Marker({color:"red"})
    .setLngLat( listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h5><b>${listing.title}</b></h5><h6><b>${listing.location}</b></h6> <p>Exact location will be provided after booking</p>`

    ))

    .addTo(map);
