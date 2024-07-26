/**
 * readFiles
 * 파일 리더
 * @param {Object} files
 * @return Promise
 * */
export async function readFiles(files) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(files)
    reader.onload = async (e) => {
      resolve(e.target.result)
    }
  })
}
