import http from 'http'
import fs from 'fs'
import express from 'express'
import { Server } from 'socket.io'

const app = express()
const router = express.Router()

const server = http.createServer(app)
const io = new Server(server)

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

// /opentalk 경로로 요청이 들어왔을 때는 router 미들웨어를 사용합니다.
app.use('/opentalk', router)

router.get('/', (request, response) => {
  fs.readFile('./static/index.html', (err, data) => {
    if (err) {
      response.send('에러')
    }
    else {
      response.writeHead(200, { 'Content-Type': 'text/html' })
      response.write(data)
      response.end()
    }
  })
})

io.sockets.on('connection', (socket) => {
  socket.on('newUser', (name) => {
    console.log(`${name} 님이 접속하였습니다.`)

    socket.name = name

    io.sockets.emit('update', {
      type: 'connect',
      name: 'SERVER',
      message: `${name}님이 접속하였습니다.`,
    })
  })

  socket.on('message', (data) => {
    data.name = socket.name
    data.time = getTimeStamp()

    console.log(data)

    socket.broadcast.emit('update', data)
  })

  socket.on('disconnect', () => {
    console.log(`${socket.name}님이 나가셨습니다.`)

    socket.broadcast.emit('update', {
      type: 'disconnect',
      name: 'SERVER',
      message: `${socket.name}님이 나가셨습니다.`,
    })
  })
})

server.listen(3334, () => {
  console.log('서버 실행 중..')
})

// 클라이언트에서 메시지를 보내면 서버에서 처리하기
io.sockets.on('connection', (socket) => {
  socket.on('openNewWindow', () => {
    io.sockets.emit('message', '새창 열기 요청이 왔습니다.')
  })
})

// 시간 정보를 포함한 타임스탬프 문자열 생성
function getTimeStamp() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
}
