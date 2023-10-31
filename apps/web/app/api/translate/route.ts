import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { translate } from "@vitalets/google-translate-api";

//@ts-ignore
import Translator from "@andreasremdt/simple-translator";

export async function POST(request: any) {
  const { text, source, target } = await request.json();

  let toTranslate = {
    textToTranslate: {
      text: text,
    },
  };

  console.log(toTranslate, target);

  const translator = new Translator();

  translator.add(source, toTranslate);

  translator.translateForKey("textToTranslate.text", target);

  return NextResponse.json(
    {
      success: true,
      data: toTranslate.textToTranslate.text,
    },
    {
      status: 200,
    }
  );
}
