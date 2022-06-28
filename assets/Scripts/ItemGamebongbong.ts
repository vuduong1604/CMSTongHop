import { _decorator, Component, Node, EditBox, assetManager, SpriteFrame, Texture2D, Sprite, AudioClip, AudioSource, ImageAsset } from 'cc';
import { Data } from './Data';
import { IDGame, InforServer } from './InforServer';
import { ItemData } from './ItemData';
const { ccclass, property } = _decorator;

@ccclass('ItemGamebongbong')
export class ItemGamebongbong extends Component {

    @property(SpriteFrame)
    SoundActive: SpriteFrame = null;
    @property(AudioSource)
    AudioSrc: AudioSource = null;

    @property(EditBox)
    title: EditBox = null;

    @property(Node)
    ListAnswerNode: Node[] = [null];

    @property(Node)
    Question: Node = null;

    @property(Node)
    ListBtnsoluongcau: Node[] = [null];

    @property(Node)
    panelduoi: Node = null;

    @property(Node)
    btn_themcauhoi: Node = null;

    IdItem = "00000000-0000-0000-0000-000000000000";

    onofQues() {
        if (this.Question.active == true) {
            this.Question.active = false;
            this.ListBtnsoluongcau.forEach(element => {
                element.active = true;
            });
        } else {
            this.Question.active = true;
            this.ListBtnsoluongcau.forEach(element => {
                element.active = false;
            });
        }
    }

    async soluongcau(ev, numb) {
        this.btn_themcauhoi.active = true;
        this.panelduoi.active = false;
        await this.ListAnswerNode.forEach(element => {
            element.active = false;
        });
        // for(var i = 0;i < numb; i++){
        //     this.ListAnswerNode[i].active = true;
        // }
        if (numb < 6) {
            for (var i = 0; i < numb; i++) {
                this.ListAnswerNode[i].active = true;
                this.ListAnswerNode[i].getComponent(Data).Index = i;
            }
        } else {
            if (numb == 6) {
                this.panelduoi.active = true;
                this.btn_themcauhoi.active = false;
                this.ListAnswerNode[0].active = true;
                this.ListAnswerNode[0].getComponent(Data).Index = 0;
                this.ListAnswerNode[1].active = true;
                this.ListAnswerNode[1].getComponent(Data).Index = 1;
                this.ListAnswerNode[2].active = true;
                this.ListAnswerNode[2].getComponent(Data).Index = 2;
                this.ListAnswerNode[5].active = true;
                this.ListAnswerNode[5].getComponent(Data).Index = 3;
                this.ListAnswerNode[6].active = true;
                this.ListAnswerNode[6].getComponent(Data).Index = 4;
                this.ListAnswerNode[7].active = true;
                this.ListAnswerNode[7].getComponent(Data).Index = 5;
            }
            if (numb == 7) {
                this.panelduoi.active = true;
                this.btn_themcauhoi.active = false;
                this.ListAnswerNode[0].active = true;
                this.ListAnswerNode[0].getComponent(Data).Index = 0;
                this.ListAnswerNode[1].active = true;
                this.ListAnswerNode[1].getComponent(Data).Index = 1;
                this.ListAnswerNode[2].active = true;
                this.ListAnswerNode[2].getComponent(Data).Index = 2;
                this.ListAnswerNode[5].active = true;
                this.ListAnswerNode[5].getComponent(Data).Index = 3;
                this.ListAnswerNode[6].active = true;
                this.ListAnswerNode[6].getComponent(Data).Index = 4;
                this.ListAnswerNode[7].active = true;
                this.ListAnswerNode[7].getComponent(Data).Index = 5;
                this.ListAnswerNode[8].active = true;
                this.ListAnswerNode[8].getComponent(Data).Index = 6;
            }
            if (numb == 8) {
                this.panelduoi.active = true;
                this.btn_themcauhoi.active = false;
                this.ListAnswerNode[0].active = true;
                this.ListAnswerNode[1].active = true;
                this.ListAnswerNode[2].active = true;
                this.ListAnswerNode[3].active = true;
                this.ListAnswerNode[5].active = true;
                this.ListAnswerNode[6].active = true;
                this.ListAnswerNode[7].active = true;
                this.ListAnswerNode[8].active = true;

                this.ListAnswerNode[0].active = true;
                this.ListAnswerNode[0].getComponent(Data).Index = 0;
                this.ListAnswerNode[1].active = true;
                this.ListAnswerNode[1].getComponent(Data).Index = 1;
                this.ListAnswerNode[2].active = true;
                this.ListAnswerNode[2].getComponent(Data).Index = 2;
                this.ListAnswerNode[3].active = true;
                this.ListAnswerNode[3].getComponent(Data).Index = 3;
                this.ListAnswerNode[5].active = true;
                this.ListAnswerNode[5].getComponent(Data).Index = 4;
                this.ListAnswerNode[6].active = true;
                this.ListAnswerNode[6].getComponent(Data).Index = 5;
                this.ListAnswerNode[7].active = true;
                this.ListAnswerNode[7].getComponent(Data).Index = 6;
                this.ListAnswerNode[8].active = true;
                this.ListAnswerNode[8].getComponent(Data).Index = 7;
            }
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
                // var spr = find("Mask/Sprite", node);
                const spriteFrame = new SpriteFrame();
                const tex = new Texture2D();
                tex.image = imageAsset;
                spriteFrame.texture = tex;

                node.getComponent(Sprite).spriteFrame = spriteFrame;
                node.getComponent(Data).Image = url;
            });
        }
        if (typefile == "mp3") {
            console.log("MP3 node=> ", node);
            node.getComponent(Data).Sound = url;
            node.getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;
        }
    }


    playsound(ev) {
        console.log(ev.target.parent.getComponent(Data).Sound);
        var remoteUrl = ev.target.parent.getComponent(Data).Sound;
        assetManager.loadRemote(remoteUrl, (err, audioClip: AudioClip) => {
            this.AudioSrc.clip = audioClip;
            this.AudioSrc.play();
        });
    }


    GetData() {
        var itemdata = new ItemData();
        itemdata.IdItem = this.IdItem;
        itemdata.GameIdMini = IDGame.GameBongbong;
        itemdata.Title = this.title.string;
        itemdata.question = [];
        itemdata.answer = [];

        if (this.Question.active == false) {
            this.Question.getComponent(Data).Image = null;
        }
        itemdata.question.push(this.Question.getComponent(Data).GetDataGame11());

        this.ListAnswerNode.forEach(element => {
            if (element.active == true) {
                itemdata.answer.push(element.getComponent(Data).GetDataGame11());
            }
        });

        console.log(JSON.stringify(itemdata));
        return itemdata;
    }

    async LoadData(data) {

        console.log("Game bong bong Data =>", JSON.parse(data));
        var dataObj = JSON.parse(data);
        this.IdItem = dataObj.IdItem;
        this.title.string = dataObj.Title
        this.soluongcau(null, dataObj.answer.length);

        if (dataObj.question[0].Image == null) {

        } else {
            this.Question.active = true;
            // set image sound
            dataObj.question.map((el, index) => {
                var url = InforServer.DomainFile + el.Image;
                let i = index;
                assetManager.loadRemote<ImageAsset>(url, { ext: '.png' }, (err, imageAsset) => {
                    const spriteFrame = new SpriteFrame();
                    const texture = new Texture2D();
                    texture.image = imageAsset;
                    spriteFrame.texture = texture;
                    this.Question.getComponent(Sprite).spriteFrame = spriteFrame;
                    this.Question.getComponent(Data).Image = url; // sprite => mask => question or answer
                });

                if (dataObj.question[i].Sound == null) {
                } else {
                    var url = InforServer.DomainFile + dataObj.question[i].Sound;
                    this.Question.getComponent(Data).Sound = url;
                    this.Question.getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;
                }

            })
        }







        // set img sound answer

        if (dataObj.answer.length < 6) {
            dataObj.answer.map((el, index) => {
                var url = InforServer.DomainFile + el.Image;
                let i = index;
                assetManager.loadRemote<ImageAsset>(url, { ext: '.png' }, (err, imageAsset) => {
                    const spriteFrame = new SpriteFrame();
                    const texture = new Texture2D();
                    texture.image = imageAsset;
                    spriteFrame.texture = texture;

                    this.ListAnswerNode[i].getComponent(Sprite).spriteFrame = spriteFrame;
                    this.ListAnswerNode[i].getComponent(Data).Image = url; // sprite => mask => question or answer

                });
            })

            for (var i = 0; i < dataObj.answer.length; i++) {
                if (dataObj.answer[i].Sound == null) {
                } else {
                    var url = InforServer.DomainFile + dataObj.answer[i].Sound;

                    this.ListAnswerNode[i].getComponent(Data).Sound = url;
                    this.ListAnswerNode[i].getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;


                }
            }

        }
        if(dataObj.answer.length == 6){
            var listnode = [this.ListAnswerNode[0],this.ListAnswerNode[1],this.ListAnswerNode[2],this.ListAnswerNode[5],this.ListAnswerNode[6],this.ListAnswerNode[7]];

            dataObj.answer.map((el, index) => {
                var url = InforServer.DomainFile + el.Image;
                let i = index;
                assetManager.loadRemote<ImageAsset>(url, { ext: '.png' }, (err, imageAsset) => {
                    const spriteFrame = new SpriteFrame();
                    const texture = new Texture2D();
                    texture.image = imageAsset;
                    spriteFrame.texture = texture;

                    listnode[i].getComponent(Sprite).spriteFrame = spriteFrame;
                    listnode[i].getComponent(Data).Image = url; // sprite => mask => question or answer

                });
            })

            for (var i = 0; i < dataObj.answer.length; i++) {
                if (dataObj.answer[i].Sound == null) {
                } else {
                    var url = InforServer.DomainFile + dataObj.answer[i].Sound;

                    listnode[i].getComponent(Data).Sound = url;
                    listnode[i].getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;


                }
            }


        }
        if(dataObj.answer.length == 7){
            var listnode = [this.ListAnswerNode[0],this.ListAnswerNode[1],this.ListAnswerNode[2],this.ListAnswerNode[5],this.ListAnswerNode[6],this.ListAnswerNode[7],this.ListAnswerNode[8]];

            dataObj.answer.map((el, index) => {
                var url = InforServer.DomainFile + el.Image;
                let i = index;
                assetManager.loadRemote<ImageAsset>(url, { ext: '.png' }, (err, imageAsset) => {
                    const spriteFrame = new SpriteFrame();
                    const texture = new Texture2D();
                    texture.image = imageAsset;
                    spriteFrame.texture = texture;

                    listnode[i].getComponent(Sprite).spriteFrame = spriteFrame;
                    listnode[i].getComponent(Data).Image = url; // sprite => mask => question or answer

                });
            })

            for (var i = 0; i < dataObj.answer.length; i++) {
                if (dataObj.answer[i].Sound == null) {
                } else {
                    var url = InforServer.DomainFile + dataObj.answer[i].Sound;

                    listnode[i].getComponent(Data).Sound = url;
                    listnode[i].getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;


                }
            }


        }
        if(dataObj.answer.length == 8){
            var listnode = [this.ListAnswerNode[0],this.ListAnswerNode[1],this.ListAnswerNode[2],this.ListAnswerNode[3],this.ListAnswerNode[5],this.ListAnswerNode[6],this.ListAnswerNode[7],this.ListAnswerNode[8]];

            dataObj.answer.map((el, index) => {
                var url = InforServer.DomainFile + el.Image;
                let i = index;
                assetManager.loadRemote<ImageAsset>(url, { ext: '.png' }, (err, imageAsset) => {
                    const spriteFrame = new SpriteFrame();
                    const texture = new Texture2D();
                    texture.image = imageAsset;
                    spriteFrame.texture = texture;

                    listnode[i].getComponent(Sprite).spriteFrame = spriteFrame;
                    listnode[i].getComponent(Data).Image = url; // sprite => mask => question or answer

                });
            })

            for (var i = 0; i < dataObj.answer.length; i++) {
                if (dataObj.answer[i].Sound == null) {
                } else {
                    var url = InforServer.DomainFile + dataObj.answer[i].Sound;

                    listnode[i].getComponent(Data).Sound = url;
                    listnode[i].getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;


                }
            }


        }
    }
}

