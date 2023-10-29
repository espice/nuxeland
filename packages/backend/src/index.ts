import "dotenv/config";

import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastify from "fastify";
import { getContext } from "./graphql/context";
import { schema } from "./graphql/schema";
import { env } from "./utils/env";
import { createYoga } from "graphql-yoga";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fileRouter } from "./rest/fileRouter";
import { join } from "path";

const main = async () => {
  const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(cors, {
    origin: [env("CORS_ORIGIN", env("FRONTEND_URL")), "http://127.0.0.1:5000"],
    methods: ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"],
    allowedHeaders: ["Origin", "Content-Type", "Accept"],
    credentials: true,
  });

  await app.register(cookie, {
    hook: "onRequest",
  });

  console.log("registering routes");
  await app.register(fileRouter, {
    dir: join(__dirname, "rest", "routes"),
  });

  const yoga = createYoga({
    schema,
    context: getContext,
  });

  app.route({
    url: yoga.graphqlEndpoint,
    method: ["POST", "OPTIONS", "GET"],
    handler: async (req, reply) => {
      const response: Response = await yoga.handleNodeRequest(req, { req });

      response.headers.forEach((value, key) => reply.header(key, value));
      reply.status(response.status);
      reply.send(response.body);

      return reply;
    },
  });

  const host = "127.0.0.1";
  const port = parseInt(env("PORT", "8000"));

  try {
    await app.listen({ port, host });
    app.log.info(`Server listening on ${host}:${port}`);
  } catch (e) {
    app.log.error(e);
  }
};

main();
