'use strict';

var CLOUD_WIDTH = 420; // ширина облака
var CLOUD_HEIGHT = 270; // высота облака

var CLOUD_X = 100; // координата -----горизонталь-----
var CLOUD_Y = 10; // координата -------вертикаль----------
var SHADOW_X = CLOUD_X + 10; // отступ для тени X
var SHADOW_Y = CLOUD_Y + 10; // отступ для тени Y

var MAIN_TEXT_X = CLOUD_X + 20; // отступ слева для текста
var MAIN_TEXT_LINE1_Y = CLOUD_Y + 30; // отступ в тексте 1 строка
var MAIN_TEXT_LINE2_Y = MAIN_TEXT_LINE1_Y + 20; // отступ в тексте 2 строка

// Гистограмма X
var HIST_X = CLOUD_X + 50;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var HIST_OFFSET = BAR_WIDTH + BAR_GAP;

// Гистограмма Y
var HIST_Y = CLOUD_Y + 80;
var BAR_MAX_HEIGHT = 130;
var HIST_SCORES_GAP = 10;

var BAR_START_Y = HIST_Y + HIST_SCORES_GAP; // Начало столбика сверху (10 отступ на очки)
var HIST_NAMES_Y = HIST_Y + BAR_MAX_HEIGHT + HIST_SCORES_GAP + 20; // отступ сверху для имени


var arrayMax = function (a) {
  var result = -1;
  for (var i = 0; i < a.length; i++) {
    if (a[i] > result) {
      result = a[i];
    }
  }
  return result;
};

window.renderStatistics = function (ctx, names, times) {

  var i;

  // тень
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(SHADOW_X, SHADOW_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  // облако
  ctx.fillStyle = '#fff';
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  // Обводка
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  // Шрифт
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', MAIN_TEXT_X, MAIN_TEXT_LINE1_Y);
  ctx.fillText('Список результатов:', MAIN_TEXT_X, MAIN_TEXT_LINE2_Y);

  // вычисление миллисекунд
  var maxTime = arrayMax(times);
  var ms2px = BAR_MAX_HEIGHT / maxTime;

  // вычисление имен
  for (i = 0; i < names.length; i++) {
    var barHeight = times[i] * ms2px;
    var extraVerticalGap = BAR_MAX_HEIGHT - barHeight; // магический отступ что бы столюики сместились вниз

    // пишем миллисекунды
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), HIST_X + (i * HIST_OFFSET), HIST_Y + extraVerticalGap);

    // Рандом столбиков
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(252.1, ' + Math.round(Math.random() * 100) + '%, 34.1%)';
    }

    // столбики
    ctx.fillRect(HIST_X + (i * HIST_OFFSET), BAR_START_Y + extraVerticalGap, BAR_WIDTH, barHeight);

    // пишем имена
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], HIST_X + (i * HIST_OFFSET), HIST_NAMES_Y);
  }
};
