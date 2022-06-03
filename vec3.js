export default class Vec3 {
  constructor(x = 0, y = 0, z = 0) {
    this.v = [x, y, z]
  }

  get x() {
    return this.v[0]
  }

  set x(n) {
    this.v[0] = n
  }

  get y() {
    return this.v[1]
  }

  set y(n) {
    this.v[1] = n
  }

  get z() {
    return this.v[2]
  }

  set z(n) {
    this.v[2] = n
  }

  add(t) {
    if (t instanceof Vec3) {
      return new Vec3(this.x + t.x, this.y + t.y, this.z + t.z)
    } else {
      return new Vec3(this.x + t, this.y + t, this.z + t)
    }
  }

  div(t) {
    if (t instanceof Vec3) {
      return new Vec3(this.x / t.x, this.y / t.y, this.z / t.z)
    } else {
      return new Vec3(this.x / t, this.y / t, this.z / t)
    }
  }

  mul(t) {
    if (t instanceof Vec3) {
      return new Vec3(this.x * t.x, this.y * t.y, this.z * t.z)
    } else {
      return new Vec3(this.x * t, this.y * t, this.z * t)
    }
  }

  sub(t) {
    if (t instanceof Vec3) {
      return new Vec3(this.x - t.x, this.y - t.y, this.z - t.z)
    } else {
      return new Vec3(this.x - t, this.y - t, this.z - t)
    }
  }

  length() {
    return Math.sqrt(this.lengthSquared())
  }

  lengthSquared() {
    return (this.x * this.x) +
      (this.y * this.y) +
      (this.z * this.z)
  }
}

export const unitVector = (v) => {
  return v.div(v.length())
}

export const dot = (v1, v2) => {
  return v1.x * v2.x +
    v1.y * v2.y +
    v1.z * v2.z
}

export const Color = Vec3
export const Point = Vec3
