// это уже почти фишинг!
function processAjaxData(response, urlPath){
  document.getElementById("content").innerHTML = response.html;
  document.title = response.pageTitle;
  window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", urlPath);
}
