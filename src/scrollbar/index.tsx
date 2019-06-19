/**
 * @author:yanxinaliang
 * @time：2019/6/19 17:45
 */
import * as React from "react";
// @ts-ignore
import {Scrollbars, ScrollbarProps,} from 'react-custom-scrollbars';
import "./scroll.less";
import {RefObject} from 'react';
import {Spring, SpringSystem} from 'rebound';
import {Bind} from 'lodash-decorators';

/*onScroll?: React.UIEventHandler<any>;
onScrollFrame?: (values: positionValues) => void;
onScrollStart?: () => void;
onScrollStop?: () => void;
onUpdate?: (values: positionValues) => void;

renderView?: React.StatelessComponent<any>;
renderTrackHorizontal?: React.StatelessComponent<any>;
renderTrackVertical?: React.StatelessComponent<any>;
renderThumbHorizontal?: React.StatelessComponent<any>;
renderThumbVertical?: React.StatelessComponent<any>;

tagName?: string;
hideTracksWhenNotNeeded?: boolean;

autoHide?: boolean;
autoHideTimeout?: number;
autoHideDuration?: number;

thumbSize?: number;
thumbMinSize?: number;
universal?: boolean;

autoHeight?: boolean;
autoHeightMin?: number | string;
autoHeightMax?: number | string;*/

class Scrollbar extends React.Component<ScrollbarProps>{
    private ref:RefObject<Scrollbars>=React.createRef();
    private horizonSpringSystem: SpringSystem;
    private verticalSpringSystem: SpringSystem;
    private horizonSpring: Spring;
    private verticalSpring: Spring;
    private static renderTrackVertical(props:any){
        return (
            <div className={`rs__rail-y`} {...props}/>
        );
    }
    private static renderThumbVertical(props:any){
        return (
            <div className={"rs__thumb-y"} {...props}/>
        );
    }
    private static renderTrackHorizontal(props:any){
        return (
            <div className={`rs__rail-x`} {...props}/>
        );
    }
    private static renderThumbHorizontal(props:any){
        return (
            <div className={"rs__thumb-x"} {...props}/>
        );
    }
    constructor(props:ScrollbarProps){
        super(props);
        this.horizonSpringSystem = new SpringSystem();
        this.verticalSpringSystem = new SpringSystem();
        this.horizonSpring = this.horizonSpringSystem.createSpring();
        this.verticalSpring = this.verticalSpringSystem.createSpring();
        this.horizonSpring.addListener(
            {onSpringUpdate: this.handleHorizonSpringUpdate});
        this.verticalSpring.addListener(
            {onSpringUpdate: this.handleVerticalSpringUpdate});
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
    public scrollTop(top: number,animation?:boolean){
        if (animation) {
            const scrollTop = this.getScrollTop();
            this.verticalSpring.setCurrentValue(scrollTop).setAtRest();
            this.verticalSpring.setEndValue(top);
        } else {
            this.ref.current.scrollTop(top);
        }
    };
    @Bind
    public scrollLeft(left: number,animation?:boolean){
        if (animation) {
            const scrollLeft = this.getScrollLeft();
            this.horizonSpring.setCurrentValue(scrollLeft).setAtRest();
            this.horizonSpring.setEndValue(left);
        } else {
            this.ref.current.scrollLeft(top);
        }
    };
    @Bind
    public scrollToTop(animation?: boolean){
        if(animation){
            this.scrollTop(0, true);
        }else{
            this.ref.current.scrollToTop();
        }
    };
    @Bind
    public scrollToBottom(animation?: boolean){
        if(animation){
            const scrollHeight = this.getScrollHeight();
            const clientHeight = this.getClientHeight();
            this.scrollTop(scrollHeight-clientHeight, true);
        }else{
            this.ref.current.scrollToBottom();
        }
    };
    @Bind
    public scrollToLeft(animation?: boolean){
        if(animation){
            this.scrollLeft(0, true);
        }else{
            this.ref.current.scrollToLeft();
        }
    };
    @Bind
    public scrollToRight(animation?: boolean){
        if(animation){
            const scrollWidth = this.getScrollWidth();
            const clientWidth = this.getClientWidth();
            this.scrollLeft(scrollWidth-clientWidth, true);
        }else{
            this.ref.current.scrollToBottom();
        }
    };
    @Bind
    public getScrollLeft(){
        return this.ref.current.getScrollLeft();
    };
    @Bind
    public getScrollTop(){
        return this.ref.current.getScrollTop();
    };
    @Bind
    public getScrollWidth(){
        return this.ref.current.getScrollWidth();
    };
    @Bind
    public getScrollHeight(){
        return this.ref.current.getScrollHeight();
    };
    @Bind
    public getClientWidth(){
        return this.ref.current.getClientWidth();
    };
    @Bind
    public getClientHeight(){
        return this.ref.current.getClientHeight();
    };
    @Bind
    public getValues(){
        return this.ref.current.getValues();
    };
    componentWillUnmount(): void {
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
    render(){
        const {style,autoHide,className="",...props} = this.props;
        return (
            <Scrollbars ref={this.ref} className={`${className} rs ${autoHide?"rs_hide":""}`} renderTrackHorizontal={Scrollbar.renderTrackHorizontal} renderThumbHorizontal={Scrollbar.renderThumbHorizontal} renderTrackVertical={Scrollbar.renderTrackVertical} renderThumbVertical={Scrollbar.renderThumbVertical} {...props} style={Object.assign({},{position:'relative',height:"100%",width:"100%"},style)}/>
        )
    }
}

export default Scrollbar;