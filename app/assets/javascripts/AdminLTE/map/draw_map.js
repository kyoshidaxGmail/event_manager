function drawMap() {
  'use strict';
  /* jVector Maps
   * ------------
   * Create a world map with markers
   */
  $('#world-map-markers').vectorMap({
    map : 'world_mill_en',
    normalizeFunction : 'polynomial',
    hoverOpacity : 0.7,
    hoverColor : false,
    backgroundColor : 'transparent',
    regionStyle : {
      initial : {
        fill : 'rgba(210, 214, 222, 1)',
        'fill-opacity' : 1,
        stroke : 'none',
        'stroke-width' : 0,
        'stroke-opacity' : 1
      },
      hover : {
        'fill-opacity' : 0.7,
        cursor : 'pointer'
      },
      selected : {
        fill : 'yellow'
      },
      selectedHover : {}
    },
    markerStyle : {
      initial : {
        fill : '#00a65a',
        stroke : '#111'
      }
    },
    markers : [{
      latLng : [35.6837953, 139.7452065],
      name : '丸の内TOEI'
    }, {
      latLng : [35.710067, 139.8085064],
      name : '東京スカイツリー'
    }, {
      latLng : [35.6585805, 139.7432442],
      name : '東京タワー'
    }, {
      latLng : [35.696264, 139.7523786],
      name : 'Daiwa神保町3丁目ビル'
    }]
  });
};
