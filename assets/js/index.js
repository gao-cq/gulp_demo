let $=require('jquery');
var angular=require('angular');

function function_name (argument) {
	var bb =require("./demo1.js")
	bb()
	require("./demo3.js")
	console.log(1111122+"小明")
}

function hello (str) {
	console.log(angular)
	var div = $("#div")
	div.text(str)
	console.log(str)
	setTimeout(()=>{
		console.log(this)
	},1000)
}


function_name()

var aa={
	name:"小明",
	age:20
}

hello.call(aa,"hello word")