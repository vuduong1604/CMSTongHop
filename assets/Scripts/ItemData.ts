import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemData')
export class ItemData{

    IdItem: string;
    GameIdMini: string;
    Title: string;
    question: any[];
    answer: any[];
    
    
}

