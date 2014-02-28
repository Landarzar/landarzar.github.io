var CustomNode = CGSGNode.extend(
    {
        //constructor.
        // You can specify any parameters you need
        initialize:function (x, y, width, height) {
            //call the constructor of the parent class.
            // CGSGNode take 4 parameters : x, y, width, height
            this._super(x, y, width, height);
 
            /**
             * CGSGNode variable defining the type of the class
             * @property classType
             * @readonly
             * @type {String}
             */
            this.classType = "CustomNode";
 
            //define here every property you need
            this.color = "#ff0000";
 
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
 
            //we draw the rect at (0,0) because we have already translated the context
            // to the correct position
            context.fillRect(0, 0, this.dimension.width, this.dimension.height);
 
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

const cardDim = 1.55;

var CardNode = CGSGNode.extend(
    {
        //constructor.
        // You can specify any parameters you need
        initialize:function (x, y) {

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
            context.fillStyle = "lightblue";
 
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


/*
To create a new class that inherit from a class "Parent":
    var MyClass = Parent.extend(
    {
        //constructor :
        initialize : function(param1, param2) {
            //each properties defined with "this." is global to the class
            this.x = param1;
        },
     
        myMethod : function(x) {
        }
    }
    );
 
Then, to instanciate it:
    var instance = new MyClass(23, 54);
*/
var App = CGSGScene.extend(
    {
        // 'initialize' is the constructor. It takes here 1 parameter : a handler to the canvas HTMLElement
        initialize : function (canvas) {
            //call constructor of the parent : CGSGScene
            this._super(canvas);
 
            //Fill the graph with your nodes
            this.createScene();
 
            //start to play !
            //this method is from the framework
            this.startPlaying();
        },
 
        /**
         * Just create a single node (a square node)
         * @method createScene
         */
    createScene : function () {
    //first, define an arbitrary node as root node
    var rootNode = new CGSGNode(0, 0, 0, 0);
    this.sceneGraph.addNode(rootNode, null);
//this code can be executed in the main class that inherit from CGSGScene
var viewDimension = cgsgGetRealViewportDimension();
    console.log(viewDimension);
 //update the canvas size and the framework in 1 call
this.setCanvasDimension(viewDimension);
 
    this.protoScene(rootNode);
    },

    /*
     * Diese Funktion Stellt einen Szenenaufbau bereit der dem sp�teren Spiel
     * entsprechen soll
     *
     */
    protoScene: function(rootNode) {
    
    var viewDim = cgsgGetRealViewportDimension();

    var sG = this.sceneGraph;

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
        sG.animate(event.node, "position.x", 35,event.node.position.x,event.node.shouldPos.x,"linear",3,true);
        sG.animate(event.node, "position.y", 35,event.node.position.y,event.node.shouldPos.y,"linear",3,true);
    };

    for(i=0;i < 5; i++)
    {
    var card = new CardNode(viewDim.width/2-(2.5*150)+i*150,viewDim.height-240);
    card.scaleTo(0.25,0.25);
    card.onDragEnd=dragFunc;
 
    //add your square as child of the root node
    rootNode.addChild(card);}

    }
 
    }
);
