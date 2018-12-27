/**
 * @disc:滚动
 * @author:yanxinaliang
 * @time：2018/9/5 9:28
 */
import React from "react";
import PerfectScrollbar from '../perfectscrollbar';
import "../perfectscrollbar/css/perfect-scrollbar.css";

declare interface IScrollbarProps{
    disableHorizon?:boolean;// 禁用横向
    disableVertical?:boolean
}

class Scrollbar extends React.Component<IScrollbarProps>{
    public scrollBarContainer:HTMLDivElement;
    public scroll:PerfectScrollbar;
    constructor(props:IScrollbarProps){
        super(props);
        this.onMouseMove=this.onMouseMove.bind(this);
    }
    componentDidMount(){
        this.scroll=new PerfectScrollbar(this.scrollBarContainer,{
            wheelSpeed: 2,
            suppressScrollX:this.props.disableHorizon,
            suppressScrollY:this.props.disableVertical,
        })
    }
    private onMouseMove(e:any){
        const offsetX = e.clientX - this.scrollBarContainer.clientLeft;
        const offsetY = e.clientY - this.scrollBarContainer.clientTop;
        
        const offsetRight = this.scrollBarContainer.offsetWidth - offsetX;
        const offsetBottom = this.scrollBarContainer.offsetHeight-offsetY;
        
        if(offsetRight>=0&&offsetRight<=15){
            this.scroll.update();
            this.scrollBarContainer.classList.add("ps--hover-y");
        }else{
            this.scrollBarContainer.classList.remove("ps--hover-y");
        }
        if(offsetBottom>=0&&offsetBottom<=15){
            this.scroll.update();
            this.scrollBarContainer.classList.add("ps--hover-x");
        }else{
            this.scrollBarContainer.classList.remove("ps--hover-x");
        }
    }
    render(){
        return (
            <div onMouseMove={this.onMouseMove} ref={(ref:HTMLDivElement)=>this.scrollBarContainer=ref} style={{position:"relative",width:"100%",height:"100%",overflow:"hidden"}}>
                {
                    this.props.children
                }
            </div>
        )
    }
}

export {Scrollbar};