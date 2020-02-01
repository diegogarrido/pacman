var score = 0
var lives = 5
var worldDict={0:"blank",1:"wall",2:"point-small",3:"point-big",4:"cherry"}
var world = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,2,2,1,2,2,3,2,2,1,2,2,0,1],
    [1,2,1,2,2,2,1,1,1,2,2,2,1,2,1],
    [1,2,1,2,1,2,2,1,2,2,1,2,1,2,1],
    [1,3,1,2,1,1,2,0,2,1,1,2,1,3,1],
    [1,2,1,2,1,2,2,1,2,2,1,2,1,2,1],
    [1,2,1,2,2,2,1,1,1,2,2,2,1,2,1],
    [1,2,2,2,1,2,2,3,2,2,1,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]
var rows = document.getElementsByClassName("row")

var player1 = {x:13,y:1}
var player2 = {x:1,y:1}
var ghost = {x:8,y:7}

function drawPlayer1(){
    document.getElementById("player1").style.top = player1.y * 50 + "px"
    document.getElementById("player1").style.left = player1.x * 50 + "px"
}
function drawPlayer2(){
    document.getElementById("player2").style.top = player2.y * 50 + "px"
    document.getElementById("player2").style.left = player2.x * 50 + "px"
}
function drawGhost(){
    document.getElementById("ghost").style.top = ghost.y * 50 + "px"
    document.getElementById("ghost").style.left = ghost.x * 50 + "px"
}
drawPlayer1()
drawPlayer2()
drawGhost()

function moveGhost(){
    while(true){
        var random = Math.floor(Math.random() * 4)
        if(random == 0){
            if(world[ghost.y][ghost.x-1] != 1){
                ghost.x--
                break
            }
        }else if(random == 1){
            if(world[ghost.y][ghost.x+1] != 1){
                ghost.x++
                break
            }
        }else if(random == 2){
            if(world[ghost.y+1][ghost.x] != 1){
                ghost.y++
                break
            }
        }else if(random == 3){
            if(world[ghost.y-1][ghost.x] != 1){
                ghost.y--
                break;
            }
        }
    }
    drawGhost()
    checkGhost(player1)
    checkGhost(player2)
    setTimeout(moveGhost,500)
}
moveGhost()

function checkGhost(player){
    if(ghost.x == player.x && ghost.y == player.y){
        lives--
        if(lives>0){
            var hearts = ""
            for(var i = 0;i < lives; i++){
                hearts+= "♥ "
            }
            document.getElementById("lives").innerHTML = "LIVES: " + hearts
        }else{
            document.getElementById("lives").innerHTML = "GAME OVER!"
            document.getElementById("player1").style.display = "none"
            document.getElementById("player2").style.display = "none"
        }
    }
}

function checkScore(player){
    if(world[player.y][player.x] != 0){
        switch(world[player.y][player.x]){
            case 2:score += 5;break;
            case 3:score += 10;break;
            case 4:score += 50;break;
        }
        document.getElementById("score").innerHTML = "SCORE: "+score
        world[player.y][player.x] = 0
        rows[player.y].children[player.x].className = "cell"
        if(document.getElementsByClassName("point-small").length==0 && document.getElementsByClassName("point-big").length==0){
            document.getElementById("lives").innerHTML = "YOU WIN!"
            document.getElementById("player1").style.display = "none"
            document.getElementById("player2").style.display = "none"
        }
    }
}

var p1anim = 1
function animatePlayer1(){
    p1anim++
    if(p1anim>=4)
        p1anim=1
    document.getElementById("player1").style.backgroundImage = "url('images/pacman"+p1anim+".png')"
    setTimeout(animatePlayer1,100)
}
animatePlayer1()
var p2anim = 1
function animatePlayer2(){
    p2anim++
    if(p2anim>=4)
        p2anim=1
    document.getElementById("player2").style.backgroundImage = "url('images/ms-pacman"+p2anim+".png')"
    setTimeout(animatePlayer2,100)
}
animatePlayer2()

function spawnCherry(){
    var time = Math.floor((Math.random()*10)+10)
    setTimeout(time*1000)
    if(world[4][7] == 0){
        world[4][7] = 4
        rows[4].children[7].className="cell cherry"
    }
    setTimeout(spawnCherry,Math.floor((Math.random()*10)+1)*1000)
}
spawnCherry()

document.onkeydown = function(e){
    if(lives > 0){
        if(e.keyCode == 37){//left
            document.getElementById("player1").className="cell r180"
            moveLeft(player1)
        }
        if(e.keyCode == 39){//right
            document.getElementById("player1").className="cell"
            moveRight(player1)
        }
        if(e.keyCode == 38){//up
            document.getElementById("player1").className="cell r270"
            moveUp(player1)
        }
        if(e.keyCode == 40){//down
            document.getElementById("player1").className="cell r90"
            moveDown(player1)
        }
        if(e.keyCode == 65){//left
            document.getElementById("player2").className="cell r180"
            moveLeft(player2)
        }
        if(e.keyCode == 68){//right
            document.getElementById("player2").className="cell"
            moveRight(player2)
        }
        if(e.keyCode == 87){//up
            document.getElementById("player2").className="cell r270"
            moveUp(player2)
        }
        if(e.keyCode == 83){//down
            document.getElementById("player2").className="cell r90"
            moveDown(player2)
        }
        drawPlayer1()
        drawPlayer2()
        checkGhost(player1)
        checkGhost(player2)
    }
    checkScore(player1)
    checkScore(player2)
}

function moveLeft(player){
    if(world[player.y][player.x-1] != 1){
        player.x--
    }
}

function moveRight(player){
    if(world[player.y][player.x+1] != 1){
        player.x++
    }
}

function moveUp(player){
    if(world[player.y-1][player.x] != 1){
        player.y--
    }
}

function moveDown(player){
    if(world[player.y+1][player.x] != 1){
        player.y++
    }
}