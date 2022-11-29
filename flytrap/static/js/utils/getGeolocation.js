function getGeolocation(){
  if (navigator.geolocation) {
    // Запрашивает локацию!
      navigator.geolocation.getCurrentPosition( function(position){
          console.log(position);
          // latitude = position.coords.latitude;
          // longitude = position.coords.longitude;
      });
  }
}