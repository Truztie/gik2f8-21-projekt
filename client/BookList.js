const BookList = (bookList) => {
    let html = `<ul class="book-list rounded-md border-2 border-slate-900 bg-slate-600 w-full mx-auto">`;
    for (let i = 0; i < bookList.length; i++) {
      html += BookListItem(bookList[i]);
    }
  
    html += `</ul>`;
  
    return html;
  };