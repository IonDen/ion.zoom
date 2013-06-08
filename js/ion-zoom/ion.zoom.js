// Ion.Zoom
// version 1.2.63
// © 2013 Denis Ineshin | IonDen.com
//
// Project page:    http://ionden.com/a/plugins/ion.zoom/
// GitHub page:     https://github.com/IonDen/ion.zoom
//
// Released under MIT licence:
// http://ionden.com/a/licence.html
// =====================================================================================================================

(function($){
    var pluginCount = 0;

    var zoomHTML =  '<div class="ion-zoom-preloader"></div>';
        zoomHTML += '<div class="ion-zoom-image">';
        zoomHTML += '<div class="ion-zoom-close"><div>&times;</div></div>';
        zoomHTML += '<div class="ion-zoom-prev"><div></div></div>';
        zoomHTML += '<div class="ion-zoom-next"><div></div></div>';
        zoomHTML += '</div>';

    var $body = $(document.body),
        $window = $(window),
        $preloader,
        $container,
        $prev,
        $next;

    $body.append(zoomHTML);
    $preloader = $("div.ion-zoom-preloader");
    $container = $("div.ion-zoom-image");
    $prev = $("div.ion-zoom-prev");
    $next = $("div.ion-zoom-next");

    var gal = [],
        anyOpen = false,
        whichOpen = 0;


    var methods = {
        init: function(options){
            var gallery = this;
            if(gallery.data("isActive")) {
                return;
            }

            pluginCount = pluginCount + 1;
            this.pluginCount = pluginCount;
            gal[this.pluginCount] = this;

            var settings = $.extend({
                visibleControls: true
            }, options);

            gallery.each(function(i){
                $(this).data("isActive", true).data("iznum", i);
            });


            var isOpen = false,
                isAnimate = false,
                num = gallery.length,
                currentSize = {},
                baseSize = {},
                currentNum = 0,
                link,
                newLink;

            var $current,
                $newCurrent,
                $image;



            // public methods
            this.closeZoom = function(callback){
                closeCurrent(false, callback);
            };


            // private methods
            var bindBase = function(){
                gallery.on("click", function(e){
                    e.preventDefault();
                    var $this = $(this);

                    currentNum = $this.data("iznum");

                    if(isOpen) {
                        $newCurrent = $this;
                        newLink = $this.prop("href");

                        closeCurrent(true);
                    } else if(anyOpen) {
                        closeOther($this);
                    } else {
                        $current = $this;
                        link = $this.prop("href");

                        bindSpec();
                        getSize();
                    }
                });

                $body.on("keydown", function(e){
                    if(e.which === 27 && isOpen) { // ESC button
                        closeCurrent();
                    }
                    if(e.which === 37 && isOpen && !isAnimate) { // LEFT button
                        goPrev();
                    }
                    if(e.which === 39 && isOpen && !isAnimate) { // RIGHT button
                        goNext();
                    }
                });
            };

            var bindSpec = function(){
                $container.on("click", function(){
                    closeCurrent();
                });

                if(settings.visibleControls) {
                    $prev.on("click", function(e){
                        e.stopPropagation();
                        if(isOpen && !isAnimate){
                            goPrev();
                        }
                    });
                    $next.on("click", function(e){
                        e.stopPropagation();
                        if(isOpen && !isAnimate){
                            goNext();
                        }
                    });
                }
            };

            var closeCurrent = function(isNext, callback){
                if(isNext) {
                    zoom(baseSize.x, baseSize.y, baseSize.w, baseSize.h, true, true, callback);
                } else {
                    zoom(baseSize.x, baseSize.y, baseSize.w, baseSize.h, true, false, callback);
                }
            };

            var goPrev = function(){
                currentNum = currentNum - 1;
                var prev = gallery.eq(currentNum);
                if(!prev.length) {
                    currentNum = num - 1;
                    prev = gallery.eq(num - 1);
                }
                $newCurrent = prev;
                newLink = prev.prop("href");

                closeCurrent(true);
            };

            var goNext = function(){
                currentNum = currentNum + 1;
                var next = gallery.eq(currentNum);
                if(!next.length) {
                    currentNum = 0;
                    next = gallery.eq(0);
                }
                $newCurrent = next;
                newLink = next.prop("href");

                closeCurrent(true);
            };

            var getSize = function(){
                var ds = {
                    linkBorder: parseInt($current.css("border-left-width")),
                    linkPadding: parseInt($current.css("padding-left")),
                    imgBorder: parseInt($current.children("img").css("border-left-width")),
                    imgPadding: parseInt($current.children("img").css("padding-left"))
                };
                var mod1 = ds.linkBorder + ds.linkPadding;
                var mod2 = ds.imgBorder + ds.imgPadding;

                baseSize = {
                    x: $current.offset().left + mod1 + mod2,
                    y: $current.offset().top + mod1 + mod2,
                    w: $current.width() - (mod2 * 2),
                    h: $current.height() - (mod2 * 2)
                };

                showPreloader();
                loadImage();
            };

            var showPreloader = function(){
                var x = baseSize.x + (baseSize.w / 2);
                var y = baseSize.y + (baseSize.h / 2);
                $preloader.css("top", y).css("left", x);
            };

            var loadImage = function(){
                $container.append('<img src="' + link + '" />');
                $image = $container.children("img");

                $image.on("load", function(){
                    currentSize.w = $image.width();
                    currentSize.h = $image.height();

                    placeImage();
                });
            };

            var placeImage = function(){
                $preloader.css("top","-9999px").css("left","-9999px");
                $image.width(baseSize.w).height(baseSize.h);
                $container.width(baseSize.w).height(baseSize.h);
                $container.css("left", baseSize.x).css("top", baseSize.y);

                prepareZoom();
            };

            var prepareZoom = function(){
                var screenWidth = $window.innerWidth() - 40;
                var screenHeight = $window.innerHeight() - 40;
                var scrollTop = $window.scrollTop();
                var ratio = currentSize.h / currentSize.w;

                var x = baseSize.x + (baseSize.w / 2) - (currentSize.w / 2);
                var y = baseSize.y + (baseSize.h / 2) - (currentSize.h / 2);

                var w = currentSize.w;
                var h = currentSize.h;

                if(w > screenWidth) {
                    w = screenWidth;
                    h = screenWidth * ratio;
                    x = baseSize.x + (baseSize.w / 2) - (w / 2);
                }
                if(h > screenHeight) {
                    h = screenHeight;
                    w = screenHeight / ratio;
                    x = baseSize.x + (baseSize.w / 2) - (w / 2);
                }
                if(x + w > screenWidth) {
                    x = screenWidth - w - 20;
                }
                if(y + h > 20 + scrollTop + screenHeight) {
                    y = scrollTop + screenHeight - h;
                }

                if(x < 20) {
                    x = 20;
                }
                if(y < scrollTop + 20) {
                    y = scrollTop + 20;
                }

                zoom(x, y, w, h, false, false);
            };

            var zoom = function(x, y, w, h, isEnd, isNext, callback){
                isAnimate = true;

                $container.removeClass("isOpen");
                if(!settings.visibleControls){
                    $container.removeClass("noControls");
                }

                $container.stop().animate(
                    {
                        left: x,
                        top: y,
                        width: w,
                        height: h
                    },
                    {
                        step: function(now, fx){
                            if(fx.prop === "width") {
                                $image.width(now + "px");
                            }
                            if(fx.prop === "height") {
                                $image.height(now + "px");
                            }
                        },
                        duration: 300,
                        complete: function(){
                            if(isEnd) {
                                hideOld();

                                if(isNext) {
                                    setNew();
                                }
                                if(callback) {
                                    callback();
                                }
                            } else {
                                $container.addClass("isOpen");
                                if(!settings.visibleControls){
                                    $container.addClass("noControls");
                                }

                                anyOpen = true;
                                isOpen = true;
                                whichOpen = gallery.pluginCount;
                            }

                            isAnimate = false;
                        }
                    }
                );
            };

            var setNew = function(){
                $current = $newCurrent;
                link = newLink;
                getSize();
            };

            var hideOld = function(){
                $container.css("top","-9999px").css("left","-9999px");
                $container.width("0px").height("0px");
                $container.children("img").remove();
                isOpen = false;
                anyOpen = false;
            };

            var closeOther = function($toOpen){
                var callback = function(){
                    $current = $toOpen;
                    link = $toOpen.prop("href");

                    bindSpec();
                    getSize();
                };

                gal[whichOpen].closeZoom(callback);
            };


            bindBase();
        },
        close: function(){
            for(var i = 1; i < gal.length; i++){
                gal[i].closeZoom();
            }
        }
    };

    $.fn.ionZoom = function(method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist for jQuery.ionZoom');
        }
    };
})(jQuery);