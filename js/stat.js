'use strict';

window.stat = (function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 16;
  var BAR_GAP = 50;
  var BAR_WIDTH = 40;
  var BAR_HEIGHT_MAX = 150;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + CLOUD_HEIGHT);
    ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
    ctx.lineTo(x + CLOUD_WIDTH, y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';

    ctx.font = '16px PT Mono';

    ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2 + FONT_GAP);
    ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2 + FONT_GAP + GAP + FONT_GAP);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {
      ctx.fillStyle = '#000';
      ctx.fillText(players[i], CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP);
      ctx.fillText(Math.trunc(times[i]), CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - GAP * 2 - (BAR_HEIGHT_MAX * times[i]) / maxTime + GAP);

      if (players[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        var saturation = (Math.round(Math.random() * 100)) + '%';
        var hsl = 'hsl(240, ' + saturation + ', 50%)';
        ctx.fillStyle = hsl;
      }
      ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - GAP * 2 - (BAR_HEIGHT_MAX * times[i]) / maxTime + GAP + FONT_GAP, BAR_WIDTH, (BAR_HEIGHT_MAX * times[i]) / maxTime - GAP - FONT_GAP - GAP * 2);
    }
  };
})();
