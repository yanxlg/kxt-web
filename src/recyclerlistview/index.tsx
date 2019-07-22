/**
 * @disc:长列表
 * @author:yanxinaliang
 * @time：2019/6/25 14:52
 */
import React, {ReactNode, RefObject} from 'react';
import Scrollbar from '../scrollbar';
import {Bind} from 'lodash-decorators';
import {positionValues} from "react-custom-scrollbars";


interface IRecyclerListViewProps<T> {
    drawCount:number;// 显示数量
    dataList:T[];
    children:(key:number,data:T)=>ReactNode;// 一定需要key绑定
    onScroll?: React.UIEventHandler<any>;
    onScrollFrame?: (values: positionValues) => void;
    onScrollStart?: () => void;
    onScrollStop?: () => void;
    onUpdate?: (values: positionValues) => void;
    recyclerListHeader?:ReactNode;
    recyclerListFooter?:ReactNode;
    className?:string;
    autoHide?:boolean;
    contentClassName?:string;
    hide?:boolean;
    hideX?:boolean;
    hideY?:boolean;
}

interface IRecyclerListViewState {
    drawStart:number;
    drawEnd:number;
}


class RecyclerListView<T> extends React.PureComponent<IRecyclerListViewProps<T>,IRecyclerListViewState>{
    private scrollRef:RefObject<Scrollbar>=React.createRef();
    constructor(props:IRecyclerListViewProps<T>){
        super(props);
        const {drawCount} = props;
        this.state={
            drawStart:0,
            drawEnd:drawCount
        }
    }
    @Bind
    public scrollToBottom(animation?:boolean){
        const {dataList=[],drawCount} = this.props;
        const length = dataList.length;
        const drawEnd = Math.max(length,drawCount);
        this.setState({
            drawStart:Math.max(0,drawEnd-drawCount),
            drawEnd:drawEnd
        },()=>{
            this.scrollRef.current.scrollToBottom(animation);
        });
    }
    @Bind
    public scrollToTop(animation?:boolean){
        const {drawCount} = this.props;
        this.setState({
            drawStart:0,
            drawEnd:drawCount
        },()=>{
            this.scrollRef.current.scrollToTop(animation);
        });
    }
    @Bind
    public getValues(){
        return this.scrollRef.current.getValues();
    }
    @Bind
    private onScrollFrame(values: positionValues){
        const {top} = values;
        const {dataList=[],drawCount} = this.props;
        const length = dataList.length;
        const {drawEnd} = this.state;
        // top === 0 的时候值
        const offset = Math.floor(drawCount*(top-0.5));// 0.5中间计算
        if(Math.abs(offset)<=10||length<=drawCount){
            return;
        }
        const nextEnd = Math.max(Math.min(drawEnd + offset,length),drawCount);
        const nextStart = Math.max(0,nextEnd-drawCount);
        this.setState({
            drawStart:nextStart,
            drawEnd:nextEnd
        });
        this.props.onScrollFrame&&this.props.onScrollFrame(values);
    }
    render(){
        const {drawStart,drawEnd} = this.state;
        const {dataList=[],children,onScroll,onScrollStart,onScrollStop,onUpdate,recyclerListHeader,recyclerListFooter,className,autoHide,contentClassName,hide,hideX,hideY} = this.props;
        const listData = dataList.slice(drawStart,drawEnd);
        return (
            <Scrollbar ref={this.scrollRef} hide={hide} hideX={hideX} hideY={hideY} className={className} autoHide={autoHide} onScrollFrame={this.onScrollFrame} onScroll={onScroll} onScrollStart={onScrollStart} onScrollStop={onScrollStop} onUpdate={onUpdate}>
                <div className={contentClassName}>
                    {recyclerListHeader}
                    {
                        listData.map((data:any,index:number)=>children((drawStart+index).toString(),data))
                    }
                    {recyclerListFooter}
                </div>
            </Scrollbar>
        )
    }
}

export {RecyclerListView};

export default RecyclerListView;
