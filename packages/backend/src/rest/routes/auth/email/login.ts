import { createRoute } from "../../../fileRouter";
import z from 'zod'

export const POST = createRoute({
    schema: {
        body: z.object({
            email: z.string().email()
        })
    },
    handler: async (req, reply) => {
        
    }
})