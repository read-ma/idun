var MobileSidebarMixin = {
  initMobileSidebar: function() {
    var $ = document.querySelector.bind(document),
        $$ = document.querySelectorAll.bind(document),

        getPointerEvent = function(event) {
          return event.targetTouches ? event.targetTouches[0] : event;
        },

        setListener = function (elm,events,callback) {
          var eventsArray = events.split(' '),
              i = eventsArray.length;
          while(i--){
            if(elm) {
              elm.addEventListener( eventsArray[i], callback, false );
            }
          }
        };

    var $touchArea = $('.mobile-sidebar-link'),
        $wrapper = $('.wrapper'),
        $sidebar = $('.sidebar'),
        touchStarted = false,
        firstTouch = true,
        pageY = 0,
        currY = 0,
        cachedY = 0;

    setListener($touchArea,'touchstart',function (e){
      e.preventDefault();
      var pointer = getPointerEvent(e);
      cachedY = pointer.pageY;
      currY = parseInt($sidebar.style.height) || 0;
      touchStarted = true;
      console.log('Touch started');
    });

    setListener($touchArea,'touchend touchcancel',function (e){
      e.preventDefault();
      touchStarted = false;
      firstTouch = false;
      console.log('Touch ended');
    });

    setListener($touchArea,'touchmove',function (e){
      e.preventDefault();
      var pointer = getPointerEvent(e),
          wrapperHeight = parseInt($wrapper.style.height) || 50;

      pageY = pointer.pageY;

      if(touchStarted && (pageY < cachedY) && (wrapperHeight >= 50))  {
        if(firstTouch){
          var newHeight = cachedY - pageY;
          $wrapper.style.height = newHeight + 50 + 'px';
          $sidebar.style.height = newHeight + 'px';
        } else {
          var newHeight = currY + (cachedY - pageY);
          $wrapper.style.height = newHeight + 50 + 'px';
          $sidebar.style.height = newHeight + 'px';
        }
      }

      if(touchStarted && (pageY > cachedY) && (wrapperHeight >= 50) && !firstTouch) {
        var newHeight = currY - (pageY - cachedY);
        if(newHeight >= 50) {
          $wrapper.style.height = currY - (pageY - cachedY) + 'px';
          $sidebar.style.height = currY - (pageY - cachedY) - 50 + 'px';
        } else {
          $wrapper.style.height = 50 + 'px';
          $sidebar.style.height = 0 + 'px';
        }
      }
    });

  }
};


export { MobileSidebarMixin }
