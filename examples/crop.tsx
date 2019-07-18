/**
 * @disc:example
 * @author:yanxinaliang
 * @time：2018/6/9 20:34
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import "react-custom-scroll/dist/customScroll.css";
import ChatBox from '../src/chatbox';
import "./index.css";


class Test extends React.Component<{},{}>{
    constructor(props:{}){
        super(props);
    }
    componentDidMount(): void {
    }
    render(){
        return (
            <div style={{position:"absolute",width:"100%",height:"100%",overflow:"hidden",zIndex:100,backgroundColor:"white",left:0,top:0}}>
                <ChatBox onSend={()=>{}}/>
            </div>
        )
    }
}

ReactDOM.render(
    <div>
        <Test/>
    </div>,
    document.getElementById('__react-content'),
);