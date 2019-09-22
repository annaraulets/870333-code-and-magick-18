'use strict';

var CLOUD_WIDTH = 420; // ширина облака
var CLOUD_HEIGHT = 270; // высота облака
var CLOUD_GAP_TOP = 10; // отступ в облаке
var SHADOW_GAP_LEFT = 110; // отступ слева для тени
var SHADOW_GAP_TOP = 20; // отступ сверху для тени
var TEXT_GAP_LEFT = 120; // отступ слева для текста
var TEXT_LINE1 = 40; // отступ в тексте 1 строка
var TEXT_LINE2 = 60; // отступ в тексте 2 строка
var TEXT_GAP = 100; // отступ для текста слева
var HIST_GAP = 150; // отступ для имен слева
var HIST_OFFSET = 90; // отступ между колонок для имен
var TOP_GAP_NAME = 260; // отступ сверху для имени
var TOP_GAP_SEC = 90; // отступ сверху для милисекунд
var HIST_MAX_HEIGHT = 130;


window.renderStatistics = function (ctx, names, times) {

  var i;

  // тень
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(SHADOW_GAP_LEFT, SHADOW_GAP_TOP, CLOUD_WIDTH, CLOUD_HEIGHT);

  // облако
  ctx.fillStyle = '#fff';
  ctx.fillRect(TEXT_GAP, CLOUD_GAP_TOP, CLOUD_WIDTH, CLOUD_HEIGHT);

  // Обводка
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(TEXT_GAP, CLOUD_GAP_TOP, CLOUD_WIDTH, CLOUD_HEIGHT);

  // Шрифт
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', TEXT_GAP_LEFT, TEXT_LINE1);
  ctx.fillText('Список результатов:', TEXT_GAP_LEFT, TEXT_LINE2);

  // вычисление миллисекунд
  var maxTime = -1;
  for (i = 0; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }

  var ms2px = HIST_MAX_HEIGHT / maxTime;

  // вычисление имен
  for (i = 0; i < names.length; i++) {
    var barHeight = times[i] * ms2px;
    var extraVerticalGap = HIST_MAX_HEIGHT - barHeight;

    // пишем миллисекунды
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), HIST_GAP + i * HIST_OFFSET, TOP_GAP_SEC + extraVerticalGap);

    // Рандом столбиков
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(252.1, ' + Math.round(Math.random() * 100) + '%, 34.1%)';
    }

    // столбики
    ctx.fillRect(HIST_GAP + i * HIST_OFFSET, 100 + extraVerticalGap, 40, barHeight);

    // пишем имена
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], HIST_GAP + i * HIST_OFFSET, TOP_GAP_NAME);
  }
};
