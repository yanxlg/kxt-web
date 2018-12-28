/**
 * add scroll end event=>trigger ps-scroll-end
 *
 *
 *
 */
import React, {MouseEventHandler, createElement, CSSProperties} from 'react';
import ReactDom from 'react-dom';
// @ts-ignore
import {default as _PerfectScrollbar} from './index.lib.js';
// @ts-ignore
import {SpringSystem, MathUtil, Spring} from 'rebound';
import {Bind,Throttle,Debounce} from "lodash-decorators";

import "./css/style.less";
import "./css/perfect-scrollbar.css";


export type handler =
    'click-rail'
    | 'drag-thumb'
    | 'keyboard'
    | 'wheel'
    | 'touch';

export interface IScrollFactoryOptions {
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
export interface IScrollOptions extends IScrollFactoryOptions{
    style?:CSSProperties;
    className?: string;
    onClick?: MouseEventHandler;
    onMouseDown?: MouseEventHandler;
    onMouseEnter?: MouseEventHandler;
    onMouseLeave?: MouseEventHandler;
    onMouseMove?: MouseEventHandler;
    onMouseOut?: MouseEventHandler;
    onMouseOver?: MouseEventHandler;
    onMouseUp?: MouseEventHandler;
    containerRef?: (ref: HTMLElement) => void;
    tagName?: string;
    autoHide?:boolean;
}


class PerfectScrollbarFactory extends _PerfectScrollbar{
    private horizonSpringSystem: SpringSystem;
    private verticalSpringSystem: SpringSystem;
    private horizonSpring: Spring;
    private verticalSpring: Spring;
    
    constructor(element: string | HTMLElement,setting: IScrollFactoryOptions){
        super(element,setting);
        this.horizonSpringSystem = new SpringSystem();
        this.verticalSpringSystem = new SpringSystem();
        this.horizonSpring = this.horizonSpringSystem.createSpring();
        this.verticalSpring = this.verticalSpringSystem.createSpring();
        this.horizonSpring.addListener(
            {onSpringUpdate: this.handleHorizonSpringUpdate});
        this.verticalSpring.addListener(
            {onSpringUpdate: this.handleVerticalSpringUpdate});
        
        this.element.addEventListener("scroll",this.handleScroll);
        window.addEventListener('resize', this.handleWindowResize);
    }
    
    @Bind
    @Debounce(500)
    private handleWindowResize() {
        this.update();
    }
    
    @Bind
    private handleScroll(){
        this.handleScrollUpdate();
        this.handleScrollEnd();
    }
    
    @Bind
    @Throttle(300)
    private handleScrollUpdate(){
        this.update();
    }
    
    @Bind
    @Debounce(500)
    private handleScrollEnd(){
        let event:any=document.createEvent("HTMLEvents");
        event.initEvent("ps-scroll-end",false,false);
        this.element.dispatchEvent(event);
    }
    
    @Bind
    private handleHorizonSpringUpdate(spring: Spring) {
        const val = spring.getCurrentValue();
        this.scrollLeft(val, false);
    }
    
    @Bind
    private handleVerticalSpringUpdate(spring: Spring) {
        const val = spring.getCurrentValue();
        this.scrollTop(val, false);
    }
    
    @Bind
    public update() {
        super.update();
    }
    
    @Bind
    public destroy() {
        this.element.removeEventListener("scroll",this.handleScroll);
        window.removeEventListener('resize', this.handleWindowResize);
        this.horizonSpringSystem.deregisterSpring(this.horizonSpring);
        this.horizonSpringSystem.removeAllListeners();
        this.horizonSpringSystem = undefined;
        this.horizonSpring.destroy();
        this.horizonSpring = undefined;
        this.verticalSpringSystem.deregisterSpring(this.verticalSpring);
        this.verticalSpringSystem.removeAllListeners();
        this.verticalSpringSystem = undefined;
        this.verticalSpring.destroy();
        this.verticalSpring = undefined;
        super.destroy();
    }
    
    @Bind
    public scrollLeft(left: number, animation?: boolean) {
        if (!this.element) return;
        if (animation) {
            const {scrollLeft} = this.element;
            this.verticalSpring.setCurrentValue(scrollLeft).setAtRest();
            this.verticalSpring.setEndValue(left);
        } else {
            this.element.scrollLeft = left;
        }
    }
    
    @Bind
    public scrollTop(top: number, animation?: boolean) {
        if (!this.element) return;
        if (animation) {
            const {scrollTop} = this.element;
            // const val = MathUtil.mapValueInRange(top, 0, scrollHeight,
            //     scrollHeight * 0.2, scrollHeight * 0.8);
            this.verticalSpring.setCurrentValue(scrollTop).setAtRest();
            this.verticalSpring.setEndValue(top);
        } else {
            this.element.scrollTop = top;
        }
    }
    
    @Bind
    public scrollToLeft(animation?: boolean) {
        if (!this.element) return;
        this.scrollLeft(0, animation);
    }
    
    @Bind
    public scrollToTop(animation?: boolean) {
        if (!this.element) return;
        this.scrollTop(0, animation);
    }
    
    @Bind
    public scrollToRight(animation?: boolean) {
        if (!this.element) return;
        const {scrollWidth, offsetWidth} = this.element;
        this.scrollLeft(scrollWidth - offsetWidth, animation);
    }
    
    @Bind
    public scrollToBottom(animation?: boolean) {
        if (!this.element) return;
        const {scrollHeight, offsetHeight} = this.element;
        this.scrollTop(scrollHeight - offsetHeight, animation);
    }
    
}

export {PerfectScrollbarFactory};


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
            wheelSpeed
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
            children
        } = this.props;
        const mixClassName = autoHide?className:className+" ps-scroll-not-hide";
        return createElement(tagName, {style,onClick,onMouseDown,onMouseEnter,onMouseLeave,onMouseMove,onMouseOut,onMouseOver,onMouseUp, ref: containerRef,className:mixClassName}, children);
    }
}


