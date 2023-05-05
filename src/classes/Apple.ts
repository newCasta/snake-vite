import type { AppleOptions } from '../types/apple'
import { Position } from '../types/general'
import FoodSound from '../assets/eat.wav'

export class Apple {
    ctx
    snake
    pos

    constructor(options: AppleOptions) {
        this.ctx = options.ctx
        this.snake = options.snake
        this.pos = this.placeApple()
    }

    randomPosition() {
        return (Math.floor(Math.random() * 24) + 1) * 16
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = '#d95763'
        this.ctx.fillRect(this.pos.x, this.pos.y, 16, 16)
        this.ctx.stroke()
    }

    placeApple() {
        let x = this.randomPosition()
        let y = this.randomPosition()

        while (this.snake.isTouchingBody({ x, y })) {
            x = this.randomPosition()
            y = this.randomPosition()
        }

        return { x, y } as Position
    }

    collision() {
        const head = this.snake.body[0]
        const foodSound = new Audio(FoodSound)

        if (this.pos.x === head.x && this.pos.y === head.y) {
            foodSound.play()
            this.snake.eaten = true
            this.pos = this.placeApple()
        }
    }

    update() {
        this.draw()
        this.collision()
    }
}
