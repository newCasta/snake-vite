import type { Game } from '../classes/Game'
import { Position } from './general'

export interface SnakeOptions {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    game: Game
}

export type SnakeBody = Position[]
