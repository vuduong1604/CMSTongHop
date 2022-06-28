import { _decorator, Component, Node, Vec2, Vec3, UITransform, PageView } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('move')
export class move extends Component {

    pos = null;

    insideParent = false;
    onLoad(){
       this.pos = new Vec2(this.node.position.x,this.node.position.y);
       this.node.on(Node.EventType.TOUCH_MOVE, this.onButtonTouchMove, this);
       this.node.on(Node.EventType.TOUCH_END, this.onButtonTouchCancel, this);
    }
    
    onButtonTouchBegin (evt) {
        console.warn('BUTTON TOUCH START');
    }

    onButtonTouchEnd (evt) {
        console.warn('BUTTON TOUCH END');
    }
    nodePageview = null;
    onButtonTouchMove (evt) {
         this.nodePageview = this.node.parent.parent.parent.parent.parent.parent;
        //  console.log(this.nodePageview);
        this.nodePageview.getComponent(PageView).enabled = false;
        
        var x =  this.node.position.x + evt.getUIDelta().x;
        var y =this.node.position.y + evt.getUIDelta().y;
        this.node.setPosition(x,y);
    }

    onButtonTouchCancel (evt) {
        // x = 111, y = 120
        console.log("Node pos: ",this.node.position.x,this.node.position.y);
        var posParentX_left = -(this.node.getParent().getComponent(UITransform).width / 2);
        var posParentX_right = (this.node.getParent().getComponent(UITransform).width / 2);
        var posParentY_up = (this.node.getParent().getComponent(UITransform).height / 2);
        var posParentY_down = -(this.node.getParent().getComponent(UITransform).height / 2);
        console.log("parent Pos: ",posParentX_left,posParentX_right,posParentY_up,posParentY_down);
        if(this.node.position.x > posParentX_left  && this.node.position.x < posParentX_right && this.node.position.y < posParentY_up && this.node.position.y > posParentY_down){
           console.log("in side parent");
           this.insideParent = true;
        }else{
             this.node.setPosition(this.pos.x,this.pos.y);
            console.log("out side parent");
            this.insideParent = false;
        }
        this.nodePageview.getComponent(PageView).enabled = true;
    }
    // &&  this.node.position.y < posParentY_up && this.node.position.y > posParentY_down
}

