/**
 * @author:yanxinaliang
 * @time：2019/6/19 17:45
 */
import * as React from "react";
import {
    default as Scrollbars,
    ScrollbarProps,
    positionValues,
} from 'react-custom-scrollbars';
import "./scroll.less";
import {RefObject} from 'react';
import {Spring, SpringSystem} from 'rebound';
import {Bind} from 'lodash-decorators';

declare interface IScrollbarProps extends ScrollbarProps{
    hide?:boolean;
    hideX?:boolean;
    hideY?:boolean;
    overshootClamping?:boolean;// 是否支持弹动动画
}


declare interface IScrollbarState {
    showHorizon:boolean;
    showVertical:boolean;
}


class Scrollbar extends React.PureComponent<IScrollbarProps,IScrollbarState>{
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
    constructor(props:IScrollbarProps){
        super(props);
        this.horizonSpringSystem = new SpringSystem();
        this.verticalSpringSystem = new SpringSystem();
        this.horizonSpring = this.horizonSpringSystem.createSpring();
        this.verticalSpring = this.verticalSpringSystem.createSpring();
        this.horizonSpring.addListener(
            {onSpringUpdate: this.handleHorizonSpringUpdate});
        this.verticalSpring.addListener(
            {onSpringUpdate: this.handleVerticalSpringUpdate});
        this.state={
            showHorizon:false,
            showVertical:false
        }
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
            const {overshootClamping} = this.props;
            overshootClamping&&this.verticalSpring.setOvershootClampingEnabled(true);
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
            const {overshootClamping} = this.props;
            overshootClamping&&this.horizonSpring.setOvershootClampingEnabled(true);
            this.horizonSpring.setCurrentValue(scrollLeft).setAtRest();
            this.horizonSpring.setEndValue(left);
        } else {
            this.ref.current.scrollLeft(left);
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
    @Bind
    private onUpdate(values: positionValues){
        const {scrollHeight,scrollWidth,clientWidth,clientHeight} = values;
        this.setState({
            showHorizon:scrollWidth>clientWidth,
            showVertical:scrollHeight>clientHeight
        });
        this.props.onUpdate&&this.props.onUpdate(values);
    }
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
        const {style,autoHide=true,className="",onUpdate,hide,hideX,hideY,...props} = this.props;
        const {showHorizon,showVertical} = this.state;
        return (
            <Scrollbars ref={this.ref} onUpdate={this.onUpdate} className={`${className} rs ${autoHide?"rs_hide":""} ${showHorizon?"rs--active-x":""} ${showVertical?"rs--active-y":""} ${(hide||hideX)?"rs-hide-x":""} ${(hide||hideY)?"rs-hide-y":""}`} renderTrackHorizontal={Scrollbar.renderTrackHorizontal} renderThumbHorizontal={Scrollbar.renderThumbHorizontal} renderTrackVertical={Scrollbar.renderTrackVertical} renderThumbVertical={Scrollbar.renderThumbVertical} {...props} style={Object.assign({},{position:'relative',height:"100%",width:"100%"},style)}/>
        )
    }
}

export default Scrollbar;