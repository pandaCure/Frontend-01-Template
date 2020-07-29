import { createElement, Text, Wrapper } from './createElement'
import { Timeline, Animation } from './animation.js'
import { cubicBezier } from './cubicBezier.js'

let ease = cubicBezier(0.25, 0.1, 0.25, 1)
const duration = 3000

export class Carousel {
  constructor() {
    // config
    this.children = []
  }
  setAttribute(name, value) {
    // attribute
    this[name] = value
  }

  render() {
    let tl = new Timeline()
    let nextPicHandler = null
    tl.start()

    let children = this.data.map((url, currentPosition) => {
      let lastPosition =
        (currentPosition - 1 + this.data.length) % this.data.length
      let nextPosition = (currentPosition + 1) % this.data.length

      let offset = 0
      let handleStart = () => {
        tl.pause()
        clearTimeout(nextPicHandler)
        let currentElement = children[currentPosition]
        offset =
          currentPosition * 500 +
          Number(
            currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]
          )
      }
      let handlePan = (event) => {
        let currentElement = children[currentPosition]
        let lastElement = children[lastPosition]
        let nextElement = children[nextPosition]

        let dx = event.detail.clientX - event.detail.startX
        let currentTransformValue = -500 * currentPosition + offset + dx
        let lastTransformValue = -500 - 500 * lastPosition + offset + dx
        let nextTransformValue = 500 - 500 * nextPosition + offset + dx

        currentElement.style.transform = `translateX(${currentTransformValue}px)`
        lastElement.style.transform = `translateX(${lastTransformValue}px)`
        nextElement.style.transform = `translateX(${nextTransformValue}px)`
      }

      let handlePanend = (event) => {
        let direction = 0
        let dx = event.detail.clientX - event.detail.startX
        if (dx + offset > 250) {
          direction = 1
        } else if (dx + offset < -250) {
          direction = -1
        }
        tl.reset()
        tl.start()

        let currentElement = children[currentPosition]
        let lastElement = children[lastPosition]
        let nextElement = children[nextPosition]

        let currentAnimation = new Animation({
          object: currentElement.style,
          porperty: 'transform',
          start: -500 * currentPosition + offset + dx,
          end: direction * 500 - 500 * currentPosition,
          duration: 500,
          timingFunction: ease,
          template: (v) => `translateX(${v}px)`
        })
        let lastAnimation = new Animation({
          object: lastElement.style,
          porperty: 'transform',
          start: -500 - 500 * lastPosition + offset + dx,
          end: -500 + direction * 500 - 500 * lastPosition,
          duration: 500,
          timingFunction: ease,
          template: (v) => `translateX(${v}px)`
        })
        let nextAnimation = new Animation({
          object: nextElement.style,
          porperty: 'transform',
          start: 500 - 500 * nextPosition + offset + dx,
          end: 500 - 500 * nextPosition + direction * 500,
          duration: 500,
          timingFunction: ease,
          template: (v) => `translateX(${v}px)`
        })

        tl.add(currentAnimation)
        tl.add(lastAnimation)
        tl.add(nextAnimation)
        nextPicHandler = setTimeout(nextPic, 3000)
      }

      let handleFlick = (event) => {
        let direction = 0
        let dx = event.detail.clientX - event.detail.startX
        if (dx > 0) {
          direction = 1
        } else {
          direction = -1
        }
        tl.reset()
        tl.start()

        let currentElement = children[currentPosition]
        let lastElement = children[lastPosition]
        let nextElement = children[nextPosition]

        let currentAnimation = new Animation({
          object: currentElement.style,
          porperty: 'transform',
          start: -500 * currentPosition + offset + dx,
          end: direction * 500 - 500 * currentPosition,
          duration: 500,
          timingFunction: ease,
          template: (v) => `translateX(${v}px)`
        })
        let lastAnimation = new Animation({
          object: lastElement.style,
          porperty: 'transform',
          start: -500 - 500 * lastPosition + offset + dx,
          end: -500 + direction * 500 - 500 * lastPosition,
          duration: 500,
          timingFunction: ease,
          template: (v) => `translateX(${v}px)`
        })
        let nextAnimation = new Animation({
          object: nextElement.style,
          porperty: 'transform',
          start: 500 - 500 * nextPosition + offset + dx,
          end: 500 - 500 * nextPosition + direction * 500,
          duration: 500,
          timingFunction: ease,
          template: (v) => `translateX(${v}px)`
        })

        tl.add(currentAnimation)
        tl.add(lastAnimation)
        tl.add(nextAnimation)
        nextPicHandler = setTimeout(nextPic, 3000)
      }
      let element = (
        <img
          src={url}
          enableGesture={true}
          onStart={handleStart}
          onPan={handlePan}
          onPanend={handlePanend}
          onFlick={handleFlick}
        />
      )
      element.addEventListener('dragstart', (e) => e.preventDefault())
      element.style.transform = 'translateX(0)'
      return element
    })
    let root = <div class='carousel'>{children}</div>
    let position = 0

    let nextPic = () => {
      let nextPosition = (position + 1) % this.data.length
      let current = children[position]
      let next = children[nextPosition]

      let currentAnimation = new Animation({
        object: current.style,
        porperty: 'transform',
        start: -100 * position,
        end: -100 - 100 * position,
        duration: 1000,
        timingFunction: ease,
        template: (v) => `translateX(${v * 5}px)`
      })
      let nextAnimation = new Animation({
        object: next.style,
        porperty: 'transform',
        start: 100 - 100 * nextPosition,
        end: -100 * nextPosition,
        duration: 1000,
        timingFunction: ease,
        template: (v) => `translateX(${v * 5}px)`
      })

      tl.add(currentAnimation)
      tl.add(nextAnimation)

      position = nextPosition

      nextPicHandler = setTimeout(nextPic, 3000)
    }
    nextPicHandler = setTimeout(nextPic, 3000)

    return root
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }
}
