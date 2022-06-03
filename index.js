import {Color, Point, dot, unitVector} from './vec3.js'
import writeColor from './color.js'
import Ray from './ray.js'

const hitSphere = (center, radius, ray) => {
  const oc = ray.origin.sub(center)
  const a = dot(ray.direction, ray.direction)
  const b = 2.0 * dot(oc, ray.direction)
  const c = dot(oc, oc) - radius * radius
  const discriminant = b * b - 4 * a * c
  // console.log(`oc: `, oc)
  // console.log(`a: `, a)
  // console.log(`b: `, b)
  // console.log(`c: `, c)
  // console.log(`discriminant: `, discriminant)
  if (discriminant < 0) {
    return -1.0
  } else {
    return (-b - Math.sqrt(discriminant)) / (2.0 * a)
  }
}

const rayColor = (r) => {
  let t = hitSphere(new Point(0, 0, -1), 0.5, r)
  if (t > 0.0) {
    const p = new Point(0, 0, -1)
    const n = unitVector(r.at(t).sub(p))
    const color = new Color(n.x + 1, n.y + 1, n.z + 1)
    return color.mul(0.5)
  }
  const unitDirection = unitVector(r.direction)
  t = 0.5 * (unitDirection.y + 1.0)
  const color1 = new Color(1.0, 1.0, 1.0)
  const color2 = new Color(0.5, 0.7, 1.0)
  return color1.mul(1.0 - t).add(color2.mul(t))
}

const render = () => {
  const aspectRatio = 16.0 / 9.0
  const imageWidth = 400
  const imageHeight = imageWidth / aspectRatio

  // camera setup
  const viewportHeight = 2.0
  const viewportWidth = aspectRatio * viewportHeight
  const focalLength = 1.0

  const origin = new Point(0, 0, 0)
  const horizontal = new Point(viewportWidth, 0, 0)
  const vertical = new Point(0, viewportHeight, 0)
  const lowerLeftCorner = origin
    .sub(horizontal.div(2))
    .sub(vertical.div(2)
    .sub(new Point(0, 0, focalLength)))

  // render ppm image
  console.log(`P3\n${imageWidth} ${imageHeight}\n255\n`)

  const FLUSH = `\x1b[2J\x1b[;H`
  for (let j = imageHeight; j >= 0; --j) {
    console.error(FLUSH)
    console.error(`\rScanlines remaining: ${j}`)
    for (let i = 0; i < imageWidth; ++i) {
      const u = i / (imageWidth - 1)
      const v = j / (imageHeight - 1)
      const direction = lowerLeftCorner
        .add(horizontal.mul(u))
        .add(vertical.mul(v))
        .sub(origin)
      const r = new Ray(origin, direction)
      const color = rayColor(r)
      writeColor(color)
    }
  }
  console.error(`Done.\n`)
}

render()
