import * as CSS from '../lib/css';
import * as DOM from '../lib/dom';
import cls, {
    addScrollingClass,
    removeScrollingClass,
} from '../lib/class-names';
import updateGeometry from '../update-geometry';
import {toInt} from '../lib/util';

export default function(i) {
    bindMouseScrollHandler(i, [
        'containerWidth',
        'contentWidth',
        'pageX',
        'railXWidth',
        'scrollbarX',
        'scrollbarXWidth',
        'scrollLeft',
        'x',
        'scrollbarXRail',
    ]);
    bindMouseScrollHandler(i, [
        'containerHeight',
        'contentHeight',
        'pageY',
        'railYHeight',
        'scrollbarY',
        'scrollbarYHeight',
        'scrollTop',
        'y',
        'scrollbarYRail',
    ]);
}

function bindMouseScrollHandler(
    i,
    [
        containerHeight,
        contentHeight,
        pageY,
        railYHeight,
        scrollbarY,
        scrollbarYHeight,
        scrollTop,
        y,
        scrollbarYRail,
    ],
) {
    const element = i.element;
    
    let startingScrollTop = null;
    let startingMousePageY = null;
    let scrollBy = null;
    
    function mouseMoveHandler(e) {
        element[scrollTop] =
            startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
        addScrollingClass(i, y);
        updateGeometry(i);
        
        e.stopPropagation();
        e.preventDefault();
    }
    
    function mouseUpHandler() {
        removeScrollingClass(i, y);
        i[scrollbarYRail].classList.remove(cls.state.clicking);
        i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    }
    
    function getTouch(e) {
        if (e.targetTouches) {
            return e.targetTouches[0];
        } else {
            // Maybe IE pointer
            return e;
        }
    }
    
    function touchMoveHandler(e){
        const touch = getTouch(e);
        element[scrollTop] =
            startingScrollTop + scrollBy * (touch[pageY] - startingMousePageY);
        addScrollingClass(i, y);
        updateGeometry(i);
    
        e.stopPropagation();
        e.preventDefault();
    }
    
    function touchEndHandler() {
        removeScrollingClass(i, y);
        i[scrollbarYRail].classList.remove(cls.state.clicking);
        i.event.unbind(i.ownerDocument, 'touchmove', touchMoveHandler);
        i.event.unbind(i.ownerDocument, 'touchend', touchEndHandler);
        i.event.unbind(i.ownerDocument, 'touchcancel', touchEndHandler);
    }
    
    i.event.bind(i[scrollbarY], 'mousedown', e => {
        if (i.disabled) return;
        startingScrollTop = element[scrollTop];
        startingMousePageY = e[pageY];
        scrollBy =
            (i[contentHeight] - i[containerHeight]) /
            (i[railYHeight] - i[scrollbarYHeight]);
        
        i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
        i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);
        
        i[scrollbarYRail].classList.add(cls.state.clicking);
        
        e.stopPropagation();
        e.preventDefault();
    });
    i.event.bind(i[scrollbarY], 'touchstart', e => {
        if (i.disabled) return;
        startingScrollTop = element[scrollTop];
        const touch = getTouch(e);
        startingMousePageY = touch[pageY];
        scrollBy =
            (i[contentHeight] - i[containerHeight]) /
            (i[railYHeight] - i[scrollbarYHeight]);
        
        i.event.bind(i.ownerDocument, 'touchmove', touchMoveHandler);
        i.event.once(i.ownerDocument, 'touchend', touchEndHandler);
        i.event.once(i.ownerDocument, 'touchcancel', touchEndHandler);
        
        i[scrollbarYRail].classList.add(cls.state.clicking);
        
        e.stopPropagation();
        e.preventDefault();
    });
}
