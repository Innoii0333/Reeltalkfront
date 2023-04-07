const socket = io()

/* 접속 되었을 때 실행 */
socket.on('connect', () => {
  /* 이름을 입력받고 */
  let name = prompt('닉네임설정', '')

  /* 이름이 빈칸인 경우 */
  if (!name)
    name = '익명'

  /* 서버에 새로운 유저가 왔다고 알림 */
  socket.emit('newUser', name)
})

/* 서버로부터 데이터 받은 경우 */
socket.on('update', (data) => {
  const chat = document.getElementById('chat')
  const message = document.createElement('div')
  const node = document.createTextNode(`${data.name}: ${data.message}`)
  let className = ''

  // 타입에 따라 적용할 클래스를 다르게 지정
  switch (data.type) {
    case 'message':
      className = 'other'
      break

    case 'connect':
      className = 'connect'
      break

    case 'disconnect':
      className = 'disconnect'
      break
  }

  const date = new Date()
  const timestamp = date.toLocaleTimeString() // 현재 시간을 문자열로 변환

  message.classList.add(className)
  message.innerHTML = `${data.name}: ${data.message}` // 메시지에 시간 추가
  chat.appendChild(message)

  if (data.type === 'connect' || data.type === 'disconnect') {
    // 서버에 새로운 유저가 왔을 때에만 timestamp를 추가하고 스타일 변경
    const date = new Date()
    const timestamp = date.toLocaleTimeString()

    const timestampNode = document.createElement('div')
    timestampNode.classList.add('timestamp', 'connect-timestamp')
    timestampNode.innerText = timestamp
    chat.appendChild(timestampNode)
  }
  else {
    // 그 외의 경우에는 일반적인 timestamp 스타일 적용
    const date = new Date()
    const timestamp = date.toLocaleTimeString()

    const timestampNode = document.createElement('div')
    timestampNode.classList.add('timestamp', 'other-timestamp')
    timestampNode.innerText = timestamp
    chat.appendChild(timestampNode)
  }
})

/* 메시지 전송 함수 */
function send() {
  // 입력되어있는 데이터 가져오기
  const message = document.getElementById('test').value

  // 가져왔으니 데이터 빈칸으로 변경
  document.getElementById('test').value = ''

  // 현재 시간을 문자열로 변환
  const date = new Date()
  const timestamp = date.toLocaleTimeString()

  // 내가 전송한 메시지를 클라이언트에게 표시
  const chat = document.getElementById('chat')
  const myMsg = document.createElement('div')
  myMsg.classList.add('me')
  myMsg.innerText = message // 내가 입력한 메시지
  chat.appendChild(myMsg)

  // 메시지에 시간 추가
  const timestampNode = document.createElement('div')
  timestampNode.classList.add('timestamp', 'my-timestamp')
  timestampNode.innerText = timestamp
  chat.appendChild(timestampNode)

  // 서버에 메시지 전송
  socket.emit('message', { type: 'message', message })
}

