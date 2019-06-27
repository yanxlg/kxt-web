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
    children:(key:string,data:T)=>ReactNode;// 一定需要key绑定
    initPosition:"top"|"bottom";
    onScroll?: React.UIEventHandler<any>;
    onScrollFrame?: (values: positionValues) => void;
    onScrollStart?: () => void;
    onScrollStop?: () => void;
    onUpdate?: (values: positionValues) => void;
    recyclerListHeader?:ReactNode;
    recyclerListFooter?:ReactNode;
    className?:string;
    autoHide?:boolean;
}

interface IRecyclerListViewState {
    drawStart:number;
    drawEnd:number;
}


class RecyclerListView<T> extends React.PureComponent<IRecyclerListViewProps<T>,IRecyclerListViewState>{
    private scrollRef:RefObject<Scrollbar>=React.createRef();
    constructor(props:IRecyclerListViewProps<T>){
        super(props);
        const {dataList=[],drawCount,initPosition} = props;
        if(initPosition==="top"){
            this.state={
                drawStart:0,
                drawEnd:drawCount
            }
        }else{
            const length = dataList.length;
            const drawEnd = Math.max(length,drawCount);
            this.state={
                drawStart:Math.max(0,drawEnd-drawCount),
                drawEnd:drawEnd
            }
        }
    }
    componentDidMount(): void {
        // 如果初始化位置在底部则需要自动滚动到底部
        const {initPosition} = this.props;
        if(initPosition==="bottom"){
            this.scrollRef.current.scrollToBottom(false);
        }
    }
    @Bind
    public scrollToBottom(){
        this.scrollRef.current.scrollToBottom(true);
        const {dataList=[],drawCount} = this.props;
        const length = dataList.length;
        const drawEnd = Math.max(length,drawCount);
        this.setState({
            drawStart:Math.max(0,drawEnd-drawCount),
            drawEnd:drawEnd
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
        const {dataList=[],children,onScroll,onScrollStart,onScrollStop,onUpdate,recyclerListHeader,recyclerListFooter,className,autoHide} = this.props;
        const listData = dataList.slice(drawStart,drawEnd);
        return (
            <Scrollbar ref={this.scrollRef} className={className} autoHide={autoHide} onScrollFrame={this.onScrollFrame} onScroll={onScroll} onScrollStart={onScrollStart} onScrollStop={onScrollStop} onUpdate={onUpdate}>
                {recyclerListHeader}
                {
                    listData.map((data:any,index:number)=>children((drawStart+index).toString(),data))
                }
                {recyclerListFooter}
            </Scrollbar>
        )
    }
}

export {RecyclerListView};

export default RecyclerListView;
