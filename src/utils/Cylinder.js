export function drawCylinder(canvas, w, h, theta = 0) {
  const ctx = canvas.getContext('2d')
  let xPos
  let yPos
  const pi = Math.PI
  const twoPi = 2 * pi
  const x = w / 8
  const y = h / 8
  w -= 2 * x
  h -= 2 * y

  ctx.beginPath()
  ctx.lineWidth = 3
  // 가운데 커팅선 - 이부분이 회전을 immitation하고 있음
  for (let i = 0; i < 6; i++) {
    xPos = x + (w / 2) - (w / 3 * Math.cos(i * twoPi / 6 + theta))
    yPos = y + (h / 8) + (h / 12 * Math.sin(i * twoPi / 6 + theta))
    ctx.moveTo(xPos, yPos)
    ctx.lineTo((x + w / 2), (y + h / 8))
  }
  for (let i = 0; i < twoPi; i += 0.001) {
    xPos = (x + w / 2) - (w / 3 * Math.cos(i))
    yPos = (y + h / 8) + (h / 12 * Math.sin(i))
    if (i === 0)
      ctx.moveTo(xPos, yPos)
    else
      ctx.lineTo(xPos, yPos)
  }
  // 원기둥 윗쪽 타원
  for (let i = 0; i < twoPi; i += 0.001) {
    xPos = (x + w / 2) - (w / 2 * Math.cos(i))
    yPos = (y + h / 8) + (h / 8 * Math.sin(i))
    if (i === 0)
      ctx.moveTo(xPos, yPos)
    else
      ctx.lineTo(xPos, yPos)
  }
  // 원기둥 왼쪽 기둥
  ctx.moveTo(x, y + h / 8)
  ctx.lineTo(x, y + h - h / 8)
  // 원기둥 아랫면 반타원
  for (let i = 0; i < pi; i += 0.001) {
    xPos = (x + w / 2) - (w / 2 * Math.cos(i))
    yPos = (y + h - h / 8) + (h / 8 * Math.sin(i))
    if (i === 0)
      ctx.moveTo(xPos, yPos)
    else
      ctx.lineTo(xPos, yPos)
  }
  // 원기둥 오른쪽 기둥
  ctx.moveTo(x + w, y + h / 8)
  ctx.lineTo(x + w, y + h - h / 8)

  ctx.stroke()
}

export function rotateView(canvas, angle, shapeCallback, theta = 0) {
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  // 회전 행렬 계산 (2d)
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)

  // 회전 후의 변수
  const rotatedWidth = Math.abs(width * cos) + Math.abs(height * sin)
  const rotatedHeight = Math.abs(width * sin) + Math.abs(height * cos)
  // 회전된 캔버스를 위한 임시 캔버스 생성
  const tmpCanvas = document.createElement('canvas')
  tmpCanvas.width = Math.max(rotatedWidth, rotatedHeight)
  tmpCanvas.height = Math.max(rotatedWidth, rotatedHeight)
  const tmpCtx = tmpCanvas.getContext('2d')
  tmpCtx.translate(tmpCanvas.width / 2, tmpCanvas.height / 2)
  tmpCtx.rotate(angle)
  tmpCtx.translate(-rotatedWidth / 2, -rotatedHeight / 2)
  // 콜백함수로 도형 그리기
  shapeCallback(tmpCanvas, rotatedWidth, rotatedHeight, theta)
  // 원래 캔버스로 이식
  ctx.clearRect(0, 0, width, height)
  ctx.drawImage(tmpCanvas, 0, 0, width, height)
}

export function rotateObject(canvas, angularVelocity, rotateCallback, viewAngle, objectCallback) {
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height
  let angle = 0
  setInterval(() => {
    ctx.clearRect(0, 0, width, height)
    angle += angularVelocity
    rotateCallback(canvas, viewAngle, objectCallback, angle)
  }, 50)
}
