var PrototypeApp = CGSGScene.extend(
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
     * Diese Funktion Stellt einen Szenenaufbau bereit der dem späteren Spiel
     * entsprechen soll
     *
     */
    protoScene: function(rootNode) {

    var viewDim = cgsgGetRealViewportDimension();

    if(viewDim.width<1333 || viewDim.height < 800)
    {
        var nwidth  = viewDim.width/1333.0;
        var nheight = viewDim.height/800.0;
        if(nwidth < nheight)
            rootNode.scaleTo(nwidth,nwidth);
        else
            rootNode.scaleTo(nheight,nheight);
    }

    var sG = this.sceneGraph;

    dragFunc = function (event) {
        console.log("drag end at " + event.position.x);
        console.log(event);
        console.log(event.node);

        // Auf dem Wegwerfstapel?
        // Auf der SpielflÃ¤che
        // Oder Irgends.... ZurÃ¼ck vorher du gekommen bist...
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

    // Fügt die Spielerkarten hinzu
    
    var node = new CGSGNodeText(20,20,"Spieler");
    node.setSize(40);

    node.translateTo(viewDim.width/2-(2.5*150)-node.getWidth()-50,viewDim.height-200);

    rootNode.addChild(node);

    colors = new Array("dodgerblue","yellowgreen","white","gold","crimson","firebrick");

    for(var i=0;i < 5; i++)
    {
        var card = new CardNode(viewDim.width/2-(2.5*150)+i*150,viewDim.height-240, colors[Math.floor((Math.random()*5))]);
        card.scaleTo(0.25,0.25);
        card.onDragEnd=dragFunc;
 
        //add your square as child of the root node
        rootNode.addChild(card);
    }


    var playerName= new Array("Verena","Christine","Jared","Juliane");


    for(var i = 0; i < 4; i++)
    {
        var pNode = new PlayerNode(20,20+i*90,"Spieler "+ (i+1) +": " + playerName[i]);
        rootNode.addChild(pNode);
    }

    }
    
    //

    }
);
