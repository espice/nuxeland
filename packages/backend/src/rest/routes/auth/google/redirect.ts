import { createRoute } from "../../../fileRouter";
import { google } from "googleapis";
import { env } from "../../../../utils/env";
import axios from "axios";
import { prisma } from "../../../../client/prisma";
import z from "zod";
import { accessCookieConfig, tokenSigner } from "../../../../utils/auth";

export const GET = createRoute({
  schema: {
    querystring: z.object({
      code: z.string(),
    }),
  },
  handler: async (req, reply) => {
    try {
      const code = req.query.code;

      const oauth2Client = new google.auth.OAuth2(
        env("GOOGLE_CLIENT_ID"),
        env("GOOGLE_CLIENT_SECRET"),
        env("GOOGLE_REDIRECT_URL")
      );

      const { tokens } = await oauth2Client.getToken(code);

      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
      );

      const { name, email, picture } = res.data;

      let user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            avatar: picture,
          },
        });
      }

      const accessToken = await tokenSigner({ userId: user.id });

      reply
        .setCookie("at", accessToken, accessCookieConfig)
        .redirect(`${env("FRONTEND_URL")}/home`);
    } catch (e) {
      console.log(e);
      reply.status(500).send("An Error Occured");
    }
  },
});
