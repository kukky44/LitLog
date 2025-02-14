import { BookType } from "@/src/types"

export const registerBook = (book: BookType) => {
  fetch("/api/registerBook", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({
      isbn: book?.isbn,
      title: book?.title,
      description: book?.description,
      author: book?.author,
      imageUrl: book?.imageUrl,
      googleBookId: book?.googleBookId,
    })
  })
  .then(res => res.json())
  .then(data => {
    if(data) return data;
  })
  .catch(e => {
    return e;
});
}