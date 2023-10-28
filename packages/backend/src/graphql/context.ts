import { FastifyRequest } from "fastify";
import { tokenVerifier } from "../utils/auth";

export interface GraphQLContext {
  req: FastifyRequest;
  userId?: string;
}

export const getContext = async ({
  req,
}: {
  req: FastifyRequest;
}): Promise<GraphQLContext> => {
  const accessToken = req.cookies["token"];
  if (accessToken) {
    try {
      const { userId }: { userId: string } = await tokenVerifier(accessToken);
      return { req, userId };
    } catch (error) {
      req.log.error(error);
      return { req };
    }
  }
  return { req };
};
