/**
 * @disc:example
 * @author:yanxinaliang
 * @time：2018/6/9 20:34
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import PerfectScrollbar from "../src/perfectscrollbar";
import {RefObject} from 'react';


class Test extends React.Component{
    private scrollRef:RefObject<PerfectScrollbar>=React.createRef();
    componentDidMount(): void {
        setTimeout(()=>{
            this.scrollRef.current.scrollLeft(200,true);
        },4000)
    }
    
    render(){
        return (
            <PerfectScrollbar suppressScrollY={true} ref={this.scrollRef} style={{whiteSpace:"nowrap",position:"relative",height:30}}>
                <div style={{display:"inline-block",height:100}}>sdsdsdsadsadsadsa</div>
                <div style={{display:"inline-block"}}>sdsdsdsadsadsadsa</div>
                <div style={{display:"inline-block"}}>sdsdsdsadsadsadsa</div>
                <div style={{display:"inline-block"}}>sdsdsdsadsadsadsa</div>
                <div style={{display:"inline-block"}}>sdsdsdsadsadsadsa</div>
                <div style={{display:"inline-block"}}>sdsdsdsadsadsadsa</div>
                <div style={{display:"inline-block"}}>sdsdsdsadsadsadsa</div>
                <div style={{display:"inline-block"}}>sdsdsdsadsadsadsa</div>
                <div style={{display:"inline-block"}}>sdsdsdsadsadsadsa</div>
                <div style={{display:"inline-block"}}>sdsdsdsadsadsadsa</div>
                <div style={{display:"inline-block"}}>sdsdsdsadsadsadsa</div>
                <div style={{display:"inline-block"}}>sdsdsdsadsadsadsa</div>
                <div style={{display:"inline-block"}}>sdsdsdsadsadsadsa</div>
                <div style={{display:"inline-block"}}>sdsdsdsadsadsadsa</div>
                <div style={{display:"inline-block"}}>sdsdsdsadsadsadsa</div>
            </PerfectScrollbar>
        )
    }
}

ReactDOM.render(
    <div>
        <Test/>
    </div>,
    document.getElementById('__react-content'),
);