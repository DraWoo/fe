// helpers/recordHelpers.js
import _ from 'lodash'

export function makeChatList(listData) {
  let data = listData,
    _orginIndex = 0

  return _.chain(data)
    .map((item, index) => {
      // 그룹핑을 위한 날짜 추가
      item.day = item.created.slice(0, 10)

      // 검색을 위한 원본 인덱스 추가
      item.orginIndex = _orginIndex
      _orginIndex++

      let prevItem = data[index - 1],
        nextItem = data[index + 1]

      // 말풍선 및 시간 표시 셋팅
      item.showProfile = false
      item.showTime = false
      item.isDiffTypePrev = false

      // 이전 메시지와 차이 계산
      if (prevItem) {
        const d = new Date(prevItem.created)
        const now = new Date(item.created)
        const diff = (now.getTime() - d.getTime()) / 1000

        // 1분 경과 체크
        if (diff > 60) {
          item.showProfile = true
        }

        // 이전 메시지 타입이 다르면
        if (prevItem.status !== item.status) {
          item.showProfile = true
          item.isDiffTypePrev = true
        }
      }

      if (!prevItem) {
        item.showProfile = true
      }

      // 다음 메시지 차이 계산
      if (nextItem) {
        const d = new Date(item.created)
        const now = new Date(nextItem.created)
        const diff = (now.getTime() - d.getTime()) / 1000

        // 1분 경과 체크
        if (diff > 60) {
          item.showTime = true
        }

        // 다음 메시지 타입이 다르면
        if (nextItem.status !== item.status) {
          item.showTime = true
        }
      }

      if (!nextItem) {
        item.showTime = true
      }

      // 메시지가 없거나 이미 치환이 된 경우
      if (!item.payload || typeof item.payload === 'object') return item

      // 메시지 치환
      try {
        item.payload = JSON.parse(item.payload)
        if (!item.payload.chapters) return item
        item.payload.chapters.map((chapter) => {
          return chapter.sections.map((section) => {
            // 줄바꿈 처리
            if (section.type === 'text' && section.data) {
              section.data = section.data.replace(/\n/g, '<br />')
            }
            return section
          })
        })
      } catch (e) {
        console.log(e)
      }
      return item
    })
    .groupBy('day')
    .value()
}
