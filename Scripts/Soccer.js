// Draw a circle that flies inside a box
// When it reaches an edge, it should bounce that edge

window.onload = function () {
    var theCanvas = document.getElementById("the-canvas");
    var ctx = theCanvas.getContext("2d");
	
		var field = {
			width:700,
			height:450,

			goaly: 100,
			goalHeight: 220,

			draw: function(){
			//draw green field
			ctx.fillStyle = "#339933";
			ctx.fillRect(0,0,700,450);

			//draw goals
			ctx.strokeStyle = "#ffffff";
			ctx.lineWidth = 3;
			ctx.strokeRect(0,field.goaly,60,field.goalHeight);
			ctx.strokeRect(700-60,field.goaly,60,field.goalHeight);

			//draw middle line

			ctx.beginPath();
			ctx.moveTo(350,0);
			ctx.lineTo(350,450);
			ctx.stroke();


			//draw center circle
			ctx.beginPath();
			ctx.arc(350,225,50,0,Math.PI*2,true);
			ctx.stroke();
		}
	};
field.draw();
}