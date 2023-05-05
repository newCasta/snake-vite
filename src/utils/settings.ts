import { Direction } from '../types/general'

const up = { id: 'up', values: { x: 0, y: -16 } } as Direction
const down = { id: 'down', values: { x: 0, y: 16 } } as Direction
const left = { id: 'left', values: { x: -16, y: 0 } } as Direction
const right = { id: 'right', values: { x: 16, y: 0 } } as Direction

export const directions = {
    up,
    down,
    left,
    right
}
