// Generated by CoffeeScript 1.8.0
var DataCollections, arr, bugFix, chart, createView, fadeIn, fadeOut, limit, playGamePage, start, subArrays;

window.unit = '';

limit = 5;

start = 0;

subArrays = [];

arr = [0, 0, 0, 0, 0];

Array.prototype.filterArray = function(index, lineNo) {
  return this.map(function(item) {
    return item[index];
  });
};

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

DataCollections = {
  getData: function(_arg, next) {
    var limit, sid, tradedate;
    sid = _arg.sid, limit = _arg.limit, tradedate = _arg.tradedate;
    return next(null, this.toOHLC(ohlcDataCache["" + tradedate + "," + limit]));
  },
  ma: function(arr, n) {
    return arr.map(function(p, i) {
      var j, s, _i;
      s = 0;
      for (j = _i = 0; 0 <= n ? _i < n : _i > n; j = 0 <= n ? ++_i : --_i) {
        if (i >= j) {
          s += arr[i - j][1];
        }
      }
      s /= i >= n - 1 ? n : 1 + i;
      return [p[0], s];
    });
  },
  taiji: function(arr) {
    var cyc21, line1, line2, line3, line4, line5, x, y, _i, _len, _ref, _ref1;
    _ref = [[], [], [], [], []], line1 = _ref[0], line2 = _ref[1], line3 = _ref[2], line4 = _ref[3], line5 = _ref[4];
    cyc21 = this.ma(arr, 4);
    for (_i = 0, _len = cyc21.length; _i < _len; _i++) {
      _ref1 = cyc21[_i], x = _ref1[0], y = _ref1[1];
      line1.push([x, y * (0.0618 / 8.27 - 0.0382 / 10.27)]);
      line2.push([x, y * 0.0382 / 10.27]);
      line3.push([x, y * 0.0382 / 10.27]);
      line4.push([x, y * (0.0618 / 8.27 - 0.0382 / 10.27)]);
      line5.push([x, y * (1 - 0.0618 / 8.27)]);
    }
    return {
      line1: line1,
      line2: line2,
      line3: line3,
      line4: line4,
      line5: line5
    };
  },
  taijiGuide: function(taijiData, guide) {
    return taijiData.line5.map(function(item, i) {
      var count, operation;
      count = 0;
      operation = guide[dataCollections.dateString(item[0])];
      if (operation === 'buy') {
        return {
          x: item[0] * 1,
          y: item[1] * 1,
          title: '',
          dataLabels: {
            x: -1,
            enabled: true,
            useHTML: true,
            verticalAlign: 'middle',
            formatter: function() {
              return "<img class='blink" + (count++) + "' width='" + Resource.buyIcon.width + "' height='" + Resource.buyIcon.height + "' src='" + Resource.buyIcon.src + "'>";
            }
          }
        };
      } else if (operation === 'sell') {
        return {
          x: item[0] * 1,
          y: item[1] / (1 - 0.0618 / 8.27) * (1 + 0.0618 / 8.27),
          title: '',
          dataLabels: {
            x: -1,
            enabled: true,
            useHTML: true,
            verticalAlign: 'middle',
            formatter: function() {
              return "<img class='blink" + (count++) + "' width='" + Resource.sellIcon.width + "' height='" + Resource.sellIcon.height + "' src='" + Resource.sellIcon.src + "'>";
            }
          }
        };
      } else {
        return {
          x: item[0] * 1
        };
      }
    });
  },
  getHideLineData: function(olhc) {
    return olhc.map(function(item) {
      return [item[0], item[1]];
    });
  },
  toOHLC: function(res) {
    var i, k, output, price, xData;
    if (res === !null) {
      return output = (function() {
        var _i, _j, _len, _len1, _ref, _ref1, _results;
        _ref = res.datas;
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          price = _ref[i];
          xData = this.stingtime(price.tradedate);
          _ref1 = ['open', 'high', 'low', 'close'];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            k = _ref1[_j];
            if (+price[k] === 0) {
              price[k] = res.datas[i - 1][k];
            }
          }
          _results.push([xData, price.open, price.high, price.low, price.close]);
        }
        return _results;
      }).call(this);
    }
  },
  stringtime: function(s) {
    return Date.UTC(s.slice(0, 4), s.slice(4, 6) * 1 - 1, s.slice(6, 8), s.slice(9, 11), s.slice(12, 14), s.slice(15, 17));
  },
  datastring: function(date) {
    var s;
    s = (new date(date)).toISOString();
    return s.slice(0, 4) + s.slice(5, 7) + s.slice(8, 10) + ' ' + s.slice(11, 19);
  },
  ratepercent: function(rate) {
    return (100 * rate).toFixed(2) + '%';
  }
};

chart = {
  maxInOneScreen: 30,
  renderPoints: function(_arg) {
    var onEnd, renderPointTimer;
    onEnd = _arg.onEnd;
    return renderPointTimer = setInterval((function(_this) {
      return function() {
        if (++_this.current <= _this.maxInOneScreen) {
          return _this.nextPoint(_this.current, false, false);
        } else if (_this.current > _this.maxInOneScreen && _this.current < _this.total) {
          _this.chart.get('hideLine').addPoint(_this.hideLineData[_this.current + 1], false, true);
          return _this.nextPoint(_this.current, true, true);
        } else {
          clearInterval(renderPointTimer);
          --_this.current;
          return typeof onEnd === "function" ? onEnd() : void 0;
        }
      };
    })(this), 1500);
  },
  init: function(parameters) {
    var option, taijiChart;
    option = {
      chart: {
        backgroundColor: 'black',
        renderTo: parameters.renderTo,
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
          return "<div style='position: absolute; top:40%; border-color: transparent green transparent transparent; border-style: dashed dashed solid dashed; border-width: 8px'>" + "<div style='position: absolute; border-color: transparent green transparent transparent; border-style: dashed dashed solid dashed; border-width:8px; top: -8px; left: -6px;'></div>" + "<div></div></div><div style='position: relative; left: 16px; background: #084c1c; border: 2px solid green; border-radius: 10px; padding: 8px; font-size: 16px; display: block'>" + "<span style='color: white; display: block;'>行情进入了绿色" + "<br/>" + "区域，太极线发出" + "<br/>" + "下跌信号，请点击</span>" + "<span style='color: #00f901; display: block'>\"卖出平仓\"</span></div>";
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
      exporting: {
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
          'data': this.parameters.ohlcData.slice(0, +this.parameters.current + 1 || 9e9)
        }, {
          'id': 'line1',
          'name': 'line1',
          'type': 'area',
          'data': this.parameters.taijiData.line1.slice(0, +this.parameters.current + 1 || 9e9),
          'color': '#00ff00',
          'lineColor': '#039a00'
        }, {
          'id': 'line2',
          'name': 'line2',
          'type': 'area',
          'data': this.parameters.taijiData.line2.slice(0, +this.parameters.current + 1 || 9e9),
          'color': 'transparent',
          'lineColor': '#004e0a'
        }, {
          'id': 'line3',
          'name': 'line3',
          'type': 'area',
          'data': this.parameters.taijiData.line3.slice(0, +this.parameters.current + 1 || 9e9),
          'color': 'transparent',
          'lineColor': '#707070'
        }, {
          'id': 'line4',
          'name': 'line4',
          'type': 'area',
          'data': this.parameters.taijiData.line4.slice(0, +this.parameters.current + 1 || 9e9),
          'color': '#ff0000',
          'lineColor': '#3b0b0b'
        }, {
          'id': 'line5',
          'name': 'line5',
          'type': 'area',
          'data': this.parameters.taijiData.line5.slice(0, +this.parameters.current + 1 || 9e9),
          'color': 'transparent',
          'lineColor': '#701a1d'
        }, {
          'id': 'hideLine',
          'name': 'hideLine',
          'type': 'line',
          'data': this.parameters.hideLineData.slice(0, +this.maxInOneScreen + 1 || 9e9),
          'color': 'transparent'
        }, {
          'id': 'guide',
          'name': 'guide',
          'type': 'flags',
          'data': this.parameters.guideData.slice(0, +this.parameters.current + 1 || 9e9),
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
    return taijiChart = new Highcharts.Chart(option);
  }
};

playGamePage = {
  page: $('.js-taiji-line'),
  chartContainer: $('.js-taiji-line .container'),
  init: function() {
    var guideOperation, tradedate, _ref;
    _ref = Resource.gameSeries[Math.floor(Math.random() * Resource.gameSeries.length)], tradedate = _ref.tradedate, limit = _ref.limit, guideOperation = _ref.guideOperation;
    return DataCollections.getData({
      sid: 'TPME.XAGUSD',
      limit: limit,
      tradedate: tradedate
    }, (function(_this) {
      return function(err, resultData) {
        var closeData, guideData, taijiData;
        if (resultData === !null) {
          closeData = resultData.map(function(item) {
            return [item[0] * 1, item[4] * 1];
          });
          taijiData = dataCollections.taiji(closeData);
          guideData = dataCollections.taijiGuide(taijiData, guideOperation);
          chart.init({
            resultData: resultData,
            taijiData: taijiData,
            guideData: guideData,
            renderTo: _this.chartContainer
          });
          return chart.renderPoints({
            onEnd: function() {
              $('#buy-in, #sell-out, #close-buy, #close-sell').hide();
              $('.play-game-tips').hide();
              return createView.navigatorTo('taiji-complete-page');
            }
          });
        }
      };
    })(this));
  }
};

bugFix = {
  need: null,
  repaint: function() {
    if (this.need) {
      document.body.style.display = 'none';
      return setTimeout(function() {
        return document.body.style.display = '';
      }, 0);
    }
  }
};

createView = {
  container: $('[current-view]'),
  navigatorTo: function(view, data) {
    var page;
    this.container.attr('current-view', view);
    page = view.replace(/-(\w)/g, function(whole, x) {
      return x.toUpperCase();
    });
    exports[page].init(data);
    return bugFix.repaint();
  }
};

$('.js-no-tip').click(function() {
  document.cookie = 'name=' + window.encodeURI('true');
  $(this).closest('div.js-taiji-sec').css('display', 'none');
  return window.showLineWithTime();
});

$('.formulas-btn1').click(function() {});

$('.js-close-btn').click(function() {
  $(this).closest('div.js-taiji-sec').css('display', 'none');
  return window.showLineWithTime();
});

window.addEventListener("showLine", function() {
  window.removeEventListener("showLine");
  return window.showLineWithTime();
}, false);

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

window.showLineWithTime = function() {
  var j, yui;
  $('div.js-loading-timer').css('display', 'block');
  $('body').addClass('bodyColor');
  j = 3;
  return yui = setInterval((function() {
    if (j === 0) {
      $('.count-downgo').css('display', 'block');
    }
    if (j === -1) {
      $('div.js-loading-timer').css('display', 'none');
      $('div.js-taiji-line').css('display', 'block');
      $('body').removeClass('bodyColor');
      clearInterval(yui);
      playGamePage.init();
    } else {
      $('.count-down' + (j + 1)).css('display', 'none');
      $('.count-down' + j).css('display', 'block');
    }
    j--;
  }), 1000);
};
