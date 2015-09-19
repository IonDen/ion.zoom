![ion.zoom](_tmp/logo-ion-zoom.png)

> English description | <a href="readme.ru.md">Описание на русском</a>

Easy and light image lightbox for small galleries.

***

* Version: 1.2.0
* <a href="http://ionden.com/a/plugins/ion.zoom/en.html">Project page and demos</a>
* <a href="http://ionden.com/a/plugins/ion.zoom/ion.zoom-1.2.zip">Download ZIP</a>

[![](https://pledgie.com/campaigns/25694.png?skin_name=chrome)](https://pledgie.com/campaigns/25694)

## Description
* ion.zoom — easy image lightbox jQuery plugin for small galleries. Allow to zoom images at place.<br />
* Supports keyboard controls with ESC, LEFT and RIGHT button.<br />
* Supports multiple independently operating galleries in one page.<br />
* Crossbrowser: Google Chrome, Mozilla Firefox, Opera, Safari, IE(8.0+)<br />
* Works on touch screen devices (iPhone, iPad, etc.).<br />
* Ion.Zoom is freely distributed under <a href="http://ionden.com/a/plugins/licence-en.html" target="_blank">MIT licence</a>.


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

### <a href="history.md">Update history</a>

***

Support the plugin:

[![](https://pledgie.com/campaigns/25694.png?skin_name=chrome)](https://pledgie.com/campaigns/25694)
