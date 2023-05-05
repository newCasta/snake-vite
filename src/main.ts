import { Game } from './classes/Game.ts'
import './style.css'
import { $ } from './utils/funcs.ts'

const canvas = $<HTMLCanvasElement>('#game')
const restart = $<HTMLButtonElement>('#restart')

restart.addEventListener('click', () => {
    location.reload()
})

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game({
        canvas,
        width: 16 * 27,
        height: 16 * 27
    })

    game.run()
})
