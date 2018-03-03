function init_places(type, placeId, placeName) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/csv/place.csv');
  xhr.responseType = 'text';
  xhr.send(null);
  xhr.onload = function(){
    var places = parse_place_csv(xhr.responseText);
    if (type == 'placeIndex') {
      make_place_index(places);
    } else if (type == 'setPlaceInfo') {
      for(var i = 0; i < places.length; ++i) {
        if (places[i]['name'] == placeName) {
          if (places[i]['longitude'] && places[i]['latitude']) {
            var mapDom = '\
              <a href="https://www.google.co.jp/maps/place/'+ places[i]['name'] +
              '/@' + places[i]['longitude'] + ',' + places[i]['latitude'] + ',15z" target="_blank">\
                <i class="fa fa-fw fa-map"></i>\
              </a>';
            $('#ev-place').after(mapDom);
          }
          if (places[i]['url']) {
            var urlDom = '\
              <a href="' + places[i]['url'] + '" target="_blank">\
                <i class="fa fa-fw fa-link"></i>\
              </a>';
            $('#ev-place').after(urlDom);
          }
        }
      }
    }
  };
}

function make_place_index(places) {
  var newDomTemp = '\
    <div class="col-md-5 col-sm-6 col-xs-12" id="##placeId">\
      <div class="info-box">\
        <div class="info-box-img"></div>\
        <div class="info-box-content">\
          <span class="info-box-title">##name</span>\
          <span class="info-box-text">##description</span>\
          <span class="info-box-buttons">\
            <span class="##mapDom"></span>\
            <span class="##urlDom"></span>\
          </span>\
        </div>\
      </div>\
    </div>';
  var mapDom = '\
    <a href="https://www.google.co.jp/maps/place/##mapName/@##longitude,##latitude,15z" target="_blank">\
      <i class="fa fa-fw fa-map"></i>\
    </a>';
  var urlDom = '\
    <a href="##url" target="_blank">\
      <i class="fa fa-fw fa-link"></i>\
    </a>';
      // <span class="">\
        // <i class="ion ion-ios-gear-outline"></i>\
      // </span>\
  for(var i = 0; i < places.length; ++i) {
    var newDom = newDomTemp;
    var newDomId = 'place_' + (i + 1);
    newDom = newDom.replace(/##placeId/, newDomId);
    if (places[i]['imageUrl']) {
      newDom = newDom.replace(/##imageUrl/, places[i]['imageUrl']);
    }
    newDom = newDom.replace(/##name/, places[i]['name']);
    newDom = newDom.replace(/##description/, places[i]['description']);
    if (places[i]['longitude'] && places[i]['latitude']) {
      newDom = newDom.replace(/<span class="##mapDom"><\/span>/, mapDom);
      newDom = newDom.replace(/##mapName/, places[i]['name']);
      newDom = newDom.replace(/##latitude/, places[i]['latitude']);
      newDom = newDom.replace(/##longitude/, places[i]['longitude']);
    }
    if (places[i]['url']) {
      newDom = newDom.replace(/<span class="##urlDom"><\/span>/, urlDom);
      newDom = newDom.replace(/##url/, places[i]['url']);
    }

    $('#placeColEnd').before(newDom);
    var imageUrl;
    // alert(p;laces[i]['imageUrl']);
    if (places[i]['imageUrl']) {
    // alert(places[i]['imageUrl'] != '');
      imageUrl =  places[i]['imageUrl'];
    } else {
      imageUrl =  'http://1.bp.blogspot.com/-smvm7myXUC0/V2vXjs3wdYI/AAAAAAAA73I/A3o83wpFyoYq14RRJ8obzlIPx0Tuz_AJQCLcB/s800/building_biru3.png';
    }
    $('#' + newDomId + ' .info-box-img').css('background-image', 'url(' + imageUrl + ')');

  }
}
function parse_place_csv(response_text) {
  var col = {
    'name': 0, 'description': 1, 'type': 2, 'postalCode': 3,
    'address': 4, 'phoneNumber': 5, 'longitude': 6, 'latitude': 7, 'url': 8, 'imageUrl': 9,
  };
  var places = [];
  var rows_data = response_text.split("\n");
  // var csv_data = [];
  for(var i = 1; i < rows_data.length; ++i) {
    var one_row_data = rows_data[i].split(',');
    // csv_data[i] = rows_data[i].split(',');

    places[i - 1] = {
      name : one_row_data[col['name']],
      description : one_row_data[col['description']],
      type : one_row_data[col['type']],
      postalCode : one_row_data[col['postalCode']],
      address : one_row_data[col['address']],
      phoneNumber : one_row_data[col['phoneNumber']],
      longitude : one_row_data[col['longitude']],
      latitude : one_row_data[col['latitude']],
      url : one_row_data[col['url']],
      imageUrl : one_row_data[col['imageUrl']],
    };
  }
  return places;
}