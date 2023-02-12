describe("RickleScript Test Suite", () => {
  it("Binary Not Expressions", async () => {
    expect(~-2).toBe(1);
    expect(~-1).toBe(0);
    expect(~0).toBe(-1);
    expect(~1).toBe(-2);
    expect(~2).toBe(-3);
  });
});
