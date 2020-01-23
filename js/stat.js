'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var HISTOGRAM_HEIGHT = 150;
var HISTOGRAM_COLUMN = 40;
var HISTOGRAM_INTERVAL = 50;
var HISTOGRAM_X = CLOUD_X + GAP * 2;
var START_POSITION_HISTAGRAM = (CLOUD_Y + CLOUD_HEIGHT) / 3;

var fontFamily = 'PT Mono';
var fontSize = '16px';
var textColor = '#000000';

// Функция отрисовки облака

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Функция отрисовки текста

var renderText = function (ctx, text, x, y, maxWidth) {
  maxWidth = CLOUD_WIDTH;
  ctx.fillStyle = textColor;
  ctx.font = fontSize + ' ' + fontFamily;
  ctx.fillText(text, x, y, maxWidth);
};

// Функция генерации случайного числа

var getRandomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

// Максимальный элемент массива

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// Функция отрисовки столбцов

var getRenderColumn = function () {
  var lastPositionPointX = 0;
  var currentIterationNumber = 0;

  return function (ctx, userName, userTime, maxUserTime) {
    ctx.fillStyle = textColor;

    var currentColumnHeight = (HISTOGRAM_HEIGHT * userTime) / maxUserTime;
    var startPositionColumn = START_POSITION_HISTAGRAM + (HISTOGRAM_HEIGHT - currentColumnHeight);
    var endPositionColumn = startPositionColumn + GAP + currentColumnHeight;

    lastPositionPointX = (currentIterationNumber === 0) ? HISTOGRAM_X : HISTOGRAM_COLUMN + HISTOGRAM_INTERVAL + lastPositionPointX;

    ctx.fillText(userTime, lastPositionPointX, START_POSITION_HISTAGRAM);
    ctx.fillText(userName, lastPositionPointX, endPositionColumn + GAP * 2);

    ctx.fillStyle = (userName === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsla(240, ' + getRandomInteger(0, 100) + '%, 50%, 1)';
    ctx.fillRect(lastPositionPointX, startPositionColumn + GAP, HISTOGRAM_COLUMN, currentColumnHeight);

    ++currentIterationNumber;
  };
};

// Функция отрисовки результата игрока


var renderHistogram = function (ctx, usersNames, usersTimes) {
  var maxUserTime = Math.round(getMaxElement(usersTimes));

  var renderColumn = getRenderColumn();
  for (var i = 0; i < usersNames.length; i++) {
    renderColumn(ctx, usersNames[i], Math.round(usersTimes[i]), maxUserTime);
  }
};

// Вывод статистики при успешном завершении игры

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  renderText(ctx, 'Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP * 4);
  renderText(ctx, 'Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP * 6);
  renderHistogram(ctx, names, times);
};
