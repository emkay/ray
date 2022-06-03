export default (color) => {
  const ir = parseInt(255.999 * color.x)
  const ig = parseInt(255.999 * color.y)
  const ib = parseInt(255.999 * color.z)

  console.log(`${ir} ${ig} ${ib}\n`)
}
