document.addEventListener("keydown",start);
for(i=0;i<document.querySelectorAll("button").length;i++){
    document.querySelectorAll("button")[i].addEventListener("click",clicked);
}
var correct=0;
var colors=["green","red","yellow","blue"];
var level=0;
var correct_order=[];
var current_order=[];


function reset() {
    document.body.classList.add("reset");
    setTimeout(function () {
        document.body.classList.remove("reset");

    },100);
    play("wrong");
    level=0;
    correct_order=[];
    current_order=[];
    document.addEventListener("keydown",start);
    document.querySelector("h1").innerHTML="Game Over!";
}

function start() {
    document.removeEventListener("keydown",start);
        if(correct==1 || (correct_order.length==0 && current_order.length==0)) {
            level++;
            current_order=[];
            document.querySelector("h1").innerHTML = "Level " + level;
            var random_colour_no = Math.floor(Math.random() * 4);
            var random_colour = colors[random_colour_no];
            play(random_colour);
            animate(random_colour);
            correct_order.push(random_colour);
        }
        else{
            reset();
        }
}

function play(color) {
    var sound=new Audio("sounds/"+color+".mp3");
    sound.play();

}

function animate(color) {
    document.querySelector("."+color).classList.add("anim");
    setTimeout(function () {
        document.querySelector("."+color).classList.remove("anim");
    },100);
}

function clicked(color) {
    current_order.push(color.target.className);
    play(color.target.className);
    animate(color.target.className);

    for(i=0;i<current_order.length;i++){
        if(current_order[i]==correct_order[i]){
            correct=1;
        }
        else{
            reset();
            correct=0;
        }
    }
    if(current_order.length==correct_order.length){
        setTimeout(function () {
            start();
        },500);
    }
}