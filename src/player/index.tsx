/**
 * @disc:播放器，支持flv
 * @author:yanxinaliang
 * @time：2018/11/2 15:44
 */
import React from "react";
const Chimee = require("chimee");
const Flv =require('chimee-kernel-flv');
const popupFactory = require("chimee-plugin-popup");
const chimeePluginControlbar = require('chimee-plugin-controlbar');
const chimeePluginCenterState = require('chimee-plugin-center-state');
const contextmenu =require('chimee-plugin-contextmenu');
import "./player.less";




declare interface IPlayerProps{
    src:string;
    muted?:boolean;
    isLive:boolean;
    currentTime?:number;
    onPlayEnded?:(video:HTMLVideoElement)=>void;
    onPlay?:(video:HTMLDivElement)=>void;
    onTimeUpdate?:(video:HTMLDivElement)=>void;
    onPlayError?:(video:HTMLDivElement)=>void;
    loop?:boolean;
}



class Player extends React.PureComponent<IPlayerProps>{
    private container:HTMLDivElement;
    private player:any;
    private isLive:boolean;
    constructor(props:IPlayerProps){
        super(props);
        this.isLive=props.isLive;
    }
    componentDidMount(){
        this.replay();
    }
    componentWillReceiveProps(nextProps:IPlayerProps){
    }
    private replay(){
        const {src,muted=false,currentTime,onPlayEnded,onPlay,onTimeUpdate,onPlayError,loop=false} = this.props;
        if(this.player){
            this.player.destroy();
            this.player=undefined;
        }
        if(this.isLive){
            this.player = new Chimee({
                wrapper: this.container,
                src:src,
                isLive: true,
                box:'flv',
                autoplay: true,
                controls: false,
                muted:muted,
                kernels: {
                    flv:function(el:HTMLVideoElement, config:any) {
                        return new Flv(el,Object.assign({},config,{
                            // stashSize:1,
                            debug:process.env.NODE_ENV === 'development'
                        }))
                    },
                }
            });
            this.player.on("error",()=>{
                this.replay();
            });
        }else{
            const aggdPlugin = popupFactory({
                name: 'app-name',
                className: 'video-watermark',
                title: false,
                body: '<em><a href="http://www.codyy.com" target="_blank">Codyy</a></em>',
                operable: false
            });
            Chimee.install(aggdPlugin);
            Chimee.install(chimeePluginControlbar);
            Chimee.install(chimeePluginCenterState);
            Chimee.install(contextmenu);
            const player = new Chimee({
                wrapper: this.container,
                src:src,
                isLive: false,
                box:'native',
                autoplay: false,
                controls: true,
                loop:loop,
                plugin: [aggdPlugin.name,chimeePluginControlbar.name,{
                    name:chimeePluginCenterState.name,
                    errorTips:"视屏加载失败，请稍后再试"
                },{
                    name: contextmenu.name,
                    baseMenus: [],
                    menus: [
                        {
                            text: '暂停',
                            action: 'menu-pause'
                        },
                        {
                            text: 'copyright Codyy vs: {VERSION}',
                            disable: true
                        },
                    ]
                }]
            });
            const offset = currentTime||0;
            player.seek(offset);
            player.play();
            const menusPlugin = player.chimeeContextmenu;
            player.on('play', () => {
                menusPlugin.updatemenu([{text: '暂停', action: 'pause'},{
                    text: 'copyright Codyy vs: {VERSION}',
                    disable: true
                }]);
            });
            player.on('pause', () => {
                menusPlugin.updatemenu([{text: '播放', action: 'play'},{
                    text: 'copyright Codyy vs: {VERSION}',
                    disable: true
                }]);
            });
            player.on('menu-pause', function() {
                player.emit('pause');
            });
            player.on("menu-play",function() {
                player.emit('play');
            });
            if(void 0 !== onPlay){
                player.on("play",(e:any)=>{
                    onPlay&&onPlay(e.target);
                });
            }
            if(void 0 !== onTimeUpdate){
                player.on("timeupdate",(e:any)=>{
                    onTimeUpdate(e.target);
                });
            }
            if(void 0 !== onPlayEnded){
                player.on("ended",(e:any)=>{
                    onPlayEnded(e.target);
                });
            }
            if(void 0 !== onPlayError){
                this.player.on("error",(e:any)=>{
                    onPlayError(e.target);
                });
            }
        }
    }
    componentWillUnmount(){
        if(this.player){
            this.player.destroy();
            this.player=undefined;
        }
    }
    render(){
        return (
            <div ref={(ref:HTMLDivElement)=>this.container=ref} className="live-player"/>
        )
    }
}

export default Player;