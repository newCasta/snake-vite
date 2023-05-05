import type { Position } from '../types/general'
import type { SnakeBody, SnakeOptions } from '../types/snake'
import { directions } from '../utils/settings'

export class Snake {
    ctx
    game
    canvas
    body: SnakeBody
    eaten
    direction
    tail?: Position

    constructor(options: SnakeOptions) {
        this.canvas = options.canvas
        this.ctx = options.ctx
        this.game = options.game
        this.body = [
            {
                x: 16 * 13,
                y: 16 * 13
            }
        ]
        this.eaten = false
        this.direction = directions.left

        this.input()
    }

    get getHead() {
        return this.body[0]
    }

    get isTouchingBorder() {
        const head = this.getHead

        return (
            head.x < 16 ||
            head.x > this.canvas.width - 32 ||
            head.y < 16 ||
            head.y > this.canvas.height - 32
        )
    }

    setDirection(direction: 'up' | 'down' | 'left' | 'right', key: string) {
        const inputs = {
            up:
                key === 'w' &&
                (this.body.length <= 1 || this.direction.id !== 'down'),
            down:
                key === 's' &&
                (this.body.length <= 1 || this.direction.id !== 'up'),
            left:
                key === 'a' &&
                (this.body.length <= 1 || this.direction.id !== 'right'),
            right:
                key === 'd' &&
                (this.body.length <= 1 || this.direction.id !== 'left')
        }

        return inputs[direction]
    }

    input() {
        window.addEventListener('keydown', e => {
            const key = e.key

            if (this.setDirection('up', key)) this.direction = directions.up
            else if (this.setDirection('down', key))
                this.direction = directions.down
            else if (this.setDirection('left', key))
                this.direction = directions.left
            else if (this.setDirection('right', key))
                this.direction = directions.right
        })
    }

    movement() {
        const head = this.getHead
        const x = head.x + this.direction.values.x
        const y = head.y + this.direction.values.y
        const newHead = { x, y }

        this.body.unshift(newHead)

        if (!this.eaten) this.tail = this.body.pop()!

        this.eaten = false
    }

    drawPart(x: number, y: number) {
        this.ctx.beginPath()
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(x, y, 16, 16)
        this.ctx.stroke()
    }

    draw() {
        for (const part of this.body) this.drawPart(part.x, part.y)
    }

    isTouchingHead(pos: Position) {
        const head = this.getHead

        return head.x === pos.x && head.y === pos.y
    }

    isTouchingBody(pos: Position) {
        const body = this.body.filter((_, i) => i !== 0)

        return body.some(p => p.x === pos.x && p.y === pos.y)
    }

    collisions() {
        const head = this.getHead

        if (this.isTouchingBody(head) || this.isTouchingBorder) {
            this.body.push(this.tail!)
            this.game.lose = true
            this.draw()
        }
    }

    update() {
        this.movement()
        this.draw()
        this.collisions()
    }
}
