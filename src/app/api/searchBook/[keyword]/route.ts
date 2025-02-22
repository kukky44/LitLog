import { BookType } from "@/src/types";
import { NextRequest, NextResponse } from "next/server";

type GoogleBooksAPIItems = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: { thumbnail: string };
    industryIdentifiers?: { type: string; identifier: string }[];
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ keyword: string }> }
) {
  const keyword = (await params).keyword;
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") || "ja";

  if(!keyword) return NextResponse.json({message: "No keyword"}, { status: 400 });

  try {
    let bookData: BookType[] = [];

    await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${keyword}&langRestrict=${locale}&maxResults=10&orderBy=relevance&key=${process.env.GOOGLE_API_KEY}`,
      { next: {revalidate: 1800} }
    )
    .then(res => res.json())
    .then(data => {
      if(data.error?.code === 429) {
        return NextResponse.json({message: "Google booksの検索リミットを超過しました。"}, {status: 429});
      }

      if(!data || !data?.items) return NextResponse.json({message: "No book found"}, {status: 404});

      bookData = data.items.map((d: GoogleBooksAPIItems) => {
        const vInfo = d.volumeInfo;
        let isbn: string = "";

        if(vInfo.industryIdentifiers && vInfo.industryIdentifiers[0].type === "ISBN_13"){
          isbn = vInfo.industryIdentifiers[0].identifier;
        }
        return {
          title: vInfo.title,
          author: vInfo.authors?.join("、"),
          description: vInfo.description,
          imageUrl: vInfo.imageLinks?.thumbnail,
          isbn: isbn,
          googleBookId: d.id
        } as BookType;
      });
    })
    .catch(e => {
      throw e;
    })

    if(!bookData) return NextResponse.json({message: "No book found"}, {status: 404});

    return NextResponse.json(bookData, {status: 200});
  } catch (err) {
    console.log("Error searching books", err);
    return NextResponse.json({message: "Error searching books"}, {status: 500});
  }
}