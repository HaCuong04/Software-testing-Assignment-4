import { describe, it, expect, vi } from "vitest"
import { getRandomDogImage } from "../services/dogService"

global.fetch = vi.fn()

describe("dogApi service tests", () => {

  it("should return success response", async () => {

    const mockResponse = {
      message: "https://mocked-dog.jpg",
      status: "success"
    }

    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    const result = await getRandomDogImage()

    expect(result.imageUrl).toBe(mockResponse.message)
    expect(result.status).toBe("success")
    expect(fetch).toHaveBeenCalledOnce()
  })

})