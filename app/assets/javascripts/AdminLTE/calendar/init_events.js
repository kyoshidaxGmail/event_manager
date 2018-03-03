function init_events(type, eventId) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/csv/event.csv');
  xhr.responseType = 'text';
  xhr.send(null);
  xhr.onload = function(){
    var events = parse_event_csv(xhr.responseText);
    if (type == 'calendar') {
      make_calendar(events);
    } else if (type == 'eventIndex') {
      make_event_index(events);
    } else if (type == 'eventShow') {
      make_event_show(events, eventId);
    }
  };
}

function make_event_index(events) {
  for(var i = 0; i < events.length; ++i) {
    var myEvent = events[i];
    $('#ev-eventList').append(
     '<tr>' +
     '<td><a href="events/' + (i + 1) + '">' + myEvent['title'] + '</a></td>' +
     '<td>' + get_format_datetime(myEvent) + '</td>' +
     '<td>' + myEvent['place'] + '</td>' +
     '<td>' + myEvent['cost'] + '</td>' +
     '<td>' + '<a href="events/' + (i + 1) + '"><i class="fa fa-share"></i></a>' + '</td>' +
     '</tr>'
    );
   }
}

function make_event_show(events, eventId) {
  var myEvent = events[eventId - 1];
  $('#ev-title').html(myEvent['title']);
  $('#ev-description').html(myEvent['description']);
  $('#ev-place').html(myEvent['place']);
  $('#ev-datetime').html(get_format_datetime(myEvent));
  $('#ev-cost').html(myEvent['cost']);
  $('#ev-numberOfPeople').html(myEvent['numberOfPeople']);
  $('#ev-eventUrl').html(myEvent['eventUrl']);
  $('#ev-eventUrl').attr('href', myEvent['eventUrl']);
  if(myEvent['imageUrl']) {
    $('#ev-image').attr('src', myEvent['imageUrl']);
  } else {
    $('#ev-image').hide();
  }
}

function make_calendar(events) {
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  $('#calendar').fullCalendar({
    header : {
      left : 'prev,next today',
      center : 'title',
      right : 'month,agendaWeek,agendaDay'
    },
    buttonText : {
      today : '年',
      month : '月',
      week : '週',
      day : '日'
    },
    //Random default events
    events : events,
    editable : true
  });
}

function parse_event_csv(response_text) {
  var col = {
    'title': 0, 'description': 1, 'imageUrl': 2, 'type': 3,
    'oneDay': 4, 'allDay': 5, 'startDay': 6, 'endDay': 7, 'startTime': 8, 'endTime': 9,
    'eventUrl': 10, 'place': 11, 'numberOfPeople': 12, 'cost': 13,
  };
  var color = {
    'red': '#f56954','yellow': '#f39c12', 'light-blue': '#3c8dbc',
    'green': '#00a65a', 'aqua': '#00c0ef', 'blue': '#0073b7'
  };
  var events = [];
  var rows_data = response_text.split("\n");
  // var csv_data = [];
  for(var i = 1; i < rows_data.length; ++i) {
    var one_row_data = rows_data[i].split(',');
    // csv_data[i] = rows_data[i].split(',');
    var csv_event = {};

    var start_day = one_row_data[col['startDay']].split('/');
    var end_day;
    if (one_row_data[col['oneDay']] == 'TRUE') {
      csv_event['oneDay'] = true;
      end_day = start_day;
    } else {
      csv_event['oneDay'] = false;
      end_day = one_row_data[col['endDay']].split('/');
    }
    if (one_row_data[col['allDay']] == 'TRUE') {
      csv_event['allDay'] = true;
      csv_event['start'] = new Date(start_day);
      csv_event['end'] = new Date(end_day);
    } else {
      csv_event['allDay'] = false;
      csv_event['start'] = new Date(
        start_day[0],
        start_day[1] - 1,
        start_day[2],
        one_row_data[col['startTime']].split(':')[0],
        one_row_data[col['startTime']].split(':')[1]
      );
      csv_event['end'] = new Date(
        end_day[0],
        end_day[1] - 1,
        end_day[2],
        one_row_data[col['endTime']].split(':')[0],
        one_row_data[col['endTime']].split(':')[1]
      );
    }
    csv_event['url'] = one_row_data[col['url']];
    events[i - 1] = {
      title : one_row_data[col['title']],
      allDay : csv_event['allDay'],
      start : csv_event['start'],
      end : csv_event['end'],
      backgroundColor : color[one_row_data[col['type']]],
      borderColor : color[one_row_data[col['type']]],
      url : '/events/' + i,

      oneDay: csv_event['oneDay'],
      description: one_row_data[col['description']],
      imageUrl: one_row_data[col['imageUrl']],
      type: one_row_data[col['type']],
      eventUrl: one_row_data[col['eventUrl']],
      place: one_row_data[col['place']],
      numberOfPeople: one_row_data[col['numberOfPeople']],
      cost: one_row_data[col['cost']],
      // url : csv_event['url'],
    };
  }
  return events;
}

function get_format_datetime(myEvent) {
  var datetime;
  if (myEvent['oneDay'] && myEvent['allDay']) {
    datetime = moment(myEvent['start']).format('YY/MM/DD');
  } else if (myEvent['oneDay'] && !myEvent['allDay']) {
    datetime = moment(myEvent['start']).format('YY/MM/DD HH:mm') +
     '~' + moment(myEvent['end']).format('HH:mm');
  } else if (!myEvent['oneDay'] && myEvent['allDay']) {
    datetime = moment(myEvent['start']).format('YY/MM/DD') +
     '~' + moment(myEvent['end']).format('YY/MM/DD');
  } else { // !myEvent['oneDay'] && !myEvent['allDay']
    datetime = moment(myEvent['start']).format('YY/MM/DD HH:mm') +
     '~' + moment(myEvent['end']).format('YY/MM/DD HH:mm');
  }
  return datetime;
}
