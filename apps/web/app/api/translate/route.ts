import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { translate } from "@vitalets/google-translate-api";

//@ts-ignore
import Translator from "@andreasremdt/simple-translator";
import axios from "axios";

export async function POST(request: any) {
  const req = await request.json();
  console.log(request);

  // const res = await axios.post("https://translate.terraprint.co/translate", {
  //   body: { q, source, target, format: "text" },
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // const { translatedText } = res.data;
  // console.log(res.data);
  return NextResponse.json(
    {
      success: true,
      data: translatedText,
    },
    {
      status: 200,
    }
  );
}
