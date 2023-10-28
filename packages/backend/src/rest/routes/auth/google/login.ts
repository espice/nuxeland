import { createRoute } from "../../../fileRouter";
import { google } from "googleapis";
import { env } from "../../../../utils/env";

export const GET = createRoute({
  handler: async (req, reply) => {
    const oauth2Client = new google.auth.OAuth2(
      env("GOOGLE_CLIENT_ID"),
      env("GOOGLE_CLIENT_SECRET"),
      env("GOOGLE_REDIRECT_URL")
    );

    const scopes = ["email", "openid", "profile"];

    const authUrl = oauth2Client.generateAuthUrl({
      scope: scopes,
      include_granted_scopes: true,
    });

    reply.redirect(authUrl);
  },
});
