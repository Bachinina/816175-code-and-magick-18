'use strict';
(function () {
  // Параметры модального окна
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_GAP = 25;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var SHADOW_INDENT = 10;

  // Параметры гистограммы
  var BAR_WIDTH = 40;
  var BAR_MAX_HEIGHT = 150;
  var BAR_INDENT = 5;
  var BAR_GAP = 50;

  // Параметры текста
  var FONT_SIZE = 16;
  var lineHeight = FONT_SIZE + 5;

  // Функция для отрисовки модального окна
  var renderCloud = function (ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  // Генерация синего цвета разной насыщенности
  var generateRandomColor = function () {
    return '#0000' + Math.floor(Math.random() * (99 - 11) + 11);
  };


  window.renderStatistics = function (ctx, names, times) {
    // 1. Отрисовка тени
    renderCloud(ctx, CLOUD_X + SHADOW_INDENT, CLOUD_Y + SHADOW_INDENT, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');

    // 2. Отрисовка модального окна
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

    // 3. Вывод текста сообщения
    ctx.fillStyle = '#000';
    ctx.font = FONT_SIZE + 'px ' + 'PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура, вы победили!', CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP);
    ctx.fillText('Список результатов:', CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP + lineHeight);

    // 4. Вывод статистики

    // 4.1 Поиск максимального результата
    var maxResult = window.utils.getMaxValue(times);

    for (var i = 0; i < names.length; i++) {

      // 4.2 Составление пропорции для расчета высоты столбца
      var barHeight = Math.floor(times[i] * BAR_MAX_HEIGHT / maxResult);

      // 4.3 Отрисовка столбца
      ctx.fillStyle = generateRandomColor();

      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      }

      ctx.fillRect(CLOUD_X + CLOUD_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - CLOUD_GAP - barHeight, BAR_WIDTH, barHeight);

      // 4.4 Вывод результата (значения)
      ctx.textBaseline = 'bottom';
      ctx.font = 12 + 'px ' + 'PT Mono';
      ctx.fillText(Math.floor(times[i]), CLOUD_X + CLOUD_GAP + (BAR_WIDTH + BAR_GAP) * i + BAR_INDENT, CLOUD_Y + CLOUD_HEIGHT - CLOUD_GAP - barHeight - BAR_INDENT);

      // 4.5 Вывод имени
      ctx.fillStyle = '#fff';
      ctx.textBaseline = 'bottom';
      ctx.font = 10 + 'px ' + 'PT Mono';
      ctx.fillText(names[i], CLOUD_X + CLOUD_GAP + (BAR_WIDTH + BAR_GAP) * i + BAR_INDENT, CLOUD_Y + CLOUD_HEIGHT - CLOUD_GAP - BAR_INDENT);
    }
  };
})();
