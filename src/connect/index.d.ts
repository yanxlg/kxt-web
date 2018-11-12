declare interface ConnectOptions{
    withRef?:boolean;
    pure?:boolean
}

export function connect(mapStateToProps: (state:any,ownProps?:any)=>any,mapDispatchToProps?:any,mergeProps?:any,options?:ConnectOptions):any;