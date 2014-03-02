
var CardNode = CGSGNode.extend(
    {
        //constructor.
        // You can specify any parameters you need
        initialize:function (x, y, color="dodgerblue") {

            //call the constructor of the parent class.
            // CGSGNode take 4 parameters : x, y, width, height
            this._super(x, y, 560, 870);


            this.shouldPos = new CGSGPosition(x,y);

            this.isDraggable = true;

            /**
             * CGSGNode variable defining the type of the class
             * @property classType
             * @readonly
             * @type {String}
             */
            this.classType = "CardNode";
 
            //define here every property you need
            this.color = "#ff0000";
            this.color = color;

            var height = this.dimension.height;
            var width  = this.dimension.width;
            
            // Zahlen in den Ecken
            var dis = 40;
            var nodeOL = new CGSGNodeText(dis,dis,"2");
            nodeOL.setSize(60);
            var nodeUR = new CGSGNodeText(dis,dis,"2");
            nodeUR.setSize(60);
            nodeUR.translateTo(width-dis-nodeUR.getWidth(),height-dis-nodeUR.getHeight());
            var nodeUL = new CGSGNodeText(dis,dis,"2");
            nodeUL.setSize(60);
            nodeUL.translateTo(dis,height-dis-nodeUL.getHeight());
            var nodeOR = new CGSGNodeText(dis,dis,"2");
            nodeOR.setSize(60);
            nodeOR.translateTo(width-dis-nodeOR.getWidth(),dis);

            this.addChild(nodeOL);
            this.addChild(nodeOR);
            this.addChild(nodeUL);
            this.addChild(nodeUR);

 
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

 
            //apply the global alpha (ie the opacity), that is a CGSGNode property
            context.globalAlpha = this.globalAlpha;
 
            //draw this zone by using the custom property : this.color
            context.fillStyle = this.color;
            context.fillStyle = "white";
 
            //we draw the rect at (0,0) because we have already translated the context
            // to the correct position
            //context.fillRect(0, 0, this.dimension.width/2, this.dimension.height/2);
            
            var height = this.dimension.height;
            var width  = this.dimension.width;

            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(30,0);
            context.arcTo(0,0,0,30,15);
            context.arcTo(0,height,width,height,15);
            context.lineTo(width-30,height);
            context.arcTo(width,height,width,height-30,15);
            context.lineTo(width,30);
            context.arcTo(width,0,width-30,0,15);
            context.closePath();
            context.stroke();
            context.fill();
            context.fillStyle = this.color;
 
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(25+20,25);
            context.arcTo(25,25,25,25+20,15);
            context.arcTo(25,height-25,width-25,height-25,15);
            context.lineTo(width-30-25,height-25);
            context.arcTo(width-25,height-25,width-25,height-30-25,15);
            context.lineTo(width-25,30+25);
            context.arcTo(width-25,25,width-30-25,25,15);
            context.closePath();
            context.stroke();
            context.fill();

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

