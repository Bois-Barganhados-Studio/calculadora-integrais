const interval = {
    start: 0,
    end: Math.PI*2
}

const equation = (x) => {
    return Math.sin(x)
}

const rectArea = (b, a) => {
    return b * a
}

// types
// 0 -> left
// 1 -> right
const riemann = (interval = interval, n, type = 0) => {
    const distance = interval.end - interval.start

    const rects = Array.from({ length: n }, (v, i) => {
        const width = distance / n
        const x = type === 1 ? width * (i + 1) : width * i

        return {
            x,
            width,
            height: equation(x)
        }
    })

    let sum = 0

    rects.forEach((rect) => {
        sum += rectArea(rect.width, rect.height)
    })

    return sum
}