![ion.zoom](_tmp/logo-ion-zoom.png)

> <a href="readme.md">English description</a> | Описание на русском

Быстрый и легкий лайтбокс плагин для небольших галерей.

***

* Версия: 1.2.0
* <a href="http://ionden.com/a/plugins/ion.rangeSlider/">Страница проекта и демо</a>
* <a href="http://ionden.com/a/plugins/ion.rangeSlider/ion.rangeSlider-1.2.zip">Скачать ZIP-архив</a>

## Описание
* ion.zoom — быстрый и легкий лайтбокс плагин для небольших галерей. Позволяет увеличивать картинки на месте.<br />
* Помимо управления мышью поддерживает так же управление с клавиатуры с помощью клавиш ESC, LEFT и RIGHT.<br />
* Поддерживает несколько независимо работающих галерей на одной странице.<br />
* Кроссбраузерная поддержка: Google Chrome, Mozilla Firefox, Opera, Safari, IE(8.0+)<br />
* Плагин поддерживает устройства с touch-экраном (iPhone, iPad, etc.).<br />
* Ion.Zoom свободно распространяется на условиях <a href="http://ionden.com/a/plugins/licence.html" target="_blank">лицензии MIT</a>.


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

### <a href="history.md">История обновлений</a>

***

#### Поддержите разработку плагинов серии Ion:

* Пожертвовать через сервис Pledgie: [![](https://pledgie.com/campaigns/25694.png?skin_name=chrome)](https://pledgie.com/campaigns/25694)

* Пожертвовать напрямую через Paypal: https://www.paypal.me/IonDen

* Пожертвовать напрямую через Яндекс.Деньги: http://yasobe.ru/na/razrabotku
