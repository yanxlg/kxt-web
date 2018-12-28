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

export declare interface IPerfectScrollbar {
    update(): void;
    
    destroy(): void;
    
    reach: { x: 'start' | 'end' | null, y: 'start' | 'end' | null };
}

declare namespace PerfectScrollbar{
    export interface Options {
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
        style?: CSSProperties;
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
}

export default class PerfectScrollbar extends React.Component<PerfectScrollbar.Options> {
    private scrollbar: IPerfectScrollbar;
    private container: HTMLElement;
    private horizonSpringSystem: SpringSystem;
    private verticalSpringSystem: SpringSystem;
    private horizonSpring: Spring;
    private verticalSpring: Spring;
    
    @Bind
    @Debounce(500)
    private handleWindowResize() {
        this.update();
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
    @Throttle(300)
    private handleScroll(){
        this.update();
    }
    
    componentDidMount(): void {
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
        this.container = ReactDom.findDOMNode(this) as HTMLElement;
        this.container.addEventListener("scroll",this.handleScroll);
        this.scrollbar = new _PerfectScrollbar(this.container, {
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
        }) as any;
        this.horizonSpringSystem = new SpringSystem();
        this.verticalSpringSystem = new SpringSystem();
        this.horizonSpring = this.horizonSpringSystem.createSpring();
        this.verticalSpring = this.verticalSpringSystem.createSpring();
        this.horizonSpring.addListener(
            {onSpringUpdate: this.handleHorizonSpringUpdate});
        this.verticalSpring.addListener(
            {onSpringUpdate: this.handleVerticalSpringUpdate});
        window.addEventListener('resize', this.handleWindowResize);
    }
    
    componentWillUnmount(): void {
        window.removeEventListener('resize', this.handleWindowResize);
        this.container.removeEventListener("scroll",this.handleScroll);
        this.scrollbar.destroy();
        
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
        if (!this.container) return;
        if (animation) {
            const {scrollLeft, scrollWidth} = this.container;
            const val = MathUtil.mapValueInRange(left, 0, scrollWidth,
                scrollWidth * 0.2, scrollWidth * 0.8);
            this.verticalSpring.setCurrentValue(scrollLeft).setAtRest();
            this.verticalSpring.setEndValue(val);
        } else {
            this.container.scrollLeft = left;
        }
    }
    
    @Bind
    public scrollTop(top: number, animation?: boolean) {
        if (!this.container) return;
        if (animation) {
            const {scrollTop, scrollHeight} = this.container;
            const val = MathUtil.mapValueInRange(top, 0, scrollHeight,
                scrollHeight * 0.2, scrollHeight * 0.8);
            this.verticalSpring.setCurrentValue(scrollTop).setAtRest();
            this.verticalSpring.setEndValue(val);
        } else {
            this.container.scrollTop = top;
        }
    }
    
    @Bind
    public scrollToLeft(animation?: boolean) {
        if (!this.container) return;
        this.scrollLeft(0, animation);
    }
    
    @Bind
    public scrollToTop(animation?: boolean) {
        if (!this.container) return;
        this.scrollTop(0, animation);
    }
    
    @Bind
    public scrollToRight(animation?: boolean) {
        if (!this.container) return;
        const {scrollWidth, offsetWidth} = this.container;
        this.scrollLeft(scrollWidth - offsetWidth, animation);
    }
    
    @Bind
    public scrollToBottom(animation?: boolean) {
        if (!this.container) return;
        const {scrollHeight, offsetHeight} = this.container;
        this.scrollTop(scrollHeight - offsetHeight, animation);
    }
    
    componentDidUpdate(
        prevProps: Readonly<PerfectScrollbar.Options>, prevState: Readonly<{}>,
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