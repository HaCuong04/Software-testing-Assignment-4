import { describe, it, expect, vi, beforeEach } from "vitest"
import { getRandomDogImage } from "../services/dogService"

global.fetch = vi.fn()

describe("dogService", () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("Test 1 - should return imageUrl and success true (positive case)", async () => {

    const mockedApiResponse = {
      message: "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
      status: "success"
    }

    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockedApiResponse
    })

    const result = await getRandomDogImage()

    expect(result.imageUrl).toBe(mockedApiResponse.message)
    expect(result.status).toBe("success")
    expect(fetch).toHaveBeenCalledOnce()
  })

  it("Test 2 - should throw error when fetch fails (negative case)", async () => {

    ;(fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500
    })

    await expect(getRandomDogImage()).rejects.toThrow(
      "Failed to fetch dog image"
    )

    expect(fetch).toHaveBeenCalledOnce()
  })
})