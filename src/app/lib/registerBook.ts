import { BookType } from "@/src/types"

export const registerBook = async (book: BookType) => {
  try {
    const res = await fetch("/api/registerBook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isbn: book?.isbn,
        title: book?.title,
        description: book?.description,
        author: book?.author,
        imageUrl: book?.imageUrl,
        googleBookId: book?.googleBookId,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to register book");
    }

    return await res.json();
  } catch (error) {
    console.error("Error registering book:", error);
    return null;
  }
};