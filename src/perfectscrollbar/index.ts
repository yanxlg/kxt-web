// @ts-ignore
import {PerfectScrollbar as _PerfectScrollbar} from "./index.lib.js";

export type handler = 'click-rail'|'drag-thumb'|'keyboard'|'wheel'|'touch';

export interface IPerfectScrollbarOptions {
    handlers?: handler[];
    maxScrollbarLength?: number;
    minScrollbarLength?: number;
    scrollingThreshold?: number;
    scrollXMarginOffset?: number;
    scrollYMarginOffset?: number;
    suppressScrollX?: boolean;
    suppressScrollY?: boolean;
    swipeEasing?: boolean;
    useBothWheelAxes?: boolean;
    wheelPropagation?: boolean;
    wheelSpeed?: number;
}

class PerfectScrollbar extends _PerfectScrollbar{
    constructor(element: string | HTMLElement, options?: IPerfectScrollbarOptions){
        super(element,options);
    }
    update(): void{
        super.update();
    };
    destroy(): void{
        super.destroy();
    }
    reach: { x: 'start' | 'end' | null, y: 'start' | 'end' | null };
}

export default PerfectScrollbar;