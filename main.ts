function draw_ball () {
    led.plot(Ball_x, Ball_y)
}
radio.onReceivedNumber(function (receivedNumber) {
    pair = 1
    wed = receivedNumber
    if (receivedNumber == 5) {
        if (samuelcanteli == 0) {
            basic.showString("Get Ready")
            basic.pause(5000)
            samuelcanteli = 1
            state = "startup"
        } else {
        	
        }
    } else if (receivedNumber == wed) {
        pair = 1
        basic.showLeds(`
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            . . . . .
            `)
    } else if (receivedNumber == 6) {
        radio.sendNumber(6)
    } else if (receivedNumber == 7) {
    	
    } else {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
})
input.onButtonPressed(Button.A, function () {
    Paddle += -1
})
function ball_has_hit_paddle () {
    if (Paddle - 1 <= Ball_x && Paddle + 1 >= Ball_x) {
        return true
    } else {
        return false
    }
}
function update_balls_direction () {
    if (Ball_y == 1 && !(ball_has_hit_paddle())) {
        state = "dead"
    } else if (Ball_y == 1) {
        scoar += 1
        Ball_direction = "down"
        music.playTone(262, music.beat(BeatFraction.Sixteenth))
    } else if (Ball_y == 5) {
        Ball_direction = "up"
        Ball_x = randint(0, 4)
    }
}
function init () {
    music.startMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once)
    Paddle = 2
    Ball_x = 2
    Ball_y = 1
    Ball_direction = "down"
}
input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(5)
    if (samuelcanteli == 0) {
        radio.sendNumber(6)
        basic.showString("Get Ready")
        basic.pause(5000)
        samuelcanteli = 1
        state = "startup"
    } else {
    	
    }
})
function update_balls_position () {
    update_balls_direction()
    if (Ball_direction == "down") {
        Ball_y += 1
    } else {
        Ball_y += -1
    }
}
radio.onReceivedString(function (receivedString) {
    if ("You Win" == receivedString) {
        game.setScore(scoar)
        game.gameOver()
    }
})
input.onButtonPressed(Button.B, function () {
    Paddle += 1
})
function draw_screen () {
    basic.clearScreen()
    draw_paddle()
    draw_ball()
}
function draw_paddle () {
    led.plot(Paddle - 1, 0)
    led.plot(Paddle, 0)
    led.plot(Paddle + 1, 0)
}
let Ball_direction = ""
let scoar = 0
let Paddle = 0
let state = ""
let wed = 0
let Ball_y = 0
let Ball_x = 0
let pair = 0
let samuelcanteli = 0
let jdk = 0
let nicholasdinicola = 0
samuelcanteli = 0
pair = 0
let id = control.deviceSerialNumber()
while (pair == 0) {
    basic.pause(1000)
    radio.sendNumber(id)
    basic.pause(1000)
}
basic.showLeds(`
    . . . . #
    . . . # .
    # . # . .
    . # . . .
    . . . . .
    `)
basic.forever(function () {
	
})
basic.forever(function () {
    if (state == "startup") {
        init()
        state = "playing"
    } else if (state == "dead") {
        music.startMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once)
        radio.sendString("You Win")
        basic.pause(5000)
        basic.showNumber(scoar)
        game.setScore(scoar)
        game.gameOver()
    } else if (state == "playing") {
        draw_screen()
        basic.pause(200)
        update_balls_position()
    }
})
