import { createClient } from "@/genql";
import { cookies } from "next/headers";

const client = (clientSide = false) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("at");

  if (!clientSide && accessToken) {
    return createClient({
      url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
      headers: {
        Cookie: `at=${accessToken.value}`,
      },
    });
  } else {
    return createClient({
      url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
      credentials: "include",
    });
  }
};

export { client as gqlClient };
