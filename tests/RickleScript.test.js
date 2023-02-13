import RickleScript from "../public/app/RickleScript.js";

describe("RickleScript Test Suite", () => {
  it("Binary Not Expressions", async () => {
    expect(~-2).toBe(1);
    expect(~-1).toBe(0);
    expect(~0).toBe(-1);
    expect(~1).toBe(-2);
    expect(~2).toBe(-3);
  });
  it("Binary Not Expression", async () => {

    expect(RickleScript.not(0)).toBe(-1);
    expect(RickleScript.not(1)).toBe(-2);

    expect(RickleScript.not(-2)).toBe(-1);
    expect(RickleScript.not(-1)).toBe(0);
    expect(RickleScript.not(0)).toBe(-1);
    expect(RickleScript.not(1)).toBe(-2);
    expect(RickleScript.not(2)).toBe(-1);
  });

  it("Binary AND Expression", () => {
    expect(RickleScript.and(0,0)).toBe("0");
    expect(RickleScript.and(0,1)).toBe("0");
    expect(RickleScript.and(1,0)).toBe("0");
    expect(RickleScript.and(1,1)).toBe("1");
  });

  it("Binary XOR Expression", () => {
    expect(RickleScript.xor(0,0)).toBe(false);
    expect(RickleScript.xor(0,1)).toBe(true);
    expect(RickleScript.xor(1,0)).toBe(true);
    expect(RickleScript.xor(1,1)).toBe(false);    
  });
  it("Binary OR Expression", () => {
    expect(RickleScript.or(0,0)).toBe("0");
    expect(RickleScript.or(0,1)).toBe("1");
    expect(RickleScript.or(1,0)).toBe("1");
    expect(RickleScript.or(1,1)).toBe("1"); 
  });
  it("Can join two Strings", async () => {
    expect(RickleScript.add("A", "A")).toBe("AA");
  });
  it("Can add two numbers using binary math.", async () => {
    expect(RickleScript.add(1, 1)).toBe("10");
  });
  it("Can add two numbers using binary math.", async () => {
    expect(RickleScript.add(5, 1)).toBe("NaN");
  });

  it("has a length of 26", () => {
    function b64_to_utf8(str) {
      str = str.replace(/\s/g, "");
      return decodeURIComponent(escape(atob(str)));
    }
    let l = [
      "3CD",
      "494",
      "CED",
      "7F5",
      "8CF",
      "A27",
      "762",
      "4C9",
      "506",
      "D5A",
      "8FB",
      "50A",
      "BB2",
      "53D",
      "3AF",
      "B82",
      "F74",
      "1D0",
      "465",
      "B2F",
      "7E5",
      "A32",
      "AES",
      "CBC",
      "128",
      "000"
    ];
    expect(l.length).toBe(26);
    l.pop();
    l.pop();
    l.pop();
    l.pop();
    expect(l.join("").slice(0, -2)).toBe(
      "3CD494CED7F58CFA277624C9506D5A8FB50ABB253D3AFB82F741D0465B2F7E5A"
    );
    expect("WinstonServices.").toBe("WinstonServices.");
    expect(b64_to_utf8("T25seSB0aG9zZSB3aG8ga25vdyB3aWxsIGtub3cu")).toBe(
      "Only those who know will know."
    );
    expect("T25seSB0aG9zZSB3aG8ga25vdyB3aWxsIGtub3cu").toBe(
      "T25seSB0aG9zZSB3aG8ga25vdyB3aWxsIGtub3cu"
    );
  });
});
