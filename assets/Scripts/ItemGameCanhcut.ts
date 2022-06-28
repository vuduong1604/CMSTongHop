import { _decorator, Component, Node, EditBox, assetManager, SpriteFrame, Texture2D, Sprite, AudioClip, AudioSource, ImageAsset } from 'cc';
import { Data } from './Data';
import { IDGame, InforServer } from './InforServer';
import { ItemData } from './ItemData';
import { move } from './move';
const { ccclass, property } = _decorator;

@ccclass('ItemGameCanhcut')
export class ItemGameCanhcut extends Component {

    @property(SpriteFrame)
    SoundActive: SpriteFrame = null;
    @property(AudioSource)
    AudioSrc : AudioSource = null;


    @property(EditBox)
    title: EditBox = null;

    @property(Node)
    ListAnswerNode: Node[] = [null];

    @property(Node)
    Question: Node = null;

    IdItem  = "00000000-0000-0000-0000-000000000000";
    
    @property(Node)
    ListIconPosition: Node[] = [null];

    async soluongcau(ev, numb) {
      
        await this.ListAnswerNode.forEach(element => {
            element.active = false;
        })
        await this.ListIconPosition.forEach(element => {
            element.active = false;
        })

        for (let index = 0; index < numb; index++) {
            this.ListAnswerNode[index].active = true;
        }
        for (let index = 0; index < numb; index++) {
            this.ListIconPosition[index].active = true;
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
               
                if(node.name == "Content"){
                    node.parent.getComponent(Data).Text = url;
                }
                
                else{
                    if(node.name == "Answer"){
                        node.getComponent(Data).Image = url;
                    }else{
                        node.parent.parent.getComponent(Data).Image = url;

                    }
                }
            });
        }
        if (typefile == "mp3") {
            console.log("MP3 node=> ", node);
            
            if(node.name == "Answer"){
                node.getComponent(Data).Sound = url;
                node.getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;
            }else{
                node.parent.getComponent(Data).Sound = url;
                node.parent.getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;
            }
        }
    }

    playsound(ev) {
        var remoteUrl =  ev.target.parent.getComponent(Data).Sound;
        assetManager.loadRemote(remoteUrl, (err, audioClip : AudioClip) =>{
          this.AudioSrc.clip = audioClip;
          this.AudioSrc.play();
        });
      }

    GetData() {
       var  i  = 0;
        var itemdata = new ItemData();
        itemdata.IdItem = this.IdItem;
        itemdata.GameIdMini = IDGame.GameChimcanhcut;
        itemdata.Title = this.title.string;
        itemdata.question = [];
        itemdata.answer = [];

        // var listPos = [];
        // this.ListIconPosition.forEach(element => {
        //     if(element.active == true){
        //         var a = [i,element.position.x,element.position.y];
        //         i++;
        //         listPos.push(a);
        //     }
        // });
        var listPos = [];
        this.ListIconPosition.forEach(element => {
            if (element.active == true) {
                // var a = [i, element.position.x, element.position.y];
                // i++;
                // listPos.push(a);
                if(element.getComponent(move).insideParent == true){
                    var a = [Number(element.name), element.position.x, element.position.y];
                    listPos.push(a);
                }
            }
        });

         
        itemdata.question.push(this.Question.getComponent(Data).GetDataGamephudong(JSON.stringify(listPos)));

        this.ListAnswerNode.forEach(element => {
            if(element.active == true){
                itemdata.answer.push(element.getComponent(Data).GetDataGame11());
            }
        });

        console.log(JSON.stringify(itemdata));
        return itemdata;
    }

    async LoadData(data) {

        console.log("Game canh cut Data =>", JSON.parse(data));
        var dataObj = JSON.parse(data);
        this.IdItem = dataObj.IdItem;
        this.title.string = dataObj.Title
        this.soluongcau(null, dataObj.answer.length);


        var url_imagequest = InforServer.DomainFile + dataObj.question[0].Image;
        var url_imageContent = InforServer.DomainFile + dataObj.question[0].Text;
       
        // set image content
        assetManager.loadRemote<ImageAsset>(url_imageContent, { ext: '.png' }, (err, imageAsset) => {
            const spriteFrame = new SpriteFrame();
            const texture = new Texture2D();
            texture.image = imageAsset;
            spriteFrame.texture = texture;
            this.Question.getChildByName("Content").getComponent(Sprite).spriteFrame = spriteFrame;
            this.Question.getComponent(Data).Text = url_imageContent;
        });

        // set sound question
        if (dataObj.question[0].Sound == null) {
        } else {
            var url = InforServer.DomainFile + dataObj.question[0].Sound;
            this.Question.getComponent(Data).Sound = url;
            this.Question.getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;
        }



        // set image Answer
        dataObj.answer.map((el,index)=>{
            var url = InforServer.DomainFile + el.Image;
            let i = index;
            assetManager.loadRemote<ImageAsset>(url, { ext: '.png' },  (err, imageAsset) => {
                const spriteFrame = new SpriteFrame();
                const texture = new Texture2D();
                texture.image = imageAsset;
                spriteFrame.texture = texture;
                this.ListAnswerNode[i].getComponent(Sprite).spriteFrame = spriteFrame;
                this.ListAnswerNode[i].getComponent(Data).Image = url; // sprite => mask => question or answer
            });

            

        })


        for(var  i = 0 ; i < dataObj.answer.length;i++){
            if(dataObj.answer[i].Sound == null){
            }else{
                var url = InforServer.DomainFile + dataObj.answer[i].Sound;
                    this.ListAnswerNode[i].getComponent(Data).Sound = url;
                    this.ListAnswerNode[i].getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;
            }
        }

        // set position 
        var listpos =  JSON.parse(dataObj.question[0].Json) ;
        for(var i = 0; i < listpos.length;i++){
            console.log(listpos[i][0],listpos[i][1],listpos[i][2]);
            this.ListIconPosition[i].setPosition(listpos[i][1], listpos[i][2], 0);
        }



    }
}

