import { _decorator, Component, Node, instantiate, Prefab, Label, PageView, sys, tween, director } from 'cc';
import { Gamenoi11 } from './Gamenoi11';
import { IDGame, InforServer } from './InforServer';
import { ItemData } from './ItemData';
import { ItemGame14doc } from './ItemGame14doc';
import { ItemGame14ngang } from './ItemGame14ngang';
import { ItemGamebongbong } from './ItemGamebongbong';
import { ItemGameCanhcut } from './ItemGameCanhcut';
import { ItemGamePhudong } from './ItemGamePhudong';
const { ccclass, property } = _decorator;

@ccclass('Gamemanager')
export class Gamemanager extends Component {

    @property(Node)
    Bangchongame: Node = null; //  bang chon game cho singlemode
    @property(Node)
    btn_mode: Node = null;
    @property(Node)
    popupaddgame: Node = null;
    @property(Node)
    BG: Node = null;

    @property(Prefab)
    prefab_game14doc: Prefab = null;
    @property(Prefab)
    prefab_game11: Prefab = null;
    @property(Prefab)
    prefab_game14ngang: Prefab = null;
    @property(Prefab)
    prefab_gamebongbong: Prefab = null;
    @property(Prefab)
    prefab_gamedientuphudong: Prefab = null;
    @property(Prefab)
    prefab_gamedientucanhcut: Prefab = null;





    @property(Label)
    CountItem: Label = null;

    @property(Node)
    ListItem: Node[] = [];

    @property(PageView)
    Pageview: PageView = null;

    @property(Node)
    Notification: Node = null;

    index = 0;
    LessonId = "";

    onLoad() {
        window.addEventListener("message", (e) => {

            var data = e.data;
            console.log(data);
            if (data.method == "dataGame") {
                console.log("[LessonId]: ", data.params.lessonid);
                this.LessonId = data.params.lessonid;
                console.log("[Data]: ", data.params.data);
                this.LoadGame(data.params.data);
            }
        });
    }

    start() {
        // window.top.GetInfor(); // lay lessonId - call func getinfor 
    }
    //#region Chon Game

    Reload() {
        director.loadScene("scene");
        // location.reload();
        // window.top.Reload();
    }

    GameMode(event, id) {
        if (id == 1) {
            // single mode
            this.Bangchongame.active = true;
            this.btn_mode.active = false;
        } if (id == 2) {
            this.Bangchongame.active = false;
            this.btn_mode.active = false;
        }
        if (id == 3) {
            // close bang chon game
            this.Bangchongame.active = false;
            this.btn_mode.active = true;
        }
    }

    AddGame() {
        this.popupaddgame.active = true;
    }
    SubGame() {
        console.log(this.Pageview.curPageIdx);
        this.ListItem.splice(this.Pageview.curPageIdx, 1);
        this.Pageview.removePageAtIndex(this.Pageview.curPageIdx);

    }

    addGamePopup(event, idgame, jsondata) {
        this.popupaddgame.active = false;
        if (idgame == IDGame.Game14doc) {
            var a = instantiate(this.prefab_game14doc);
            a.name = IDGame.Game14doc;
            // a.setParent(this.BG);
            this.Pageview.addPage(a);
            this.ListItem.push(a);
            if (jsondata != null) {
                a.getComponent(ItemGame14doc).LoadData(jsondata);
            }
        }
        else if (idgame == IDGame.Game11) {
            var a = instantiate(this.prefab_game11);
            a.name = IDGame.Game11;
            // a.setParent(this.BG);
            this.Pageview.addPage(a);
            this.ListItem.push(a);
            if (jsondata != null) {
                a.getComponent(Gamenoi11).LoadData(jsondata);
            }
        }
        else if (idgame == IDGame.Game14ngang) {
            var a = instantiate(this.prefab_game14ngang);
            a.name = IDGame.Game14ngang;
            // a.setParent(this.BG);
            this.Pageview.addPage(a);
            this.ListItem.push(a);
            if (jsondata != null) {
                a.getComponent(ItemGame14ngang).LoadData(jsondata);
            }
        }
        else if (idgame == IDGame.GameBongbong) {
            var a = instantiate(this.prefab_gamebongbong);
            a.name = IDGame.GameBongbong;
            // a.setParent(this.BG);
            this.Pageview.addPage(a);
            this.ListItem.push(a);
            if (jsondata != null) {
                a.getComponent(ItemGamebongbong).LoadData(jsondata);
            }
        }
        else if (idgame == IDGame.GamePhudong) {
            var a = instantiate(this.prefab_gamedientuphudong);
            a.name = IDGame.GamePhudong;
            // a.setParent(this.BG);
            this.Pageview.addPage(a);
            this.ListItem.push(a);
            if (jsondata != null) {
                a.getComponent(ItemGamePhudong).LoadData(jsondata);
            }
        }
        else if (idgame == IDGame.GameChimcanhcut) {
            var a = instantiate(this.prefab_gamedientucanhcut);
            a.name = IDGame.GameChimcanhcut;
            // a.setParent(this.BG);
            this.Pageview.addPage(a);
            this.ListItem.push(a);
            if (jsondata != null) {
                a.getComponent(ItemGameCanhcut).LoadData(jsondata);
            }
        }

        this.CountItem.string = this.ListItem.length.toString();
        this.index = this.ListItem.length - 1;
        // this.Pageview.scrollToRight();

        this.Pageview.setCurrentPageIndex(this.Pageview.curPageIdx + 1);

        // tween(this.node)
        //     .call(() => { this.Pageview.sizeMode = PageView.SizeMode.Free;   this.Pageview.setCurrentPageIndex(this.Pageview.curPageIdx + 1);})
        //     .delay(0.5)
        //     .call(() => { this.Pageview.sizeMode = PageView.SizeMode.Unified; })
        //     .start();
    }




    //#endregion


    //#region  Luu Game

    SaveGame() {
        console.log("Save Game");
        var ListItem = [];
        this.ListItem.forEach(element => {
            console.log(element.name);
            if (element.name == IDGame.Game14doc) {
                ListItem.push(element.getComponent(ItemGame14doc).GetData());
            }
            if (element.name == IDGame.Game11) {
                ListItem.push(element.getComponent(Gamenoi11).GetData());
            }
            if (element.name == IDGame.Game14ngang) {
                ListItem.push(element.getComponent(ItemGame14ngang).GetData());
            }
            if (element.name == IDGame.GameBongbong) {
                ListItem.push(element.getComponent(ItemGamebongbong).GetData());
            }
            if (element.name == IDGame.GamePhudong) {
                ListItem.push(element.getComponent(ItemGamePhudong).GetData());
            }
            if (element.name == IDGame.GameChimcanhcut) {
                ListItem.push(element.getComponent(ItemGameCanhcut).GetData());
            }
        });

        var dataJson = JSON.stringify(ListItem);
        var replacedomain = dataJson.replaceAll(InforServer.DomainFile, "");

        this.colorLog(`SaveGame => ${replacedomain} `, "success");

        var shibainu = "   _____ ____  _   _  _____         _   _  _____ _______       ____  \r\n  \/ ____\/ __ \\| \\ | |\/ ____|  \/\\   | \\ | |\/ ____|__   __|\/\\   \/ __ \\ \r\n | |   | |  | |  \\| | (___   \/  \\  |  \\| | |  __   | |  \/  \\ | |  | |\r\n | |   | |  | | . ` |\\___ \\ \/ \/\\ \\ | . ` | | |_ |  | | \/ \/\\ \\| |  | |\r\n | |___| |__| | |\\  |____) \/ ____ \\| |\\  | |__| |  | |\/ ____ \\ |__| |\r\n  \\_____\\____\/|_| \\_|_____\/_\/    \\_\\_| \\_|\\_____|  |_\/_\/    \\_\\____\/ \r\n                                                                     \r\n                                                                     ";
        this.colorLog(`${shibainu} `, "info");


        var myHeaders = new Headers();
        myHeaders.append("Cookie", ".AspNetCore.Session=CfDJ8FiDrhG9IIpLtSEyFWTCM3MP14q7xj8rqqEQkGFOOwOsZYfwjQKVIfbhyN%2FpHIlteL1ltXloLog1sr2l48h00KdOHqK85a1Vf8pqW4QA4tabHPEkm0F5cUWVS%2F673%2BXIXnWTysLXTvzpm1JHbcWFDmFmZWA9kXk6qD3FK6W7rFns");

        var formdata = new FormData();
        formdata.append("datajson", replacedomain);
        formdata.append("LessonId", "efb5d0fa-2dac-4eeb-ad55-4736f50ef553"); // lessonId bai hoc
        formdata.append("GameId", "01c0dfbf-3738-47fa-9911-6e51cacf8553");  // game id cua game tong hop

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(InforServer.DomainUploadItem, requestOptions)
            .then(response => response.text())
            .then(result => {
                var a = JSON.parse(result); if (a.isSuccess == true) {
                    this.Notification.getChildByName("noti").getComponent(Label).string = "Lưu bài học thành công!";
                    this.Notification.active = true;
                } else {
                    this.Notification.getChildByName("noti").getComponent(Label).string = "Lưu bài học không thành công!";
                }
            })
            .catch(error => console.log('error', error));
    }

    colorLog(message, color) {

        color = color || "black";

        switch (color) {
            case "success":
                color = "Green";
                break;
            case "info":
                color = "DodgerBlue";
                break;
            case "error":
                color = "Red";
                break;
            case "warning":
                color = "Orange";
                break;
            default:
                color = color;
        }

        console.log("%c" + message, "color:" + color);
    }

    //#endregion


    //#region Load Game
    LoadGame(data) {
        // console.log("Load data game");
        data.forEach(element => {
            // console.log(element.gameIdMini,element.jsonData);
            this.addGamePopup(null, element.gameIdMini, element.jsonData);
        });
    }
    //#endregion 

}

