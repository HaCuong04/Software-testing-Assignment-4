import { describe, it, expect, vi } from "vitest"
import request from "supertest"
import express from "express"
import { Request, Response } from "express"

// 🔥 Mock controller BEFORE importing routes
vi.mock("../controllers/dogController", () => ({
  getDogImage: vi.fn()
}))

import dogRoutes from "../routes/dogRoutes"
import { getDogImage } from "../controllers/dogController"

const app = express()
app.use(express.json())
app.use("/api/dogs", dogRoutes)

describe("dogRoutes", () => {

  it("Test 4 - should return 200 and success true", async () => {

    ;(getDogImage as any).mockImplementationOnce(
        (_req: Request, res: Response) => {
            return res.status(200).json({
                success: true,
                data: {
                    imageUrl: "https://mocked-image.jpg"
                }
            })
        }
    )

    const response = await request(app)
      .get("/api/dogs/random")

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data.imageUrl)
      .toContain("mocked-image.jpg")
  })

  it("Test 5 - should return 500 and error message", async () => {

    ;(getDogImage as any).mockImplementationOnce(
        (_req: Request, res: Response) => {
            return res.status(500).json({
                success: false,
                error: "Failed to fetch dog image: Network error"
            })
        }
    )

    const response = await request(app)
      .get("/api/dogs/random")

    expect(response.status).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.error)
      .toBe("Failed to fetch dog image: Network error")
  })
})