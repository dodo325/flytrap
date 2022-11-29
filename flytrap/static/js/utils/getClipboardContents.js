// Бесполезная хркень
function getClipboardContents(callback) {
  try {

    let noGood = function (error) {
      callback({"error": error.message});
    };
    let success = function (clipboard) {
      callback({"clipboard": clipboard});
    }
    const text = navigator.clipboard.readText()
      .then(success)
      .catch(noGood);
  } catch (err) {
    callback({"error": err.message});
    console.error('Не удалось прочитать содержимое буфера обмена: ', err);
  }
}