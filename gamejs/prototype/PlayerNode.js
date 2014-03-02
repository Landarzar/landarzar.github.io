
var PlayerNode = CGSGNode.extend(
    {
        //constructor.
        // You can specify any parameters you need
        initialize:function (x, y, name) {

            //call the constructor of the parent class.
            // CGSGNode take 4 parameters : x, y, width, height
            this._super(x, y, 0, 0);


            var nNode = new CGSGNodeText(x,y ,name);
            this.addChild(nNode);
            dragFunc = function (event) {
                console.log("drag end at " + event.position.x);
                console.log(event);
                console.log(event.node);

                // Auf dem Wegwerfstapel?
                // Auf der Spielfläche
                // Oder Irgends.... Zurück vorher du gekommen bist...
                //
                
                console.log(event.node.position.x);
                console.log(event.node.position.y);
                
                console.log("Try to animate...");
                // animate(note,attribute,duration,from,to,"linear",delay,precompute)
                //sG.animate(square, "position.x", 60,event.position[0].x,20,"linear",3,true);
                //sG.animate(square, "position.y", 60,event.position[0].y,20,"linear",3,true);
                sG.animate(event.node, "position.x", 20,event.node.position.x,event.node.shouldPos.x,"linear",3,true);
                sG.animate(event.node, "position.y", 20,event.node.position.y,event.node.shouldPos.y,"linear",3,true);
            };

            
            var colors = new Array("dodgerblue","yellowgreen","white","gold","crimson","firebrick");
            for(var i=0;i < 5; i++)
            {
                var card = new CardNode(i*100,y+nNode.getHeight()+20, colors[Math.floor((Math.random()*5))]);
                card.scaleTo(0.15,0.15);
                card.onDragEnd = dragFunc;
 
                //add your square as child of the root node
                this.addChild(card);
            }
 
            //...
        },
 
        /**
         * Custom rendering.
         * You must define this method and declare inside what is the rendering loop
         *  for this node.
         * Here we will just draw a square
         * @method render
         * @override
         * @protected
         * @param {CanvasRenderingContext2D} context the context into render the node
         * */
        render:function (context) {
            //save current state
            this.beforeRender(context);


            //restore state
            this.afterRender(context);
        },
 
        /**
         * Return a copy of this node
         * @method copy
         * @override
         * @return {CGSGNodeSquare} a copy of this node
         */
        copy:function () {
            var node = new CustomNode(this.position.x, this.position.y,
                                      this.dimension.width, this.dimension.height);
            //call the super method
            node = this._super(node);
 
            node.color = this.color;
            return node;
        }
    }
);

