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
            display:"inline-block",
            width:300
        };
        return (
            <PerfectScrollbar ref={this.scrollRef} style={{position:"relative",height:300}}>
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