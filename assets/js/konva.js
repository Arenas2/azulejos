app.directive('konva', function() {

    var width = window.innerWidth;
   var height = window.innerHeight;
   var stage = new Konva.Stage({
     container: 'container',
     width: width,
     height: height
   });
   var layer = new Konva.Layer();
   var rect = new Konva.Rect({
     x: 50,
     y: 50,
     width: 100,
     height: 50,
     fill: 'green',
   });

   layer.add(rect);

   stage.add(layer);

});
