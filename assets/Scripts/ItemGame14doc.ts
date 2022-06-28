import { _decorator, Component, Node, SpriteFrame, Sprite, assetManager, find, Texture2D, Toggle, Label, EditBox, AudioSource, AudioClip, ImageAsset } from 'cc';
import { Data } from './Data';
import { IDGame, InforServer } from './InforServer';
import { ItemData } from './ItemData';
const { ccclass, property } = _decorator;

@ccclass('ItemGame14doc')
export class ItemGame14doc extends Component {

  @property(SpriteFrame)
  SoundActive: SpriteFrame = null;
  @property(AudioSource)
  AudioSrc: AudioSource = null;



  @property(EditBox)
  title: EditBox = null;

  @property(Toggle)
  baidoctoggle: Toggle = null;
  @property(Node)
  BtnDocbaidoc: Node = null;
  @property(Node)
  Panel_baidoc: Node = null;


  @property(Node)
  Question: Node = null;
  @property(Node)
  Ans1: Node = null;
  @property(Node)
  Ans2: Node = null;
  @property(Node)
  Ans3: Node = null;
  @property(Node)
  Ans4: Node = null;

  IdItem = "00000000-0000-0000-0000-000000000000";

  OnOffBaidoc(event) {
    console.log(this.baidoctoggle.isChecked);
    if (this.baidoctoggle.isChecked == false) {
      this.BtnDocbaidoc.active = true;
    } else {
      this.BtnDocbaidoc.active = false;
    }
  }

  docbaidoc(event, n) {
    if (n == "open") {
      this.Panel_baidoc.active = true;
    } else {
      this.Panel_baidoc.active = false;
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
        if (node.name == "Baidoc") {
          node.getComponent(Sprite).spriteFrame = spriteFrame;
          node.parent.getChildByName("question").getComponent(Data).Text = url;
        } else {
          node.getComponent(Sprite).spriteFrame = spriteFrame;
          node.getComponent(Data).Image = url;

        }
      });
    }
    if (typefile == "mp3") {
      console.log("MP3 node=> ", node);
      node.getComponent(Data).Sound = url;
      node.getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;
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
    var itemdata = new ItemData();
    itemdata.IdItem = this.IdItem;
    itemdata.GameIdMini = IDGame.Game14doc;
    itemdata.Title = this.title.string;
    itemdata.question = [];
    itemdata.answer = [];
    if(this.baidoctoggle.isChecked == false){
      this.Question.getComponent(Data).Text = null;
    }
    itemdata.question.push(this.Question.getComponent(Data).GetData());

    itemdata.answer.push(this.Ans1.getComponent(Data).GetData());
    itemdata.answer.push(this.Ans2.getComponent(Data).GetData());
    itemdata.answer.push(this.Ans3.getComponent(Data).GetData());
    itemdata.answer.push(this.Ans4.getComponent(Data).GetData());
    console.log(JSON.stringify(itemdata));
    return itemdata;
  }

  async LoadData(data) {

    console.log("Game 1 4 doc Data =>", JSON.parse(data));
    var dataObj = JSON.parse(data);
    this.IdItem = dataObj.IdItem;
    this.title.string = dataObj.Title;


    var url_imagequest = InforServer.DomainFile + dataObj.question[0].Image;

    // set image question
    assetManager.loadRemote<ImageAsset>(url_imagequest, { ext: '.png' }, (err, imageAsset) => {
      const spriteFrame = new SpriteFrame();
      const texture = new Texture2D();
      texture.image = imageAsset;
      spriteFrame.texture = texture;
      this.Question.getComponent(Sprite).spriteFrame = spriteFrame;
      this.Question.getComponent(Data).Image = url_imagequest;
    });

    // set image content (bai doc)
    if (dataObj.question[0].Text == null) {
    } else {
      this.baidoctoggle.isChecked = true;
      this.BtnDocbaidoc.active = true;
      var url_imageContent = InforServer.DomainFile + dataObj.question[0].Text;
      assetManager.loadRemote<ImageAsset>(url_imageContent, { ext: '.png' }, (err, imageAsset) => {
        const spriteFrame = new SpriteFrame();
        const texture = new Texture2D();
        texture.image = imageAsset;
        spriteFrame.texture = texture;
        this.Panel_baidoc.getComponent(Sprite).spriteFrame = spriteFrame;
        this.Question.getComponent(Data).Text = url_imageContent;
      });

    }

    // set sound question
    if (dataObj.question[0].Sound == null) {
    } else {
      var url = InforServer.DomainFile + dataObj.question[0].Sound;
      this.Question.getComponent(Data).Sound = url;
      this.Question.getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;
    }



    var listNodeAns = [this.Ans1, this.Ans2, this.Ans3, this.Ans4];

    // set image sound Answer
    dataObj.answer.map((el, index) => {
      var url = InforServer.DomainFile + el.Image;
      let i = index;
      assetManager.loadRemote<ImageAsset>(url, { ext: '.png' }, (err, imageAsset) => {
        const spriteFrame = new SpriteFrame();
        const texture = new Texture2D();
        texture.image = imageAsset;
        spriteFrame.texture = texture;
        listNodeAns[i].getComponent(Sprite).spriteFrame = spriteFrame;
        listNodeAns[i].getComponent(Data).Image = url; // sprite => mask => question or answer
      });



    })

    for (var i = 0; i < dataObj.answer.length; i++) {
      if (dataObj.answer[i].Sound == null) {
      } else {
        var url = InforServer.DomainFile + dataObj.answer[i].Sound;
        listNodeAns[i].getComponent(Data).Sound = url;
        listNodeAns[i].getChildByName("sound").getComponent(Sprite).spriteFrame = this.SoundActive;
      }
    }

    // set true / false answer

    for (let i = 0; i < dataObj.answer.length; i++) {

      listNodeAns[i].getChildByName("Toggle").getComponent(Toggle).isChecked = Boolean(dataObj.answer[i].Index);
    }



  }
}

