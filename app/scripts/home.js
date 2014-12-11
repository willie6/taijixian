// Generated by CoffeeScript 1.8.0
(function() {
  var fadeIn, fadeOut, option;

  fadeOut = function(id, timeout) {
    var currentObject, i, maxHeight, timer;
    currentObject = $("." + id);
    maxHeight = parseInt(currentObject.height);
    i = 0;
    return timer = setInterval(function() {
      var value;
      i++;
      value = parseFloat(i) * 0.01;
      currentObject.css({
        'filter': 'alpha(opacity =' + i + ')',
        '-moz-opacity': value,
        'opacity': value,
        'height': maxHeight
      });
      if (i === 100) {
        return clearInterval(timer);
      }
    }, timeout);
  };

  fadeIn = function(id, timeout) {
    var currentObject, currentTimer, i, maxHeight;
    currentObject = $('.' + id);
    maxHeight = parseInt(currentObject.height);
    i = 100;
    return currentTimer = setInterval(function() {
      var value;
      value = parseFloat(i) * 0.01;
      currentObject.css({
        'filter': 'alpha(opacity =' + i + ')',
        '-moz-opacity': value,
        'opacity': value,
        'height': maxHeight
      });
      i--;
      if (i === 500) {
        return clearInterval(currentTimer);
      }
    }, timeout);
  };

  $('.js-play-game').click(function() {
    var cookieItem, cookieValue, cookiess, _i, _len, _results;
    if (document.cookie !== '') {
      cookiess = document.cookie.split(';');
      _results = [];
      for (_i = 0, _len = cookiess.length; _i < _len; _i++) {
        cookieItem = cookiess[_i];
        if (cookieItem.split('=')[0] === 'name') {
          cookieValue = cookieItem.split('=')[1];
          if (cookieValue === 'true') {
            $(this).closest('div.js-paly-intro').css('display', 'none');
            $('.js-no-tip').click();
            break;
          }
        }
        if (cookieItem.index === (cookiess.length - 1)) {
          $(this).closest('div.js-paly-intro').css('display', 'none');
          _results.push($('div.js-taiji-sec').css('display', 'block'));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    } else {
      $(this).closest('div.js-paly-intro').css('display', 'none');
      return $('div.js-taiji-sec').css('display', 'block');
    }
  });

  option = {
    chart: {
      backgroundColor: 'black',
      renderTo: 'container',
      events: {
        load: function() {
          var series;
          series = this.series[0];
          return setInterval((function() {
            var x, y;
            x = (new Date()).getTime();
            y = Math.round(Math.random() * 100);
            return series.addPoint([x, y], true, true);
          }), 1000);
        }
      }
    },
    title: {
      text: '',
      x: -20
    },
    subtitle: {
      text: '',
      x: -20
    },
    colors: ['#0ff01a', '#38b843', '#ef3312', '#a04433'],
    xAxis: {
      type: 'datetime',
      gridLineWidth: 0,
      lineWidth: 0,
      tickPixelInterval: 100,
      tickWidth: 0,
      labels: {
        enabled: false
      }
    },
    yAxis: {
      title: {
        text: ''
      },
      gridLineColor: 'black',
      gridLineWidth: 0,
      lineWidth: 0,
      tickWidth: 0
    },
    tooltip: {
      useHTML: true,
      shared: true,
      borderWidth: 0,
      borderRadius: '10px',
      formatter: function() {
        return "<div style='position: absolute; top:7px; border-color: transparent green transparent transparent; border-style: dashed dashed solid dashed; border-width: 8px'>" + "<div style='position: absolute; border-color: transparent green transparent transparent; border-style: dashed dashed solid dashed; border-width:8px; top: -8px; left: -6px;'></div>" + "<div></div></div><div style='position: relative; left: 16px; background: #084c1c; border: 2px solid green; border-radius: 10px; padding: 8px; font-size: 16px; display: block'>" + "<span style='color: white; display: block;'>行情进入了绿色" + "<br/>" + "区域，太极线发出" + "<br/>" + "下跌信号，请点击</span>" + "<span style='color: #00f901; display: block'>\"卖出平仓\"</span></div>";
      }
    },
    credits: {
      enabled: false
    },
    navigator: {
      enabled: false
    },
    scrollbar: {
      enabled: false
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    rangeSelector: {
      buttons: [
        {
          count: 5,
          type: 'minute',
          text: '1M'
        }
      ],
      inputEnabled: false,
      selected: 0
    },
    series: [
      {
        'id': 'kline',
        'name': 'k线',
        'type': 'candlestick',
        'data': [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
        'id': 'line1',
        'name': 'line1',
        'type': 'area',
        'data': [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        'color': '#00ff00',
        'lineColor': '#039a00'
      }, {
        'id': 'line2',
        'name': 'line2',
        'type': 'area',
        'data': [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        'color': 'transparent',
        'lineColor': '#004e0a'
      }, {
        'id': 'line3',
        'name': 'line3',
        'type': 'area',
        'data': [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        'color': 'transparent',
        'lineColor': '#707070'
      }, {
        'id': 'line4',
        'name': 'line4',
        'type': 'area',
        'data': [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        'color': '#ff0000',
        'lineColor': '#3b0b0b'
      }, {
        'id': 'line5',
        'name': 'line5',
        'type': 'area',
        'data': [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        'color': 'transparent',
        'lineColor': '#701a1d'
      }, {
        'id': 'hideLine',
        'name': 'hideLine',
        'type': 'line',
        'data': [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        'color': 'transparent'
      }, {
        'id': 'guide',
        'name': 'guide',
        'type': 'flags',
        'data': [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        'style': {
          width: 10,
          height: 10
        }
      }
    ],
    plotOptions: {
      flags: {
        'animation': typeof animation !== "undefined" && animation !== null ? animation : true,
        'style': {
          display: 'none'
        }
      },
      candlestick: {
        'color': '#3F3',
        'lineColor': '#3F3',
        'upColor': '#FF2D19',
        'upLineColor': '#FF2D19',
        'animation': typeof animation !== "undefined" && animation !== null ? animation : true
      },
      area: {
        'stacking': 'normal',
        'lineColor': '#666666',
        'lineWidth': 1,
        'marker': {
          lineWidth: 1,
          lineColor: '#666666'
        },
        'enableMouseTracking': false,
        'animation': typeof animation !== "undefined" && animation !== null ? animation : true
      },
      series: {
        'fillOpacity': 0.1,
        'threshold': null,
        'animation': typeof animation !== "undefined" && animation !== null ? animation : true
      }
    }
  };

  $('.js-no-tip').click(function() {
    var j, yui;
    document.cookie = 'name=' + window.encodeURI('true');
    $(this).closest('div.js-taiji-sec').css('display', 'none');
    $('div.js-loading-timer').css('display', 'block');
    $('body').addClass('bodyColor');
    j = 3;
    return yui = setInterval((function() {
      var taijiChart;
      if (j === 0) {
        $('.count-downgo').css('display', 'block');
      }
      if (j === -1) {
        $('div.js-loading-timer').css('display', 'none');
        $('div.js-taiji-line').css('display', 'block');
        $('body').removeClass('bodyColor');
        clearInterval(yui);
        taijiChart = new Highcharts.Chart(option);
      } else {
        $('.count-down' + (j + 1)).css('display', 'none');
        $('.count-down' + j).css('display', 'block');
      }
      j--;
    }), 1000);
  });

  $(function() {
    var bodyWidth, currentDevWidth;
    bodyWidth = parseFloat($('html').width());
    currentDevWidth = bodyWidth * 100 / 320;
    $('html').css('font-size', currentDevWidth);
    setTimeout((function() {
      fadeIn('index-bodybg', 10);
      $('.index-bodybg').css('display', 'none');
      $('div.js-paly-intro').css('display', 'block');
    }), 1000);
  });

}).call(this);
