var score = 0
var lives = 3
var speed = 5
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
var collisionCoords={x:null,y:null}
var entities = [
    {id:"player1",x:13,y:1,top:50,left:650,anim:1,image:"pacman"},
    {id:"player2",x:1,y:1,top:50,left:50,anim:1,image:"ms-pacman"},
    {id:"ghost",x:7,y:7,top:350,left:350,moving:false}
]

function drawEntity(entity){
    document.getElementById(entity.id).style.top = entity.top + "px"
    document.getElementById(entity.id).style.left = entity.left + "px"
}

function moveEntity(entity){
    switch(document.getElementById(entity.id).className){
        case "cell":
            entity.y = Math.round(entity.top/50)
            entity.top = entity.y*50
            if(world[entity.y][entity.x+1]!=1)
                entity.left+=speed
            entity.x = Math.floor(entity.left/50)
            break
        case "cell r90":
            entity.x = Math.round(entity.left/50)
            entity.left = entity.x*50
            if(world[entity.y+1][entity.x]!=1)
                entity.top+=speed
            entity.y = Math.floor(entity.top/50)
            break
        case "cell r180":
            entity.y = Math.round(entity.top/50)
            entity.top = entity.y*50
            if(world[entity.y][entity.x-1]!=1)
                entity.left-=speed
            entity.x = Math.floor((entity.left-1)/50)+1
            break
        case "cell r270":
            entity.x = Math.round(entity.left/50)
            entity.left = entity.x*50
            if(world[entity.y-1][entity.x]!=1)
                entity.top-=speed
            entity.y = Math.floor((entity.top-1)/50)+1
            break
    }
    drawEntity(entity)
    checkScore(entity)
}

setInterval(moveEntity,20,entities[0])
setInterval(moveEntity,20,entities[1])

function moveGhost(){
    while(true && !entities[2].moving){
        var random = Math.floor(Math.random() * 4)
        if(random == 0){
            if(world[entities[2].y][entities[2].x-1] != 1){
                entities[2].x--
                entities[2].moving = true
                var moving = setInterval(function(){
                    entities[2].left-=speed
                    drawEntity(entities[2])
                    if(entities[2].left/50==entities[2].x){
                        clearInterval(moving)
                        entities[2].moving = false
                    }
                },20)
                break
            }
        }else if(random == 1){
            if(world[entities[2].y][entities[2].x+1] != 1){
                entities[2].x++
                entities[2].moving = true
                var moving = setInterval(function(){
                    entities[2].left+=speed
                    drawEntity(entities[2])
                    if(entities[2].left/50==entities[2].x){
                        clearInterval(moving)
                        entities[2].moving = false
                    }
                },20)
                break
            }
        }else if(random == 2){
            if(world[entities[2].y+1][entities[2].x] != 1){
                entities[2].y++
                entities[2].moving = true
                var moving = setInterval(function(){
                    entities[2].top+=speed
                    drawEntity(entities[2])
                    if(entities[2].top/50==entities[2].y){
                        clearInterval(moving)
                        entities[2].moving = false
                    }
                },20)
                break
            }

        }else if(random == 3){
            if(world[entities[2].y-1][entities[2].x] != 1){
                entities[2].y--
                entities[2].moving = true
                var moving = setInterval(function(){
                    entities[2].top-=speed
                    drawEntity(entities[2])
                    if(entities[2].top/50==entities[2].y){
                        clearInterval(moving)
                        entities[2].moving = false
                    }
                },20)
                break;
            }
        }
    }
}
drawEntity(entities[2])
setInterval(moveGhost,200)

function checkGhost(player){
    if(entities[2].x == player.x && entities[2].y == player.y && collisionCoords.x!=player.x && collisionCoords.y!=player.y){
        collisionCoords.x = player.x
        collisionCoords.y = player.y
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

setInterval(checkGhost,20,entities[0])
setInterval(checkGhost,20,entities[1])

function checkScore(player){
    if(world[player.y][player.x] != 0){
        switch(world[player.y][player.x]){
            case 2:
                score += 5
                clearCell(player.x,player.y)
                break
            case 3:
                score += 10
                clearCell(player.x,player.y)
                break
            case 4:
                score += 50
                clearCell(player.x,player.y)
                break
        }
        document.getElementById("score").innerHTML = "SCORE: "+score
        if(document.getElementsByClassName("point-small").length==0 && document.getElementsByClassName("point-big").length==0){
            document.getElementById("lives").innerHTML = "YOU WIN!"
            document.getElementById("player1").style.display = "none"
            document.getElementById("player2").style.display = "none"
        }
    }
}

function clearCell(x,y){
    world[y][x] = 0
    rows[y].children[x].className = "cell"
}

function animatePlayer(player){
    player.anim++
    if(player.anim>=4)
        player.anim=1
    document.getElementById(player.id).style.backgroundImage = "url('images/"+player.image+player.anim+".png')"
}

setInterval(animatePlayer,100,entities[0])
setInterval(animatePlayer,100,entities[1])

function spawnCherry(){
    if(world[4][7] == 0){
        world[4][7] = 4
        rows[4].children[7].className="cell cherry"
    }
    clearInterval(cherryThread)
    cherryThread = setInterval(spawnCherry,(Math.random()*5000)+5000)
}
var cherryThread = setInterval(spawnCherry,(Math.random()*5000)+5000)

document.onkeydown = function(e){
    if(lives > 0){
        if(e.keyCode == 37){//left
            document.getElementById("player1").className="cell r180"
        }
        if(e.keyCode == 39){//right
            document.getElementById("player1").className="cell"
        }
        if(e.keyCode == 38){//up
            document.getElementById("player1").className="cell r270"
        }
        if(e.keyCode == 40){//down
            document.getElementById("player1").className="cell r90"
        }
        if(e.keyCode == 65){//left
            document.getElementById("player2").className="cell r180"
        }
        if(e.keyCode == 68){//right
            document.getElementById("player2").className="cell"
        }
        if(e.keyCode == 87){//up
            document.getElementById("player2").className="cell r270"
        }
        if(e.keyCode == 83){//down
            document.getElementById("player2").className="cell r90"
        }
    }
}