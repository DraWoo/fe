// 한글 체크
export function isHangul(text) {
  const regex = /[가-힣]/
  return regex.test(text)
}

// 영문과 한글 배열중 한글이 먼저 나오도록 재정렬
export function sortResults(results) {
  return results.sort((a, b) => {
    const aIsHangul = isHangul(a.name || '')
    const bIsHangul = isHangul(b.name || '')
    if (aIsHangul && !bIsHangul) return -1
    if (!aIsHangul && bIsHangul) return 1
    return 0
  })
}

// 영문과 한글 배열중 한글이 먼저 나오도록 재정렬
export function sortResultsIssueList(results) {
  return results.sort((a, b) => {
    const aIsHangul = isHangul(a.item?.customer?.name || a.item?.guest.customer.name || '')
    const bIsHangul = isHangul(b.item?.customer?.name || b.item?.guest.customer.name || '')
    if (aIsHangul && !bIsHangul) return -1
    if (!aIsHangul && bIsHangul) return 1
    return 0
  })
}

/**
 * 문자열 초성 리턴
 * getChosung
 * @param {String} word
 * @return String
 * */
export function getChosung(word) {
  const cho = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
  let result = ''
  for (let i = 0; i < word.length; i++) {
    const charCode = word.charCodeAt(i) - 44032
    if (charCode < 0 || charCode > 11171) continue
    result += cho[Math.floor(charCode / 588)]
  }
  return result
}

export default getChosung
