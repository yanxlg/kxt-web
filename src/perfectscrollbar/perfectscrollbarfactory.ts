/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2019/1/7 12:04
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2019/1/7 12:04
 * @disc:factory 脱离react
 */
import {Spring, SpringSystem} from 'rebound';
import {Bind, Debounce, Throttle} from 'lodash-decorators';
import "./css/style.less";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import {CSSProperties, MouseEventHandler, RefObject} from 'react';
const _PerfectScrollbar= require("perfect-scrollbar/dist/perfect-scrollbar.js");


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
    disabled?:boolean;
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
    containerRef?: ((ref: HTMLElement) => void)|RefObject<any>;
    tagName?: string;
    autoHide?:boolean;
}

class PerfectScrollbarFactory extends _PerfectScrollbar{
    private horizonSpringSystem: SpringSystem;
    private verticalSpringSystem: SpringSystem;
    private horizonSpring: Spring;
    private verticalSpring: Spring;
    private _disabled:boolean;
    public get disabled(): boolean {
        return this._disabled;
    }
    public set disabled(value: boolean) {
        this._disabled = value;
        // 隐藏滚动条
        if(value){
            this.element.classList.add("ps-scroll-disable");
        }else{
            this.element.classList.remove("ps-scroll-disable");
        }
    }
    constructor(element:HTMLElement,setting: IScrollFactoryOptions){
        super(element,setting);
        this.disabled=setting.disabled;
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
            this.verticalSpring.setAtRest();
            const {scrollLeft} = this.element;
            this.horizonSpring.setCurrentValue(scrollLeft).setAtRest();
            this.horizonSpring.setEndValue(left);
        } else {
            this.element.scrollLeft = left;
        }
    }
    
    @Bind
    public scrollTop(top: number, animation?: boolean) {
        if (!this.element) return;
        if (animation) {
            this.verticalSpring.setAtRest();
            const {scrollTop} = this.element;
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