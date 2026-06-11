import type { ObjectId } from "mongoose"

export type Payload = {
    id: ObjectId,
    email: string
}