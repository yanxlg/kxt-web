/**
 * @disc:example
 * @author:yanxinaliang
 * @time：2018/6/9 20:34
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import "react-custom-scroll/dist/customScroll.css";
import {RecyclerListView} from '../src/recyclerlistview';
import {RefObject} from 'react';
import {Bind} from 'lodash-decorators';

interface ITestState {
    dataList:any[];
}

class Test extends React.Component<{},ITestState>{
    private recyclerListRef:RefObject<RecyclerListView<{name:string}>> = React.createRef();
    constructor(props:{}){
        super(props);
        let arr=[];
        for (let i =0;i<10000;i++){
            arr.push(i);
        }
        this.state={
            dataList:arr
        }
    }
    componentDidMount(): void {
    }
    private timer:any;
    @Bind
    private addMessage(){
        this.timer=setInterval(()=>{
            const {dataList} = this.state;
            dataList.push(Date.now());
            this.setState({
                dataList:dataList
            },()=>{
                this.recyclerListRef.current.scrollToBottom();
            })
        },Math.random()*10);
    }
    @Bind
    private stopMessage(){
        if(this.timer){
            clearInterval(this.timer);
        }
    }
    render(){
        const {dataList} = this.state;
        return (
            <div style={{position:"absolute",width:"100%",height:"100%",overflow:"hidden",zIndex:100,backgroundColor:"white",left:0,top:0}}>
                <button onClick={this.addMessage} style={{position:"fixed",top:0,left:0,zIndex:200}}>消息</button>
                <button onClick={this.stopMessage} style={{position:"fixed",top:0,right:0,zIndex:200}}>stop消息</button>
                <RecyclerListView<{name:string}> ref={this.recyclerListRef} drawCount={200} dataList={dataList} initPosition={"bottom"}>
                    {
                        (key,data) => <div key={key} style={{height:50+100*Math.random()}}>{data}</div>
                    }
                </RecyclerListView>
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