/**
 * @disc:代码生成脚本
 * @author:yanxinaliang
 * @time：2018/3/24 16:00
 */
const fs=require("fs");
const dirs=fs.readdirSync("./emotions");

const emotions=[];

dirs.forEach(function(dir) {
    //dir 目录名
    const emotion={};
    const emotion_images=fs.readdirSync(`./emotions/${dir}`);
    emotion_images.forEach(function(dd) {
        const isFile=fs.statSync(`./emotions/${dir}/${dd}`).isFile();
        if(isFile){
            emotion.icon=dd;
        }else{
            //目录图片
            if(dd==="small"){
                emotion.type="small";
            }else{
                emotion.type="mid";
            }
            const imageList=[];
            const images=fs.readdirSync(`./emotions/${dir}/${dd}`);
            images.forEach(function(imgName) {
                imageList.push({
                    name:imgName.split(".")[0],
                    ext:imgName.split(".")[1]
                })
            });
            emotion.images=imageList;
        }
    });
    emotions.push(emotion);
});
fs.writeFileSync('./config.json',JSON.stringify(emotions));
