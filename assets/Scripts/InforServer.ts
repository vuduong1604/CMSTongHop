import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('InforServer')
export  class InforServer  {
   
    static readonly DomainUploadFile = "https://dev-cms-teacher.consangtao.vn/Api/UploadFile";
    // static readonly DomainUploadItem = "http://localhost:64457/Api/AddItems";
    static readonly DomainUploadItem = "https://dev-cms-teacher.consangtao.vn/Api/AddItems";
    static readonly DomainGetURLBase = "http://localhost:64457/Api/AddItems";
    static readonly DomainFile = "https://ctm-cms.myg.vn";
}

export class IDGame{

    static readonly Game14doc = "eff9ebb0-fa8e-481e-a157-042a99a53f54";
    static readonly GameChimcanhcut = "181c6063-5465-4196-8b39-b77ec1171324";
    static readonly Game11 = "283eb7e5-6172-4081-874f-a00b4d11e7d1";
    static readonly Game14ngang = "3b19a28a-1675-4aee-8977-b544ddc8eb15";
    static readonly GameBongbong = "3c5e8770-a6ab-48d4-ac4d-d6fd948aaf2a";
    static readonly GamePhudong = "623872e5-067a-4477-a977-3bf0f3bc3552";
}

