import { _decorator, Component, Node, Toggle } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Data')
export class Data extends Component {

    Image: string = null;
    Text: any = null;
    Sound: any = null;
    Gif: any = null;
    Spine: any = null;
    Json : any = null;
    IsCorrect: boolean;
    @property(String)
    Index: number = null;

    GetData(){ //  index theo true / false
        const data:JSON = <JSON><unknown>{
            "Id":this.uuidv4(),
            "Image":this.Image,
            "Text": this.Text,
            "Sound": this.Sound,
            "Gif": this.Gif,
            "Index": Number(this.node.getChildByName("Toggle").getComponent(Toggle).isChecked),
          }

        return data;
    }

    GetDataGame11(){
      const data:JSON = <JSON><unknown>{
          "Id":this.uuidv4(),
          "Image":this.Image,
          "Text": this.Text,
          "Sound": this.Sound,
          "Gif": this.Gif,
          "Index": Number(this.Index),
        }

      return data;
  }

  GetDataGamephudong(json){ // cho game dung position
    const data:JSON = <JSON><unknown>{
        "Id":this.uuidv4(),
        "Image":this.Image,
        "Text": this.Text,
        "Sound": this.Sound,
        "Gif": this.Gif,
        "Index": Number(this.Index),
        "Json": json
      }

    return data;
}

    uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
}

