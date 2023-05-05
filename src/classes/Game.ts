import { $ } from '../utils/funcs'
import { Apple } from './Apple'
import { Snake } from './Snake'

interface GameOptions {
    canvas: HTMLCanvasElement
    width: number
    height: number
}

export class Game {
    canvas
    ctx
    width
    height
    interval?: number
    snake
    apple
    lose

    constructor(options: GameOptions) {
        this.canvas = options.canvas
        this.width = options.width
        this.height = options.height
        this.init()

        this.ctx = this.canvas.getContext('2d')!
        this.snake = new Snake({
            ctx: this.ctx,
            game: this,
            canvas: this.canvas
        })
        this.apple = new Apple({
            ctx: this.ctx,
            snake: this.snake
        })
        this.lose = false
    }

    init() {
        this.canvas.width = this.width
        this.canvas.height = this.height
    }

    clearScreen() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    isGameOver() {
        if (this.lose) {
            clearInterval(this.interval)

            $<HTMLButtonElement>('#restart').style.display = 'inline-block'
        }
    }

    drawBorder() {
        this.ctx.beginPath()
        this.ctx.lineWidth = 32
        this.ctx.strokeStyle = '#a0a0a0'
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.stroke()
    }

    run() {
        this.interval = setInterval(() => {
            this.clearScreen()
            this.apple.update()
            this.snake.update()
            this.drawBorder()
            this.isGameOver()
        }, 1000 / 15)
    }
}
