// Ion.Zoom
// version 1.0.29
// © 2013 Denis Ineshin | IonDen.com
//
// Project page:    http://ionden.com/a/plugins/ion.zoom/
// GitHub page:     https://github.com/IonDen/ion.zoom
//
// Released under MIT licence:
// http://ionden.com/a/licence.html
// =====================================================================================================================

(function($){
    $.fn.ionZoom = function(options){
        var gallery = this;
        var container = null;
        var image = null;

        var settings = $.extend({
            //
        }, options);

        var func = {
            init: function(){
                var self = this;

                this.isOpend = false;
                this.isAnimate = false;
                this.current = null;
                this.link = "";
                this.newCurrent = null;
                this.newLink = "";
                this.num = gallery.length;

                this.currentSize = {};
                this.body = $(document.body);

                gallery.on("click", function(e){
                    e.preventDefault();
                    if(self.isOpend) {
                        self.newCurrent = $(this);
                        self.newLink = $(this).prop("href");
                        self.closeCurrent(true);
                    } else {
                        self.current = $(this);
                        self.link = $(this).prop("href");
                        self.getSize();
                    }
                });

                $(document.body).on("keydown", function(e){
                    if(e.which == 27 && self.isOpend) { // ESC button
                        self.closeCurrent();
                    }
                    if(e.which == 37 && self.isOpend && !self.isAnimate) { // LEFT button
                        var prev = self.current.prev();
                        if(!prev.length) prev = gallery.eq(self.num - 1);
                        self.newCurrent = prev;
                        self.newLink = prev.prop("href");
                        self.closeCurrent(true);
                    }
                    if(e.which == 39 && self.isOpend && !self.isAnimate) { // RIGHT button
                        var next = self.current.next();
                        if(!next.length) next = gallery.eq(0);
                        self.newCurrent = next;
                        self.newLink = next.prop("href");
                        self.closeCurrent(true);
                    }
                });

                this.prepare();
            },
            prepare: function(){
                var self = this;

                var _html =  '<div class="ion-zoom-preloader" id="ion-zoom-preloader"></div>';
                    _html += '<div class="ion-zoom-image" id="ion-zoom-image"></div>';
                this.body.append(_html);

                this.preloader = $("#ion-zoom-preloader");
                container = $("#ion-zoom-image");

                container.on("click", function(){
                    self.closeCurrent();
                });
            },
            getSize: function(){
                var _ds = {
                    linkBorder: parseInt(this.current.css("border-left-width")),
                    linkPadding: parseInt(this.current.css("padding-left")),
                    imgBorder: parseInt(this.current.children("img").css("border-left-width")),
                    imgPadding: parseInt(this.current.children("img").css("padding-left"))
                };
                var _mod1 = _ds.linkBorder + _ds.linkPadding;
                var _mod2 = _ds.imgBorder + _ds.imgPadding;

                this.baseSize = {
                    x: this.current.offset().left + _mod1 + _mod2,
                    y: this.current.offset().top + _mod1 + _mod2,
                    w: this.current.width() - (_mod2 * 2),
                    h: this.current.height() - (_mod2 * 2)
                };

                this.showPreloader();
                this.loadImage();
            },
            showPreloader: function(){
                var _x = this.baseSize.x + (this.baseSize.w / 2);
                var _y = this.baseSize.y + (this.baseSize.h / 2);
                this.preloader.css("top", _y).css("left", _x);
            },
            loadImage: function(){
                var self = this;

                container.append('<img src="' + this.link + '" />');
                image = container.children("img");

                image.on("load", function(){
                    self.currentSize.w = image.width();
                    self.currentSize.h = image.height();
                    self.placeImage();
                });
            },
            placeImage: function(){
                this.preloader.css("top","-9999px").css("left","-9999px");
                image.width(this.baseSize.w).height(this.baseSize.h);
                container.width(this.baseSize.w).height(this.baseSize.h);
                container.css("left", this.baseSize.x).css("top", this.baseSize.y);

                this.prepareZoom();
            },
            prepareZoom: function(){
                var screenWidth = $(window).innerWidth() - 40;
                var screenHeight = $(window).innerHeight() - 40;
                var scrollTop = $(window).scrollTop();
                var ratio = this.currentSize.h / this.currentSize.w;

                var _x = this.baseSize.x + (this.baseSize.w / 2) - (this.currentSize.w / 2);
                var _y = this.baseSize.y + (this.baseSize.h / 2) - (this.currentSize.h / 2);

                var _w = this.currentSize.w;
                var _h = this.currentSize.h;

                if(_w > screenWidth) {
                    _w = screenWidth;
                    _h = screenWidth * ratio;
                    _x = this.baseSize.x + (this.baseSize.w / 2) - (_w / 2);
                }
                if(_h > screenHeight) {
                    _h = screenHeight;
                    _w = screenHeight / ratio;
                    _x = this.baseSize.x + (this.baseSize.w / 2) - (_w / 2);
                }
                if(_x + _w > screenWidth) {
                    _x = screenWidth - _w - 20;
                }
                if(_y + _h > 20 + scrollTop + screenHeight) {
                    _y = scrollTop + screenHeight - _h;
                }

                if(_x < 20) _x = 20;
                if(_y < scrollTop + 20) _y = scrollTop + 20;

                this.zoom(_x, _y, _w, _h, false, false);
            },
            closeCurrent: function(isNext){
                if(isNext) this.zoom(this.baseSize.x, this.baseSize.y, this.baseSize.w, this.baseSize.h, true, true);
                else this.zoom(this.baseSize.x, this.baseSize.y, this.baseSize.w, this.baseSize.h, true, false);
            },
            zoom: function(x, y, w, h, isEnd, isNext){
                var self = this;
                this.isAnimate = true;

                container.stop().animate(
                    {
                        left: x,
                        top: y,
                        width: w,
                        height: h
                    },
                    {
                        step: function(now, fx){
                            if(fx.prop == "width") image.width(now + "px");
                            if(fx.prop == "height") image.height(now + "px");
                        },
                        duration: 300,
                        complete: function(){
                            if(isEnd) {
                                self.hideOld();
                                if(isNext) self.setNew();
                            }
                            else self.isOpend = true;
                            self.isAnimate = false;
                        }
                    }
                );
            },
            setNew: function(){
                this.current = this.newCurrent;
                this.link = this.newLink;
                this.getSize();
            },
            hideOld: function(){
                container.css("top","-9999px").css("left","-9999px");
                container.width("0px").height("0px");
                container.html("");
                this.isOpend = false;
            }
        };

        func.init();
    };
})(jQuery);

