import { describe, it, expect, vi } from "vitest"
import { getDogImage } from "../controllers/dogController"
import * as dogService from "../services/dogService"

describe("dogController", () => {

  it("Test 3 - should return success true and mocked service data", async () => {

    const mockedServiceResponse = {
      imageUrl: "https://mocked-dog-url.jpg",
      status: "success"
    }

    vi.spyOn(dogService, "getRandomDogImage")
      .mockResolvedValueOnce(mockedServiceResponse)

    const req = {} as any

    const jsonMock = vi.fn()
    const statusMock = vi.fn(() => ({ json: jsonMock }))

    const res = {
      status: statusMock,
      json: jsonMock
    } as any

    await getDogImage(req, res)

    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      data: mockedServiceResponse
    })
  })
})