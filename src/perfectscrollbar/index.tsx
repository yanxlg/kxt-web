/**
 * add scroll end event=>trigger ps-scroll-end
 *
 *
 *
 */
import React, {createElement} from 'react';
import ReactDom from 'react-dom';
import {Bind} from "lodash-decorators";
import {
    IScrollOptions,
    PerfectScrollbarFactory,
} from './perfectscrollbarfactory';


export default class PerfectScrollbar extends React.Component<IScrollOptions> {
    private scrollbar: PerfectScrollbarFactory;
    private container: HTMLElement;
    @Bind
    private getUserSetting(){
        const {
            handlers,
            maxScrollbarLength,
            minScrollbarLength,
            scrollingThreshold,
            scrollXMarginOffset,
            scrollYMarginOffset,
            suppressScrollX,
            suppressScrollY,
            swipeEasing,
            useBothWheelAxes,
            wheelPropagation,
            wheelSpeed,
            disabled
        } = this.props;
        const setting = {
            handlers,
            maxScrollbarLength,
            minScrollbarLength,
            scrollingThreshold,
            scrollXMarginOffset,
            scrollYMarginOffset,
            suppressScrollX,
            suppressScrollY,
            swipeEasing,
            useBothWheelAxes,
            wheelPropagation,
            wheelSpeed,
            disabled
        };
        let userSetting:any={};
        for (const key in setting) {
            if(void 0 !== setting[key]){
                userSetting[key] = setting[key];
            }
        }
        return userSetting;
    }
    
    componentDidMount(): void {
        this.container = ReactDom.findDOMNode(this) as HTMLElement;
        this.scrollbar = new PerfectScrollbarFactory(this.container, this.getUserSetting()) as any;
    }
    
    componentWillUnmount(): void {
        this.scrollbar.destroy();
    }
    
    @Bind
    public update() {
        this.scrollbar.update();
    }
    
    @Bind
    public destroy() {
        this.scrollbar.destroy();
    }
    
    @Bind
    public scrollLeft(left: number, animation?: boolean) {
        this.scrollbar.scrollLeft(left,animation);
    }
    
    @Bind
    public scrollTop(top: number, animation?: boolean) {
        this.scrollbar.scrollTop(top,animation);
    }
    
    @Bind
    public scrollToLeft(animation?: boolean) {
        this.scrollbar.scrollToLeft(animation);
    }
    
    @Bind
    public scrollToTop(animation?: boolean) {
        this.scrollbar.scrollToTop(animation);
    }
    
    @Bind
    public scrollToRight(animation?: boolean) {
        this.scrollbar.scrollToRight(animation);
    }
    
    @Bind
    public scrollToBottom(animation?: boolean) {
        this.scrollbar.scrollToBottom(animation);
    }
    componentDidUpdate(
        prevProps: Readonly<IScrollOptions>, prevState: Readonly<{}>,
        snapshot?: any): void {
        this.update();
        const {disabled} = this.props;
        this.scrollbar.disabled=disabled;
    }
    
    render() {
        const {
            tagName = 'div',
            containerRef,
            autoHide=true,
            style,
            className="",
            onClick,
            onMouseDown,
            onMouseEnter,
            onMouseLeave,
            onMouseMove,
            onMouseOut,
            onMouseOver,
            onMouseUp,
            id,
            children
        } = this.props;
        const mixClassName = autoHide?className:className+" ps-scroll-not-hide";
        return createElement(tagName, {id,style,onClick,onMouseDown,onMouseEnter,onMouseLeave,onMouseMove,onMouseOut,onMouseOver,onMouseUp, ref: containerRef,className:mixClassName},children);
    }
}


