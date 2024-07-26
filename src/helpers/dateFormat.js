/**
 * 날짜 포멧 필터
 * @param {String} date
 * @return {String} YYYY년 MM월 DD일
 * */
export function yyyyMMdd(date) {
  if (!date) return ''

  let js_date = new Date(date),
    year = js_date.getFullYear(),
    month = js_date.getMonth() + 1,
    day = js_date.getDate()

  if (month < 10) {
    month = '0' + month
  }

  if (day < 10) {
    day = '0' + day
  }

  return `${year}년 ${month}월 ${day}일`
}

/**
 * 날짜 포멧 필터
 * @param {String} date
 * @return {String} YYYY-MM-DD
 * */
export function yyyy_MM_dd(date) {
  if (!date) return '0000-00-00'

  let js_date = new Date(date),
    year = js_date.getFullYear(),
    month = js_date.getMonth() + 1,
    day = js_date.getDate()

  if (month < 10) {
    month = '0' + month
  }

  if (day < 10) {
    day = '0' + day
  }

  return `${year}-${month}-${day}`
}

/**
 * 날짜 포멧 필터
 * @param {String} date
 * @return {String} YYYY.MM.DD
 * */
export function yyyy_MM_dd_dot(date) {
  if (!date) return '0000.00.00'

  let js_date = new Date(date),
    year = js_date.getFullYear(),
    month = js_date.getMonth() + 1,
    day = js_date.getDate()

  // if (month < 10) {
  //   month = '0' + month
  // }
  //
  // if (day < 10) {
  //   day = '0' + day
  // }

  return `${year}.${month}.${day}`
}

/**
 * 날짜 포멧 필터 - 요일 구하기
 * @param {String} date
 * @return {String} ['일', '월', '화', '수', '목', '금', '토']
 * */
export function getDayOfWeek(date) {
  const week = ['일', '월', '화', '수', '목', '금', '토']
  return week[new Date(date).getDay()]
}

/**
 * 경과 시간 구하기
 * @param {String} date1
 * @param {String} date2
 * @return String
 * */
export function getElapsedTime(date1, date2) {
  const time1 = new Date(date1).getTime()
  const time2 = new Date(date2).getTime()

  const difference = Math.abs(time2 - time1)

  // const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  // return `상담 시간: ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`
  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
