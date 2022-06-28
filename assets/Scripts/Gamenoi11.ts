import { _decorator, Component, Node, assetManager, SpriteFrame, Texture2D, Sprite, EditBox, AudioSource, AudioClip, ImageAsset } from 'cc';
import { Data } from './Data';
import { IDGame, InforServer } from './InforServer';
import { ItemData } from './ItemData';
const { ccclass, property } = _decorator;

@ccclass('Gamenoi11')
export class Gamenoi11 extends Component {


    @property(SpriteFrame)
    SoundActive: SpriteFrame = null;
    @property(AudioSource)
    AudioSrc: AudioSource = null;


    @property(Node)
    cauhoi: Node[] = [null];

    @property(EditBox)
    Title: EditBox = null;


    IdItem = "00000000-0000-0000-0000-000000000000";

    async soluongcauhoi(ev, num) {
        await this.cauhoi.forEach(element => {
            element.active = false;
        });

        for (var i = 0; i < num; i++) {
            this.cauhoi[i].active = true;
        }

    }


    UploadFile(event) {
        console.log(event.target);
        if (cc.sys.isBrowser) {
            let ipFile = document.createElement("input");
            ipFile.type = "file";
            ipFile.accept = "image/png/mp3";
            console.log("ipFile", ipFile);
            ipFile.click();
            ipFile.addEventListener(
                "change",
                () => {
                    var img = document.createElement("img");
                    var canvas = document.createElement("canvas");
                    var reader = new FileReader();
                    reader.onload = function (progressEvent) {
                        img.src = progressEvent.target.result;
                        img.onload = function () {
                            // access image size here
                            var ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0);

                            var MAX_WIDTH = 800;
                            var MAX_HEIGHT = 600;
                            var width = img.width;
                            var height = img.height;

                            if (width > height) {
                                if (width > MAX_WIDTH) {
                                    height *= MAX_WIDTH / width;
                                    width = MAX_WIDTH;
                                }
                            } else {
                                if (height > MAX_HEIGHT) {
                                    width *= MAX_HEIGHT / height;
                                    height = MAX_HEIGHT;
                                }
                            }
                            canvas.width = width;
                            canvas.height = height;
                            var ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0, width, height);
                            var dataUrl = canvas.toDataURL("image/png");
                            console.log("buffer", dataUrl);
                            dataUrl =
                                "data:application/octet-binary;base64," +
                                dataUrl.replace("data:image/png;base64,", "");
                            fetch(dataUrl)
                                .then((res) => res.arrayBuffer())
                                .then((buffer) => {
                                    console.log("buffer", buffer);
                                });
                        };
                    };
                    console.log("ipFile.files[0]", ipFile.files);
                    reader.readAsDataURL(ipFile.files[0]);
                    // call Api

                    var myHeaders = new Headers();
                    myHeaders.append(
                        "Cookie",
                        ".AspNetCore.Session=CfDJ8GmrYVI6VxlFp5hvVMclUtanrpD%2BHH0oRRUDw6oaMn3NwyayHlyo3pNzp%2BEoa5sTRFRu%2Fiycjkfhs3cCAhcMz%2FI7uzsM8IQhc14aMSSnuv8PAShbhhpB538WNIJQxIwHCpD%2BNRNl1pW04TW%2FgN9%2BD%2BQcZFNbTHkI7U%2BOu4E7BK59"
                    );

                    var formdata = new FormData();
                    formdata.append("Item", ipFile.files[0], ipFile.files[0].name);
                    // formdata.append("ClassItem", node.name);

                    var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: formdata,
                        redirect: "follow",
                    };

                    fetch(
                        InforServer.DomainUploadFile,
                        requestOptions
                    )
                        .then((response) => response.text())
                        .then((result) => {
                            console.log(result);
                            let url = JSON.parse(result).url;
                            this.setImage(event.target, url);
                        })
                        .catch((error) => console.log("error", error));
                },
                false
            );
        }
    }



    setImage(node: Node, url) {
        console.log(node.name);
        var typefile = url.substr(url.length - 3);
        console.warn("typefile=>", typefile);
        if (typefile == "png" || typefile == "jpg") {
            assetManager.loadRemote(url, (err, imageAsset) => {

                const spriteFrame = new SpriteFrame();
                const tex = new Texture2D();
                tex.image = imageAsset;
                spriteFrame.texture = tex;

                node.getComponent(Sprite).spriteFrame = spriteFrame;

                node.parent.parent.getComponent(Data).Image = url; // sprite => mask => question or answer
            });
        }
        if (typefile == "mp3") {
            console.log("MP3 node=> ", node);
            node.parent.parent.getComponent(Data).Sound = url;
            node.parent.parent.getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;
        }
    }


    playsound(ev) {
        var remoteUrl = ev.target.parent.getComponent(Data).Sound;
        assetManager.loadRemote(remoteUrl, (err, audioClip: AudioClip) => {
            this.AudioSrc.clip = audioClip;
            this.AudioSrc.play();
        });
    }

    GetData() {
        console.log("Get data");
        var itemdata = new ItemData();
        itemdata.IdItem = this.IdItem;
        itemdata.GameIdMini = IDGame.Game11;
        itemdata.Title = this.Title.string;
        itemdata.question = [];
        itemdata.answer = [];

        this.cauhoi.forEach(element => {
            if (element.active == true) {
                var ques = element.getChildByName("question");
                var ans = element.getChildByName("answer");
                itemdata.question.push(ques.getComponent(Data).GetDataGame11());
                itemdata.answer.push(ans.getComponent(Data).GetDataGame11());
            }
        });

        console.log(JSON.stringify(itemdata));


        return itemdata;
    }

    async LoadData(data) {

        console.log("Game 1 1 Data =>", JSON.parse(data));
        var dataObj = JSON.parse(data);
        this.IdItem = dataObj.IdItem;
        this.Title.string =  dataObj.Title
        this.soluongcauhoi(null, dataObj.question.length);

        // set image
        dataObj.question.map((el,index)=>{
            var url = InforServer.DomainFile + el.Image;
            let i = index;
            assetManager.loadRemote<ImageAsset>(url, { ext: '.png' },  (err, imageAsset) => {
                const spriteFrame = new SpriteFrame();
                const texture = new Texture2D();
                texture.image = imageAsset;
                spriteFrame.texture = texture;
                this.cauhoi[i].getChildByName("question").getChildByName("Mask").getChildByName("Sprite").getComponent(Sprite).spriteFrame = spriteFrame;
                this.cauhoi[i].getChildByName("question").getComponent(Data).Image = url; // sprite => mask => question or answer
            });

            
           
        })

        dataObj.answer.map((el,index)=>{
            var url = InforServer.DomainFile + el.Image;
            let i = index;
            assetManager.loadRemote<ImageAsset>(url, { ext: '.png' },  (err, imageAsset) => {
                const spriteFrame = new SpriteFrame();
                const texture = new Texture2D();
                texture.image = imageAsset;
                spriteFrame.texture = texture;
                this.cauhoi[i].getChildByName("answer").getChildByName("Mask").getChildByName("Sprite").getComponent(Sprite).spriteFrame = spriteFrame;
                this.cauhoi[i].getChildByName("answer").getComponent(Data).Image = url; // sprite => mask => question or answer
            });

           
        })

        for(var i = 0; i < dataObj.question.length;i++){
            if(dataObj.question[i].Sound == null){
            }else{
                var url = InforServer.DomainFile + dataObj.question[i].Sound;
                    this.cauhoi[i].getChildByName("question").getComponent(Data).Sound = url;
                    this.cauhoi[i].getChildByName("question").getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;
            }
        }
        for(var i = 0; i < dataObj.answer.length;i++){
            if(dataObj.answer[i].Sound == null){
            }else{
                var url = InforServer.DomainFile + dataObj.answer[i].Sound;
                    this.cauhoi[i].getChildByName("answer").getComponent(Data).Sound = url;
                    this.cauhoi[i].getChildByName("answer").getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;
            }
        }
    }
}

