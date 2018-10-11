/**
 * @disc:example
 * @author:yanxinaliang
 * @time：2018/6/9 20:34
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import ImageCrop from "../src/crop";

ReactDOM.render(
    <div>
        <div style={{position:"relative",width:300,height:300}}>
            <ImageCrop autoCrop={true} cropCircle={true} src={require("./404.png")} preview={".img-preview"}/>
        </div>
        <div className={".img-preview"} id={"preview1"} style={{width:200,height:200,overflow:"hidden"}}/>
        <div className={".img-preview"} id={"preview2"} style={{width:100,height:100,overflow:"hidden"}}/>
    </div>,
    document.getElementById('__react-content'),
);