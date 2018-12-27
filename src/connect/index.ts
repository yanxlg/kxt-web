import {connect as selfConnect} from "react-redux";

declare interface ConnectOptions{
    withRef?:boolean;
    pure?:boolean
}

export default function connect(mapStateToProps: (state:any,ownProps?:any)=>any,mapDispatchToProps?:any,mergeProps?:any,options?:ConnectOptions) {
    return selfConnect(mapStateToProps,mapDispatchToProps,mergeProps,options||{});
}