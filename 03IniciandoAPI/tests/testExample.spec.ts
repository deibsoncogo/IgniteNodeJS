describe("Simple test", () => { // define um grupo de testes
  it("The result of the sum must be 4", () => { // cria um teste
    const calc = 2 + 2; // teste
    const result = 4; // teste

    expect(calc).toBe(result); // define oque o teste deve retornar
  });

  it("The result of the multiplication cannot be 8", () => {
    const calc = 5 * 9;
    const result = 8;

    expect(calc).not.toBe(result); // define oque o teste não pode retornar
  });
});
