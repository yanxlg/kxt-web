/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/11/12 15:56
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/11/12 15:56
 * @disc:loading
 */

import './loading.less';

class Loading{
    static tagsCount=0;
    static show(container?:HTMLElement){
        if(!container){
            const loading=document.getElementById("kxt.loading");
            if(loading){
                if(!loading.classList.contains("show")){
                    loading.classList.add("show");
                }
                return false;
            }
            let loadingWraper=document.createElement("div");
            loadingWraper.setAttribute("id","kxt.loading");
            loadingWraper.setAttribute("class","kxt-loading show");
            loadingWraper.innerHTML='<div class="loader">\n' +
                '                <div class="square" ></div>\n' +
                '                <div class="square"></div>\n' +
                '                <div class="square last"></div>\n' +
                '                <div class="square clear"></div>\n' +
                '                <div class="square"></div>\n' +
                '                <div class="square last"></div>\n' +
                '                <div class="square clear"></div>\n' +
                '                <div class="square "></div>\n' +
                '                <div class="square last"></div>\n' +
                '            </div>';
            
            document.body.appendChild(loadingWraper);
            return false;
        }else{
            const loading=container.querySelector('[data-id="kxt.loading"]');
            if(loading){
                if(!loading.classList.contains("show")){
                    loading.classList.add("show");
                }
                return false;
            }
            let loadingWraper=document.createElement("div");
            loadingWraper.setAttribute("data-id","kxt.loading");
            loadingWraper.setAttribute("class","kxt-loading show");
            loadingWraper.style.position="absolute";
            loadingWraper.innerHTML='<div class="loader">\n' +
                '                <div class="square" ></div>\n' +
                '                <div class="square"></div>\n' +
                '                <div class="square last"></div>\n' +
                '                <div class="square clear"></div>\n' +
                '                <div class="square"></div>\n' +
                '                <div class="square last"></div>\n' +
                '                <div class="square clear"></div>\n' +
                '                <div class="square "></div>\n' +
                '                <div class="square last"></div>\n' +
                '            </div>';
            container.appendChild(loadingWraper);
            return false;
        }
    }
    static close(container?:HTMLElement){
        if(!container){
            const loading=document.getElementById("kxt.loading");
            if(loading) loading.classList.remove("show");
        }else{
            const loading=container.querySelector('[data-id="kxt.loading"]');
            if(loading) loading.classList.remove("show");
        }
    }
    static add(container?:HTMLElement){
        this.tagsCount++;
        this.show(container);
    }
    static remove(container?:HTMLElement){
        this.tagsCount--;
        if(this.tagsCount>0){
            return false;
        }else{
            this.close(container);
            return true;
        }
    }
}
export {Loading};