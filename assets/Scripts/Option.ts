import { _decorator, Component, Node, tween, Vec3, Vec2, v2, v3, SpriteFrame, Button, Sprite } from 'cc';
import { Gamenoi11 } from './Gamenoi11';
import { IDGame } from './InforServer';
import { ItemGame14doc } from './ItemGame14doc';
import { ItemGame14ngang } from './ItemGame14ngang';
import { ItemGamebongbong } from './ItemGamebongbong';
import { ItemGameCanhcut } from './ItemGameCanhcut';
import { ItemGamePhudong } from './ItemGamePhudong';
const { ccclass, property } = _decorator;

@ccclass('Option')
export class Option extends Component {

     iditem = null;
    @property(Node)
    btn_on : Node = null;
    @property(Node)
    btn_off : Node = null;

    @property(Node)
    btn_tpnl : Node = null;
    @property(SpriteFrame)
    btn_tpnl_unactive : SpriteFrame = null;
    @property(SpriteFrame)
    btn_tpnl_inactive : SpriteFrame = null;

    openOption() {
        console.log(1111);
        if(this.node.position.y == 0){
            console.log(2222);
            this.btn_on.active = true;
            this.btn_off.active = false;
            tween(this.node)
            .to(0.2, { position: v3(0, -892)})
            .start()
        }else{
            console.log(3333);
            this.btn_on.active = false;
            this.btn_off.active = true;
            tween(this.node)
            .to(0.2, { position: v3(0, 0)})
            .start();
            this.getIdItem();
        }
    }

    phamchatnangluc(){
      
            window.top.showmodal( this.iditem, 0); 
        
    }

    getIdItem(){
        if(this.node.parent.name == IDGame.Game11){
            this.iditem = this.node.parent.getComponent(Gamenoi11).IdItem;
        }
        if(this.node.parent.name == IDGame.Game14doc){
            this.iditem = this.node.parent.getComponent(ItemGame14doc).IdItem;
        }
        if(this.node.parent.name == IDGame.Game14ngang){
            this.iditem = this.node.parent.getComponent(ItemGame14ngang).IdItem;
        }
        if(this.node.parent.name == IDGame.GameBongbong){
            this.iditem = this.node.parent.getComponent(ItemGamebongbong).IdItem;
        }
        if(this.node.parent.name == IDGame.GameChimcanhcut){
            this.iditem = this.node.parent.getComponent(ItemGameCanhcut).IdItem;
        }
        if(this.node.parent.name == IDGame.GamePhudong){
            this.iditem = this.node.parent.getComponent(ItemGamePhudong).IdItem;
        }
        console.log("IdItem=> ",this.iditem);


        if(this.iditem == "00000000-0000-0000-0000-000000000000"){
            this.btn_tpnl.getComponent(Button).interactable = false;
            this.btn_tpnl.getComponent(Sprite).spriteFrame = this.btn_tpnl_unactive;
        }else{
            this.btn_tpnl.getComponent(Button).interactable = true;
            this.btn_tpnl.getComponent(Sprite).spriteFrame = this.btn_tpnl_inactive;
        }
    }

   
    
}

