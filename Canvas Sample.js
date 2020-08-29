const colors = ["aqua","red","blue","green","orange","yellow","pink","grey",
				"brown","chartreuse","chocolate", "darkcyan","tomato","purple","gold"];
var Triangles = [];

var canvas = document.getElementById("myCanvas");
const canvas_position = canvas.getBoundingClientRect();
var canvas_element = canvas.getContext("2d");

startDraw();
function startDraw() {
	var startX, startY;
	var leftX, leftY;
	var rightX, rightY;
	var color;
	var triangle;
	var x,y;
	var saveData;
	
	Triangles = [];
	canvas_element.clearRect(0,0,500,300);
	canvas.onmousedown = event => startdraw(event);
}

/////////// mousedown event function ////////////

function startdraw(event) {
	startX = event.clientX - canvas_position.left;
	startY = event.clientY - canvas_position.top;
	color = colors[Math.floor(Math.random() * colors.length)]
	
	saveData = canvas_element.getImageData(0, 0, canvas.width, canvas.height);
	canvas.onmousemove = event => drawing(event);
	canvas.onmouseup = event => enddraw(event);
}

////////// mouseMove event function //////////////

function drawing(event) {
	var Length = (event.clientX - canvas_position.left) - startX;
	leftX = ((event.clientX - canvas_position.left) - (Length * 2));
	leftY = event.clientY - canvas_position.top;
	rightX = event.clientX - canvas_position.left;
	rightY = event.clientY - canvas_position.top;
	
	triangle = {
		start_x: startX,
		start_y: startY,
		left_x: leftX,
		left_y: leftY,
		right_x: rightX,
		right_y: rightY,
		color: color
	};
	
	draw(triangle);
}

////////// mouseup event function ////////////////

function enddraw(event){
	if(triangle.start_x)
	{
		Triangles.push(triangle);
		triangle = {};
	}
	canvas.onmousemove = null;
	canvas.onmouseup = null;
}	

////////// Draw function for drawing new triangle ////////////

function draw(triangle) {
	canvas_element.putImageData(saveData, 0, 0);
	canvas_element.beginPath();
	canvas_element.moveTo(triangle.start_x, triangle.start_y);
	canvas_element.lineTo(triangle.left_x, triangle.left_y);
	canvas_element.lineTo(triangle.right_x, triangle.right_y);
	canvas_element.lineTo(triangle.start_x, triangle.start_y);
	canvas_element.fillStyle = triangle.color;
	canvas_element.fill();
	canvas_element.stroke();
}

////////// Clear function for existing triangle /////////////

function clear(triangle) {
	canvas_element.beginPath();
	canvas_element.moveTo(triangle.start_x, triangle.start_y);
	canvas_element.lineTo(triangle.left_x, triangle.left_y);
	canvas_element.lineTo(triangle.right_x, triangle.right_y);
	canvas_element.lineTo(triangle.start_x, triangle.start_y);
	canvas_element.fillStyle = triangle.color;
	canvas_element.fill();
	canvas_element.stroke();
}

///////// Double click function to clear the triangle /////////

canvas.ondblclick = ClearTriangle;
function ClearTriangle(event) {
	var Triangle = IsTriangle(event.clientX - canvas_position.left, event.clientY - canvas_position.top);
	if(Triangle) {
		canvas_element.clearRect(0,0,500,300);
		for(let i = 0; i < Triangles.length; i++)
			clear(Triangles[i]);
	}
}


///////// Checking function for existing triangle /////////////

function IsTriangle(ClickedPointX, ClickedPointY) {
	let i,del,flag;
	for(i = 0; i < Triangles.length; i++)
	{
		if(Triangles[i].left_x <= ClickedPointX && Triangles[i].right_x >= ClickedPointX && 
		Triangles[i].start_y <= ClickedPointY  && Triangles[i].left_y >= ClickedPointY)
		{
			del = i;
			flag = 5;
		}
	}
	if(flag === 5)
	{
		Triangles.splice(del,1);
		return true;
	}
	return false;
}


















