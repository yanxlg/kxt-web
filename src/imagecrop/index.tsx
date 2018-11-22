/**
 * @disc:截图
 * @author:yanxinaliang
 * @time：2018/10/9 17:33
 */

import React from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import Options = Cropper.Options;
import "./crop.less";


declare interface IImageCropProps extends Options{
    src:string;
    cropCircle?:boolean;
}


class ImageCrop extends React.Component<IImageCropProps>{
    private image:HTMLImageElement;
    private cropper:Cropper;
    componentDidMount(){
        this.cropper=new Cropper(this.image,Object.assign({
            responsive:true,
            aspectRatio:1,
            dragMode:'move' as any,
            viewMode:'free' as any
        },this.props))
    }
    componentWillReceiveProps(nextProps:any){
        // 属性变化，重新创建
        this.image.src=nextProps.src;
        this.cropper.destroy();
        this.cropper=new Cropper(this.image,Object.assign({
            responsive:true,
            aspectRatio:1,
            dragMode:'move' as any,
            viewMode:'free' as any
        },nextProps));
    }
    public clear(){
        this.cropper.clear();
        return this;
    };
    public crop(){
        this.cropper.crop();
        return this;
    };
    public destroy(){
        this.cropper.destroy();
        return this;
    };
    public disable(){
        this.cropper.disable();
        return this;
    };
    public enable(){
        this.cropper.enable();
        return this;
    };
    public getCanvasData(){
        return this.cropper.getCanvasData();
    };
    public getContainerData(){
        return this.cropper.getContainerData();
    };
    public getCropBoxData(){
        return this.cropper.getCropBoxData();
    }
    public getCroppedCanvas(options?: Cropper.GetCroppedCanvasOptions){
        return this.cropper.getCroppedCanvas(options);
    };
    public getData(rounded?: boolean){
        return this.cropper.getData(rounded);
    };
    public getImageData(){
        return this.cropper.getImageData();
    };
    public move(offsetX: number, offsetY?: number){
        this.cropper.move(offsetX,offsetY);
        return this;
    };
    public moveTo(x: number, y?: number){
        this.cropper.moveTo(x,y);
        return this;
    };
    public replace(url: string, onlyColorChanged?: boolean){
        this.cropper.replace(url,onlyColorChanged);
        return this;
    };
    public reset(){
        this.cropper.reset();
        return this;
    };
    public rotate(degree: number){
        this.cropper.rotate(degree);
        return this;
    };
    public rotateTo(degree: number){
        this.cropper.rotateTo(degree);
        return this;
    };
    public scale(scaleX: number, scaleY?: number){
        this.cropper.scale(scaleX,scaleY);
        return this;
    };
    public scaleX(scaleX: number){
        this.cropper.scaleX(scaleX);
        return this;
    };
    public scaleY(scaleY: number){
        this.cropper.scaleY(scaleY);
        return this;
    };
    public setAspectRatio(aspectRatio: number){
        this.cropper.setAspectRatio(aspectRatio);
        return this;
    };
    public setCanvasData(data: Cropper.SetCanvasDataOptions){
        this.cropper.setCanvasData(data);
        return this;
    };
    public setCropBoxData(data: Cropper.SetCropBoxDataOptions){
        this.cropper.setCropBoxData(data);
        return this;
    };
    public setData(data: Cropper.SetDataOptions){
        this.cropper.setData(data);
        return this;
    };
    public setDragMode(dragMode: Cropper.DragMode){
        this.cropper.setDragMode(dragMode);
        return this;
    };
    public zoom(ratio: number){
        this.cropper.zoom(ratio);
        return this;
    };
    public zoomTo(ratio: number, pivot?: {x: number; y: number}){
        this.cropper.zoomTo(ratio,pivot);
        return this;
    };
    render(){
        const {cropCircle,src} = this.props;
        return (
            <img className={cropCircle?"cropper-crop-circle":""} src={src} style={{position:"absolute",width:"100%",height:"100%",left:0,top:0}} ref={(ref:any)=>this.image=ref}/>
        )
    }
}

export default ImageCrop;