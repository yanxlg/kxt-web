import React, {EventHandler} from 'react';
import './index.less';

export declare interface TabProps{
    fields:any[];
    activeKey?:number,
    onClick?:EventHandler<any>,
    disabled?: boolean,
    className?: string,
    tabWidth?: number,
    type?: string,
    jumpClick?: EventHandler<any>,
    nextClick?: EventHandler<any>,
    numberIndex?:number[];
}

export default class Tab extends React.Component <TabProps,any>{
    constructor(props:TabProps) {
        super(props);
        this.state = {
            index: this.props.activeKey || 0,
            centerIndex: this.props.activeKey || 0,
            numberIndex: this.props.numberIndex||[0],
            numberDefaultIndex: 0,
            hoverNumberIndex:"",
            wid: this.props.tabWidth ? 120 : 105
        };
    }
    handleTabs = () => {
        let component = null;
        switch (this.props.type) {
            case "center":
                component = this.tabCenter();
                break;
            case "number":
                component = this.tabNumber();
                break;
            default:
                component = this.defaultTab();
                break;
        }
        return component;
    };
    componentWillReceiveProps(nextProps:TabProps) {
        this.setState({
            index: nextProps.activeKey,
            centerIndex: nextProps.activeKey
        })
    }
    defaultTab = () => {
        return (
            <div className="codyy-tab-wrapper">
                <ul className="codyy-tab-top">
                    {this.props.fields.map((item,index) => <li
                        key={index}
                        className={index === this.state.index ? "tab-active" : ""}
                        onClick={
                            () => {
                                this.setState({index});
                                if(this.props.onClick) {
                                    this.props.onClick(index);
                                }
                            }
                        }
                        onMouseOver={() => {
                            this.handleMouseOver(index);
                        }}
                        onMouseLeave={() => {
                            this.handleMouseLeave();
                        }}
                    >
                        {item.tabTitle}
                    </li>)}
                    <div className="codyy-tab-top-bottom" style={{width: this.props.tabWidth,transform : `translate3d(${(this.state.index * this.state.wid) + 20}px,0px,0px)`}} />
                </ul>
                <div className="codyy-tab-contents">
                    <div style={{width: 2800,marginLeft:0}} className="contents-tenter">
                        {this.props.fields.map((item,index) => <div
                            className={`codyy-tab-content ${this.state.index === index ? "codyy-tab-content-active" : "codyy-tab-content-inactive"}`}
                            key={index}
                        >
                            {item.tabContent}
                        </div>)}
                    </div>
                </div>
            </div>
        );
    };
    handleMouseOver = (index:number) => {
        (document.getElementsByClassName('codyy-tab-top-bottom')[0] as HTMLElement).style.transform = `translate3d(${(index * this.state.wid) + 20}px,0px,0px)`;
    };
    handleMouseLeave = () => {
        (document.getElementsByClassName('codyy-tab-top-bottom')[0] as HTMLElement).style.transform = `translate3d(${(this.state.index * this.state.wid) + 20}px,0px,0px)`;
    };
    tabCenter = () => {
        return (
            <div className="codyy-tab-center-wrapper">
                <div className="codyy-tab-center-top">
                    <ul>
                        {this.props.fields.map((item,index) => <li
                            key={index}
                            className={this.state.centerIndex === index ? "active" : ""}
                            onClick={() => {
                                this.setState({
                                    centerIndex: index
                                });
                                if(this.props.onClick) {
                                    this.props.onClick(index);
                                }
                            }}
                            onMouseOver={() => {
                                this.handleCenterMouseOver(index);
                            }}
                            onMouseLeave={this.handleCenterMouseLeave}
                        >
                            {item.tabTitle}
                        </li>)}
                        <div className="codyy-tab-center-bottom" style={{transform : `translate3d(${(this.state.centerIndex * 160) + 63}px,0px,0px)`}} />
                    </ul>
                </div>
                <div className="codyy-tab-center-contents">
                    <div style={{width: 4800,marginLeft: 0}} className="center-contents">
                        {this.props.fields.map((item,index) => <div
                            className={`codyy-tab-center-content ${this.state.centerIndex === index ? "codyy-tab-center-active" : "codyy-tab-center-inactive"} `}
                            key={index}
                        >
                            {item.tabContent}
                        </div>)}
                    </div>
                </div>
            </div>
        );
    };
    handleCenterMouseOver = (index:number) => {
        (document.getElementsByClassName('codyy-tab-center-bottom')[0] as HTMLElement).style.transform = `translate3d(${(index * 160) + 63}px,0px,0px)`;
    };
    handleCenterMouseLeave = () => {
        (document.getElementsByClassName('codyy-tab-center-bottom')[0] as HTMLElement).style.transform = `translate3d(${(this.state.centerIndex * 160) + 63}px,0px,0px)`;
    };
    jumpClick = (index:number) => {
        this.setState({
            centerIndex: index
        });
        (document.getElementsByClassName('codyy-tab-center-bottom')[0] as HTMLElement).style.transform = `translate3d(${(index * 160) + 63}px,0px,0px)`;
    };
    /***************************number风格************************************/
    tabNumber = () => {
        return (
            <div className="codyy-tab-number-wrapper">
                <div className="codyy-tab-number-top">
                    <ul style={{position:"relative"}}>
                        {this.props.fields.map((item,index) => <li
                            key={index}
                            className={this.state.numberIndex[index] === index ? "active" : ""}
                            onClick={() => {
                                if(this.state.numberIndex[index] === index){
                                    this.setState({
                                        numberDefaultIndex:index
                                    });
                                }
                            }}
                            onMouseOver={() => {
                                this.handleNumberOver(index);
                            }}
                            onMouseLeave={() => {
                                this.handleLeave()
                            }}
                        >
                            <span>{index + 1}</span>
                            {item.tabTitle}
                        </li>)}
                        <div className="codyy-tab-number-bottom" style={{left:(typeof this.state.hoverNumberIndex==="string"?this.state.numberDefaultIndex:this.state.hoverNumberIndex)*185}}/>
                    </ul>
                </div>
                <div className="codyy-tab-number-contents">
                    <div className="number-contents" style={{width: 1160*this.props.fields.length,marginLeft: 0}}>
                        {this.props.fields.map((item,index) => <div key={index}
                            className={`codyy-tab-number-content ${this.state.numberDefaultIndex === index ? "codyy-tab-number-active" : "codyy-tab-number-inactive"}`}
                        >
                            {item.tabContent}
                        </div>)}
                    </div>
                </div>
            </div>
        );
    };
    handleNumberOver = (index:number) => {
        if(this.state.numberIndex[index]===index){
            this.setState({
                hoverNumberIndex:index
            })
        }
    };
    handleLeave = () => {
        this.setState({
            hoverNumberIndex:""
        })
    };
    nextClick = (index:number) => {
        this.state.numberIndex.push(index);
        this.setState({
            numberDefaultIndex: index
        });
    };
    render() {
        return (
            <div>
                {this.handleTabs()}
            </div>
        );
    }
}

