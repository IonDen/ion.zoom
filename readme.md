# Ion.Zoom 1.2

> English description

Easy and light image lightbox. <a href="http://ionden.com/a/plugins/ion.zoom/en.html">Project page and demos</a>

Download: <a href="http://ionden.com/a/plugins/ion.zoom/ion.zoom-1.2.zip">ion.zoom-1.2.zip</a>

***

## Description
ion.zoom — easy image lightbox jQuery plugin for small galleries. Allow to zoom images at place.<br />
Also supprort keyboard controls with ESC, LEFT and RIGHT button.<br />
Supports multiple independently operating galleries in one page.<br />
Works on touch screen devices (iPhone, iPad, etc.).<br />
Ion.Zoom is freely distributed under <a href="http://ionden.com/a/licence-en.html" target="_blank">MIT licence</a>.


## Dependencies
* <a href="http://jquery.com/" target="_blank">jQuery 1.9+</a>

## Using script

Import this libraries:
* jQuery
* ion.zoom.min.js

And CSS:
* normalize.min.css - desirable if you have not yet connected one
* ion.zoom.css

Create gallery:
```html
<a href="static/img/zoom/zoom-big-01.jpg" class="gallery_1"><img src="static/img/zoom/zoom-small-01.jpg" alt="" /></a>
<a href="static/img/zoom/zoom-big-02.jpg" class="gallery_1"><img src="static/img/zoom/zoom-small-02.jpg" alt="" /></a>
<a href="static/img/zoom/zoom-big-03.jpg" class="gallery_1"><img src="static/img/zoom/zoom-small-03.jpg" alt="" /></a>
```

Initialize gallery:
```javascript
$(".gallery_1").ionZoom();
```

Or initialize gallery with custom settings:
```javascript
$(".gallery_2").ionZoom({
    visibleControls: false                      // disable visible controls
});
```

## Public methods:

Close gallery:
```javascript
$(".gallery_1").ionZoom("close");
```

## Update history
* 08.06.2013 - v1.2: visual controls, multiple galleries, public methods, code optimisations


<br />
<br />
***
<br />
<br />


> Описание на русском

Удобный легкий слайдер диапазонов. <a href="http://ionden.com/a/plugins/ion.rangeSlider/">Страница проекта и демо</a>

Скачать: <a href="http://ionden.com/a/plugins/ion.rangeSlider/ion.rangeSlider-1.2.zip">ion.rangeSlider-1.2.zip</a>

***

## Описание
ion.zoom — быстрый и легкий лайтбокс плагин для небольших галерей. Позволяет увеличивать картинки на месте.<br />
Помимо управления мышью поддерживает так же управление с клавиатуры с помощью клавиш ESC, LEFT и RIGHT.<br />
Поддерживает несколько независимо работающих галерей на одной странице.<br />
Плагин поддерживает устройства с touch-экраном (iPhone, iPad, etc.).<br />
Ion.Zoom свободно распространяется на условиях <a href="http://ionden.com/a/licence.html" target="_blank">лицензии MIT</a>.


## Зависимости
* <a href="http://jquery.com/" target="_blank">jQuery 1.9+</a>


## Подключение

Подключаем библиотеки:
* jQuery
* ion.zoom.min.js

И CSS:
* normalize.min.css - желательно, если он у вас еще не подключен
* ion.zoom.css

Создаем галерею:
```html
<a href="static/img/zoom/zoom-big-01.jpg" class="gallery_1"><img src="static/img/zoom/zoom-small-01.jpg" alt="" /></a>
<a href="static/img/zoom/zoom-big-02.jpg" class="gallery_1"><img src="static/img/zoom/zoom-small-02.jpg" alt="" /></a>
<a href="static/img/zoom/zoom-big-03.jpg" class="gallery_1"><img src="static/img/zoom/zoom-small-03.jpg" alt="" /></a>
```

Инициализируем галерею:
```javascript
$(".gallery_1").ionZoom();
```

Или инициализируем галерею с настройками:
```javascript
$(".gallery_2").ionZoom({
    visibleControls: false                      // отключить визуальные элементы управления
});
```

## Публичные методы:

Закрыть галерею:
```javascript
$(".gallery_1").ionZoom("close");
```

## Update history
* 08.06.2013 - v1.2: визуальыне элементы управления, несколько галерей на странице, публичные методы, оптимизация кода