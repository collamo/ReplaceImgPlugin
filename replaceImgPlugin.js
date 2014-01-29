!function($) {

 /**
   * Replace IMG to Text by alt
   */
  $.fn.replaceImgToText = function(options){
    options = $.extend({}, $.fn.replaceImgToText.defaultOptions, options);
    var $targets = $(this);
    if($(this).prop("tagName") != "IMG"){
      $targets = $(this).find('img');
    }
    $.each($targets, function(i, e){
      $(e).replaceWith($(e).attr('alt'));
    });
  }

}(jQuery);
