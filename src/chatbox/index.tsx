/**
 * @disc:聊天输入框
 * @author:yanxinaliang
 * @time：2018/4/10 11:13
 */
import React from "react";
import "./style/index";
import {Popover} from "antd";
import "antd/lib/popover/style/index.less";
import {Scrollbar} from './scrollbar';

declare const require :any;
let emotions = require("./config.json");

emotions.map((list:any,index:number)=>{
    emotions[index].images.map((emotion:any,i:number)=>{
        emotions[index].images[i].path=require(`./emotions/${index}/${emotions[index].type}/${emotion.name+"."+emotion.ext}`);
    })
});


export declare interface ChatBoxState{
    active:number;
    showEmotion:boolean;
    enable?:boolean;
    popover:boolean;
}

export declare interface ChatBoxProps{
    onSend:(content:string)=>void|boolean;
    renderSendBtn?:JSX.Element;
    renderEmotion?:JSX.Element;
    popoverContent?:string;
}


declare const window:any;

class ChatBox extends React.Component<ChatBoxProps,ChatBoxState>{
    public static parseContentToHtml=(content:string)=>{
        let div=document.createElement("div");
        div.innerText=content.trim().replace(/\s/g,"&nbsp;");
        content=div.innerHTML;
        //空格和标签过滤掉
        // let value=ChatBox.filterHtml(content);
        let value=content.replace(/;&nbsp/g,"<font>&nbsp;</font>").replace(/&amp;nbsp;/g,"<font>&nbsp;</font>");
        if(value){
            const images=value.match(/\[\S+?\]/g)||[];
            images.forEach((val:string)=>{
                //判断是否存在这个图片
                const name=val.substring(1,val.length-1);
                let exist=false,i=0,emotionList=emotions[0].images;
                while (!exist&&i<emotionList.length){
                    const image=emotionList[i];
                    if(name===image.name){
                        exist=true;
                        value=value.replace(val,`<img src="${image.path}"/>`);
                    }else{
                        i++;
                    }
                }
            });
            return value;
        }else{
            return "";
        }
    };
    constructor(props:ChatBoxProps){
        super(props);
        this.state={
            active:0,
            showEmotion:false,
            enable:true,
            popover:false,
        };
    }
    private chatRoomInput:any=null;
    private range:any=0;//光标位置
    private emotionContainer:HTMLDivElement;
    private timer:any;
    componentDidMount(){
        document.addEventListener("click",this.elEvent);
    }
    componentWillUnmount(){
        document.removeEventListener("click",this.elEvent);
    }
    private contains=(root:Node,el:any)=>{
        if(!root) return false;
        if (root.compareDocumentPosition)
            return root === el || !!(root.compareDocumentPosition(el) & 16);
        if (root.contains && el.nodeType === 1){
            return root.contains(el) && root !== el;
        }
        while (el = el.parentNode)
            if (el === root) return true;
        return false;
    };
    private elEvent=(e:any)=>{
        const target:any=e.target||window.event.srcElement;
        if(this.contains(this.emotionContainer,target)||target.className.indexOf("chatbox-emotion")>-1){
        
        }else{
            this.setState({
                showEmotion:false
            });
        }
    };
    public clear=()=>{
        this.chatRoomInput.value="";
    };
    public getContent=()=>{
        return this.chatRoomInput.value;
    };
    private sendMessage=()=> {
        const {onSend} = this.props;
        const show = onSend.call(this, this.getContent());
        if (show === true) {
            this.showPopover();
        }
    };
    private handKeyDown=(e:any)=>{
        if(e.keyCode===13) {
            const {onSend} = this.props;
            onSend.call(this, this.getContent());
        }
    };
    private insertAtRange=(content:string,path:string,type:string)=>{
        const value=this.chatRoomInput.value;
        if(this.range!==undefined&&this.range!==null){
            this.chatRoomInput.value=value.substring(0,this.range)+`[${content}]`+ value.substring(this.range);
            this.chatRoomInput.focus();
        }else{
            this.chatRoomInput.value=`[${content}]`;
            this.chatRoomInput.focus();
        }
    };
    private selectEmotion=(tag:string,path:string,type:string)=>{
        this.insertAtRange(tag,path,type);
        this.setState({
            showEmotion:false
        })
    };
    private onBlur=()=>{
        let userSelection:any = window.getSelection();
        let index;
        if(navigator.userAgent.indexOf("MSIE") > -1) { // IE
            let range = userSelection.createRange();
            range.text = '';
            range.setEndPoint('StartToStart',this.chatRoomInput.createTextRange());
            index= range.text.length;
        } else {
            index= this.chatRoomInput.selectionStart;
        }
        this.range=index;
    };
    private toggleEmotion=()=>{
        this.setState({
            showEmotion:!this.state.showEmotion
        });
    };
    private cancelBubble=(evt:any)=>{
        let e = evt || window.event;
        e.nativeEvent.stopImmediatePropagation();
        window.event?e.cancelBubble=true:e.stopPropagation();
    };
    public setDisabled=(placeholder?:string)=>{
        //设置为不可用
        this.chatRoomInput.setAttribute("placeholder",placeholder||"");
        this.chatRoomInput.setAttribute("disabled",true);
        this.chatRoomInput.value = '';
        this.setState({
            enable:false,
            showEmotion:false
        })
    };
    public setEnabled=(placeholder?:string)=>{
        this.chatRoomInput.setAttribute("placeholder",placeholder||"");
        this.chatRoomInput.removeAttribute("disabled");
        this.setState({
            enable:true,
            showEmotion:false
        })
    };
   
    private showPopover=()=>{
        if(this.timer){
            clearTimeout(this.timer);
        }
        this.timer=setTimeout(()=>{
            clearTimeout(this.timer);
            this.timer=null;
            this.setState({
                popover:false
            })
        },3000);
        this.setState({
            popover:true,
        });
    };
    render(){
        const emotion_active=emotions[this.state.active]||{};
        const {renderSendBtn,renderEmotion,popoverContent}=this.props;
        const {enable,popover,showEmotion}=this.state;
        return (
            <div className={`chatbox ${enable?"":"chatbox-disabled"}`} onClick={this.cancelBubble}>
                <div className={`chatbox-emotion ${this.state.showEmotion?"chatbox-emotion-active":""}`} onClick={this.toggleEmotion}>
                    {
                        renderEmotion?renderEmotion:null
                    }
                </div>
                <div className="chatbox-input">
                    <input maxLength={200} ref={(ref:any)=>this.chatRoomInput=ref} spellCheck={false} onBlur={this.onBlur} onKeyDown={this.handKeyDown}/>
                </div>
                <Popover placement="topRight" content={popoverContent} visible={popover} mouseLeaveDelay={3000}>
                    <button className="chatbox-send" onClick={this.sendMessage}>
                        {
                            renderSendBtn?renderSendBtn:"Send"
                        }
                    </button>
                </Popover>
                {
                    showEmotion?(
                        <div className="chatbox-emotion-container" ref={(ref:any)=>this.emotionContainer=ref}>
                            <Scrollbar disableHorizon={true}>
                                {
                                    (emotion_active.images||[]).map((image:any,index:number)=>{
                                        const path=image.path;
                                        return  (
                                            <div className="chatbox-emotion-small" title={image.name} onClick={this.selectEmotion.bind(this,image.name,path,emotion_active.type)}>
                                                <img src={path}/>
                                            </div>
                                        )
                                    })
                                }
                            </Scrollbar>
                            <div className="chatbox-emotion-container-packs">
                                <Scrollbar disableVertical={true}>
                                    {
                                        emotions.map((emotion:any,index:number)=>{
                                            return  (
                                                <li className={index===this.state.active?"active":""}>
                                                    <img src={require(`./emotions/${this.state.active}/${emotion.icon}`)}/>
                                                </li>
                                            )
                                        })
                                    }
                                </Scrollbar>
                            </div>
                        </div>
                    ):null
                }
            </div>
        )
    }
}

export default ChatBox;
