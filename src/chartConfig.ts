function getRandomInt() {
  return Math.floor(Math.random() * (50 - 5 + 1)) + 5
}

export const randomData = () => ({
  labels: [
    `슬램덩크${getRandomInt()}`,
    '스즈메의 문단속',
    '해리포터',
    '말죽거리 잔혹사',
    '올드보이',

  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),

      ],
    },
  ],
})

export const options = {
  responsive: true,
  maintainAspectRatio: false,
}
