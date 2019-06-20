/**
 * @disc:example
 * @author:yanxinaliang
 * @time：2018/6/9 20:34
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import PerfectScrollbar from "../src/perfectscrollbar";
import {RefObject} from 'react';
import CustomScroll from 'react-custom-scroll';
import "react-custom-scroll/dist/customScroll.css";
import Scrollbar from '../src/scrollbar';

class ItemList extends React.Component{
    private remove:boolean=false;
    componentDidMount(): void {
        setTimeout(()=>{
            this.remove=true;
            this.forceUpdate();
        },10000)
    }
    render(){
        const style = {
            height:100,
            width:300,
        };
        return (
            <React.Fragment>
                <div style={style}>sdsdsdsadsadsadsa</div>
                <div style={style}>sdsdsdsadsadsadsa</div>
                <div style={style}>sdsdsdsadsadsadsa</div>
                <div style={style}>sdsdsdsadsadsadsa</div>
                <div style={style}>sdsdsdsadsadsadsa</div>
                <div style={style}>sdsdsdsadsadsadsa</div>
                <div style={style}>sdsdsdsadsadsadsa</div>
                <div style={style}>sdsdsdsadsadsadsa</div>
                <div style={style}>sdsdsdsadsadsadsa</div>
                <div style={style}>sdsdsdsadsadsadsa</div>
                <div style={style}>sdsdsdsadsadsadsa</div>
                <div style={style}>sdsdsdsadsadsadsa</div>
                <div style={style}>sdsdsdsadsadsadsa</div>
                <div style={style}>sdsdsdsadsadsadsa</div>
                {
                    this.remove?null:<div style={style}>111111111111</div>
                }
            </React.Fragment>
        );
    }
}


class Test extends React.Component{
    private scrollRef:RefObject<Scrollbar>=React.createRef();
    componentDidMount(): void {
        setTimeout(()=>{
            this.scrollRef.current.scrollToBottom(true);
        },5000)
    }
    
    render(){
        return (
            <React.Fragment>
                <PerfectScrollbar  style={{position:"relative",height:300}}>
                    <ItemList/>
                </PerfectScrollbar>
                <div style={{position:"relative",height:300,whiteSpace:"nowrap"}}>
                    <CustomScroll heightRelativeToParent={"100%"}>
                        <ItemList/>
                    </CustomScroll>
                </div>
                <div style={{height:300}}>
                    <Scrollbar ref={this.scrollRef} id={"1111"} autoHide={true}>
                        <ItemList/>
                    </Scrollbar>
                </div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <div>
        <Test/>
    </div>,
    document.getElementById('__react-content'),
);