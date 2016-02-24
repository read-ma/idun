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
            touchStarted = false, // detect if a touch event is sarted
            pageY = 0,
            currY = 0,
            cachedY = 0;

        //setting the events listeners
        setListener($touchArea,'touchstart mousedown',function (e){
            e.preventDefault();
            var pointer = getPointerEvent(e);

            cachedY = pageY = pointer.pageY;
            touchStarted = true;
            console.log('Touch started');
        });
        setListener($touchArea,'touchend mouseup touchcancel',function (e){
            e.preventDefault();
            // here we can consider finished the touch event
            touchStarted = false;
            console.log('Touch ended');
        });
        setListener($touchArea,'touchmove mousemove',function (e){
            e.preventDefault();
            var pointer = getPointerEvent(e);
            pageY = pointer.pageY;

            if(!currY) {
                currY = 0;
            }

            console.log('cahed: ');
            console.log(cachedY);
            console.log('curr: ');
            console.log(currY);
            console.log('pageY:');
            console.log(pageY);
            console.log('------------------');

            if(touchStarted && (pageY < cachedY) && (currY >= 0)) {
                // console.log('wchodzimy');
                $wrapper.style.height = (cachedY - pageY) + 'px';
                $sidebar.style.height = (cachedY - pageY) + 'px';
                currY = currY + (cachedY - pageY);
                console.log('curr: ');
                console.log(currY);
                console.log('--------ddd------');
            }
            if(touchStarted && (pageY > cachedY) && (currY >= 0)) {
                // console.log('schodzimy');
                $wrapper.style.height = (pageY - cachedY) + 'px';
                $sidebar.style.height = (pageY - cachedY) + 'px';
                currY = currY - (pageY - cachedY);
            }

        });

    }
};


export { MobileSidebarMixin }
