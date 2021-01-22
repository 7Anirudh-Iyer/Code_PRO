var write,sub,elm
var gS=0
var pC=0
var s
var db
var rese
var b
var blah = 0
var bg,bg1
ar = []
var p1,p2,p3,p4,p5,p6,p7
var s1,s2,s3,s4
var l,lava
var r,rock
var run
var t

function preload(){
    bg=loadImage('seaimage.jfif')
    l=loadImage('lavapit.png')
    r=loadImage('rocks.png')
    run=loadAnimation('sprite_0.png','sprite_1.png','sprite_2.png','sprite_3.png','sprite_4.png','sprite_5.png','sprite_6.png','sprite_7.png','sprite_8.png')
}

function setup(){

    canvas = createCanvas(windowWidth,windowHeight)

    db=firebase.database()

    w=windowWidth
    h=windowHeight

    bg1=createSprite(0,0+h/7,10,10)
    bg1.addImage('sea',bg)
    bg1.scale=2.7
    bg1.velocityX=3
    
    p7=createSprite(w/2,h/2,30,30)
    // p7.addAnimation('run7',run)
    // p7.scale=0.3
    p7.visible=false

    p1=createSprite(w/2-p7.width*6,h/2,30,30)
    p1.visible=false
    // p1.addAnimation('run1',run)
    // p1.scale=0.3

    p2=createSprite(w/2-p7.width*4,h/2,30,30)
    p2.visible=false
    // p2.addAnimation('run2',run)
    // p2.scale=0.3
    
    p3=createSprite(w/2-p7.width*2,h/2,30,30)
    p3.visible=false
    // p3.addAnimation('run3',run)
    // p3.scale=0.3
    
    p4=createSprite(w/2+p7.width*6,h/2,30,30)
    p4.visible=false
    // p4.addAnimation('run4',run)
    // p4.scale=0.3
    
    p5=createSprite(w/2+p7.width*4,h/2,30,30)
    p5.visible=false
    // p5.addAnimation('run5',run)
    // p5.scale=0.3
    
    p6=createSprite(w/2+p7.width*2,h/2,30,30)
    p6.visible=false
    // p6.addAnimation('run6',run)
    // p6.scale=0.3
    

    write=createInput(' ')
    write.position(w/2-write.width/2,h/3.5)

    sub=createButton('Submit')
    sub.position(w/2-sub.width/2,h/2.5)

    rese=createButton('Reset')
    rese.position(w/2-rese.width/2,h/1.5)

    ar = [p1,p2,p3,p4,p5,p6,p7]

    db.ref('gS').on('value',function(data){
        va=data.val()
        gS=va
    })

    db.ref('pC').on('value',function(data){
        vari=data.val()
        pC=vari
    })
     
}

function draw(){
    background(0,0,255)

    if(bg1.x>w){
        bg1.x=0
    }

    sub.mousePressed(function(){
        b=write.value()
        t=createElement('h4')
        t.position(w/2-w/8,h/2)
        t.html('Welcome '+b+'. We are waiting for other players.')
    
        db.ref('/').update({
            pC: pC,
        })

        pC+=1
        blah=pC
    
        db.ref('players/player'+pC).set({
            y: h/2,
            x: w/2,
            pln: pC,
          })
    })

    rese.mousePressed(reset)

    if(pC===7){
        gS=1

        db.ref('/').update({
            gS: gS,
        })
    }

    if(b===undefined&&gS===1){
        db.ref('players').on('value',function(data){
            b=data.val()
        })
    }

    if(gS==1){
        background(0)
        write.hide()
        sub.hide()

        p1.visible=true
        p2.visible=true
        p3.visible=true
        p4.visible=true
        p5.visible=true
        p6.visible=true
        p7.visible=true

        var index = 0
        var x = w/2

        for(var i in b){
           ar[index].x=b[i].x
           ar[index].y=b[i].y

           if(blah-1==index){
               camera.position.y=ar[blah-1].y
               camera.position.x=ar[blah-1].x
           }

           index++
        }

        if(keyDown('up')){
            ar[blah-1].y-=20
            db.ref('players/player'+blah).update({
                y: ar[blah-1].y
            })
        }

        if(keyDown('down')){
            ar[blah-1].y+=20
            db.ref('players/players'+blah).update({
                y: ar[blah-1].y
            })
        }

    }
    
    drawSprites();
}


function reset(){
    db.ref('/').update({
        gS: 0,
        pC: 0,
        players: null,
    })
}