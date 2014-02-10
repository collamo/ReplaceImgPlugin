!function($) {

 /**
   * Replace IMG to Text by alt
   */
  $.fn.replaceImgToText = function(options){

    var opts = $.extend({
      'restoreByResize': false,
      'restoreWindowWidth': 640
    }, options);
    var $targets = $(this);
    if($(this).get(0).tagName != "IMG"){
      $targets = $(this).find('img');
    }

    if(opts.restoreByResize){
      detectWindowResize(opts.restoreWindowWidth);
      $(window).bind('wschange', function(e,data){
        if(data.type=="l"){
          $.each($('.rpimg'), function(i, e){
            $img = $('<img/>');
            $(e).replaceWith($img.addClass('rpimg').attr({'src':$(e).data('src'), 'width':$(e).data('width'), 'height':$(e).data('height'), 'alt':$(e).text()}));
          });
        }else if(data.type=="s"){
          var replaceImg = function(i ,e){
            $span = $("<span/>").addClass('rpimg').attr({'data-src':$(e).attr('src'), 'data-width':$(e).attr('width'), 'data-height':$(e).attr('height')}).append($(e).attr('alt'));
            $(e).replaceWith($span);
          };
          $.each($('.rpimg'), replaceImg);
          $.each($targets, replaceImg);
        }
      });
    }else{
      $.each($targets, function(i, e){
        $(e).replaceWith($(e).attr('alt'));
      });
    }

    function detectWindowResize(ws){
      var sw = -1;
      $(window).bind('resize load',function() {
        var dw = $(window).width();
        if (dw>ws) {
          if(sw || sw==-1){
            sw = false;
            var event = new $.Event('wschange');
            $(window).trigger(event, {type: 'l'});
          }
        }else {
          if(!sw || sw==-1){
            sw = true;
            var event = new $.Event('wschange');
            $(window).trigger(event, {type: 's'})
          }
        }
      });
    }
  }

}(jQuery);
