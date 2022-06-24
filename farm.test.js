const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
  getYieldForPlant1,
  getYieldForCrop1,
  getTotalYield1,
  getRevenueForCrop1,
  getProfitForCrop1,
  getTotalProfit1,
} = require("./farm");
// getYieldForPlant
describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});
// getYieldForCrop
describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});
// getTotalYield
describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield(crops)).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield(crops)).toBe(0);
  });
});
// getCostsForCrop
describe("getCostsForCrop", () => {
  test("Get cost for crop, simple", () => {
    const corn = {
      name: "corn",
      cost: 1,
    };
    const input = {
      crop: corn,
      numCrops: 230,
    };
    expect(getCostsForCrop(input)).toBe(230);
  });
});
// getRevenueForCrop without environmental factors
describe("getRevenueForCrop", () => {
  test("Get revenue for crop without environmental factors", () => {
    const apple = {
      name: "apple",
      sale_price: 2,
    };
    const input = {
      crop: apple,
      numCrops: 5,
    };
    expect(getRevenueForCrop(input)).toBe(10);
  });
});
// getProfitForCrop without environmental factors
describe("getProfitForCrop", () => {
  test("Get profit for a crop without environmental factors", () => {
    const corn = {
      name: "corn",
      sale_price: 2.5,
      yield: 3,
      cost: 1,
    };
    const input = {
      crop: corn,
      numCrops: 110,
    };
    expect(getProfitForCrop(input)).toBe(495);
  });
});
// getTotalProfit without environmental factors
describe("getTotalProfit", () => {
  test("Calculate total profit with multiple crops without environmental factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      sale_price: 2.5,
      cost: 1,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 3,
      sale_price: 2.5,
      cost: 1,
    };
    const crops = [
      { crop: corn, numCrops: 110 },
      { crop: pumpkin, numCrops: 110 },
    ];
    expect(getTotalProfit(crops)).toBe(990);
  });

  test("Calculate total profit with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
      sale_price: 2.5,
      cost: 1,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalProfit(crops)).toBe(0);
  });
});

// getYieldForPlant1 include environmental factors
describe("getYieldForPlant1", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };
  //   the sun is low -50%
  const environmentFactors = {
    sun: "low",
  };
  test("Get yield for plant with environment factors(low sun)", () => {
    expect(getYieldForPlant1(corn, environmentFactors)).toBe(15);
  });
  //   the sun is low 0%
  const environmentFactors1 = {
    sun: "medium",
  };
  test("Get yield for plant with environment factors(sun medium)", () => {
    expect(getYieldForPlant1(corn, environmentFactors1)).toBe(30);
  });
  //   the sun is low 50%
  const environmentFactors2 = {
    sun: "high",
  };
  test("Get yield for plant with environment factors(sun high)", () => {
    expect(getYieldForPlant1(corn, environmentFactors2)).toBe(45);
  });
});
// getYieldForCrop11
describe("getYieldForCrop1", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -77,
        medium: 0,
        high: 25,
      },
    },
  };
  const input = {
    crop: corn,
    numCrops: 10,
  };
  const environmentFactors = {
    sun: "low",
  };
  test("Get yield for crop with environment factors(sun low)", () => {
    expect(getYieldForCrop1(input, environmentFactors)).toBe(69);
  });
  const environmentFactors1 = {
    sun: "medium",
  };
  test("Get yield for crop with environment factors(sun low)", () => {
    expect(getYieldForCrop1(input, environmentFactors1)).toBe(300);
  });
  const environmentFactors2 = {
    sun: "high",
  };
  test("Get yield for crop with environment factors(sun low)", () => {
    expect(getYieldForCrop1(input, environmentFactors2)).toBe(375);
  });
});
// getTotalYield for all crops with environment Factors
describe("getTotalYield1", () => {
  const corn = {
    name: "corn",
    yield: 16,
    factor: {
      sun: {
        low: -40,
        medium: 0,
        high: 75,
      },
    },
  };
  const kiwi = {
    name: "kiwi",
    yield: 30,
    factor: {
      sun: {
        low: -77,
        medium: 0,
        high: 30,
      },
    },
  };
  const crops = [
    { crop: corn, numCrops: 16 },
    { crop: kiwi, numCrops: 20 },
  ];
  const environmentFactors = {
    sun: "low",
  };
  test("Get yield for crop with environment factors(sun low)", () => {
    expect(getTotalYield1(crops, environmentFactors)).toBe(291.6);
  });
  const environmentFactors1 = {
    sun: "medium",
  };
  test("Get yield for crop with environment factors(sun low)", () => {
    expect(getTotalYield1(crops, environmentFactors1)).toBe(856);
  });
  const environmentFactors2 = {
    sun: "high",
  };
  test("Get yield for crop with environment factors(sun low)", () => {
    expect(getTotalYield1(crops, environmentFactors2)).toBe(1228);
  });
});

// getRevenueForCrop1 with environmental factors
describe("getRevenueForCrop1", () => {
  const apple = {
    name: "apple",
    sale_price: 2,
    yield: 30,
    factor: {
      sun: {
        low: -75,
        medium: 0,
        high: 50,
      },
    },
  };
  const input = {
    crop: apple,
    numCrops: 5,
  };
  const environmentFactors = {
    sun: "low",
  };
  test("Get revenue for crop with environmental factors(sun low)", () => {
    expect(getRevenueForCrop1(input, environmentFactors)).toBe(75);
  });
  const environmentFactors1 = {
    sun: "medium",
  };
  test("Get revenue for crop with environmental factors(sun medium)", () => {
    expect(getRevenueForCrop1(input, environmentFactors1)).toBe(300);
  });
  const environmentFactors2 = {
    sun: "high",
  };
  test("Get revenue for crop with environmental factors(sun high)", () => {
    expect(getRevenueForCrop1(input, environmentFactors2)).toBe(450);
  });
});
// getProfitForCrop1 with enviromental factors
describe("getProfitForCrop1", () => {
  const watermelon = {
    name: "watermelon",
    sale_price: 5,
    yield: 30,
    cost: 1,
    factor: {
      sun: {
        low: -10,
        medium: 0,
        high: 50,
      },
    },
  };
  const input = {
    crop: watermelon,
    numCrops: 20,
  };
  const environmentFactors = {
    sun: "low",
  };
  test("Get profit for a crop with environmental factors(sun low)", () => {
    expect(getProfitForCrop1(input, environmentFactors)).toBe(2100);
  });
  const environmentFactors1 = {
    sun: "medium",
  };
  test("Get profit for a crop with environmental factors(sun medium)", () => {
    expect(getProfitForCrop1(input, environmentFactors1)).toBe(2400);
  });
  const environmentFactors2 = {
    sun: "high",
  };
  test("Get profit for a crop with environmental factors(sun high)", () => {
    expect(getProfitForCrop1(input, environmentFactors2)).toBe(3900);
  });
});
// getTotalProfit1 with environmental factors
describe("getTotalProfit1", () => {
  const watermelon = {
    name: "watermelon",
    sale_price: 5,
    yield: 89,
    cost: 1,
    factor: {
      sun: {
        low: -33,
        medium: 0,
        high: 66,
      },
    },
  };
  const apple = {
    name: "apple",
    sale_price: 3,
    yield: 50,
    cost: 1,
    factor: {
      sun: {
        low: -48,
        medium: 0,
        high: 22,
      },
    },
  };
  const input = [
    {
      crop: watermelon,
      numCrops: 25,
    },
    {
      crop: apple,
      numCrops: 30,
    },
  ];
  const environmentFactors = {
    sun: "low",
  };
  test("Get profit for a crop with environmental factors(sun low)", () => {
    expect(getTotalProfit1(input, environmentFactors)).toBe(6068.75);
  });
  const environmentFactors1 = {
    sun: "medium",
  };
  test("Get profit for a crop with environmental factors(sun medium)", () => {
    expect(getTotalProfit1(input, environmentFactors1)).toBe(11900);
  });
  const environmentFactors2 = {
    sun: "high",
  };
  test("Get profit for a crop with environmental factors(sun high)", () => {
    expect(getTotalProfit1(input, environmentFactors2)).toBe(20232.5);
  });
});
