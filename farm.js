// getYieldForPlant without environmental factors
const getYieldForPlant = (plant) => plant.yield * 1;
// getYieldForPlant1 with environmental factors
const getYieldForPlant1 = (corn, environmentFactors) => {
  const sunLow = corn.factor.sun.low / 100;
  const sunHigh = corn.factor.sun.high / 100;
  if (environmentFactors.sun == "low") {
    const resultOfLowSun = corn.yield * sunLow;
    const finalRes = resultOfLowSun + corn.yield;
    return finalRes;
  } else if (environmentFactors.sun == "high") {
    const resultOfLowSun = corn.yield * sunHigh;
    const finalRes = resultOfLowSun + corn.yield;
    return finalRes;
  } else {
    return corn.yield;
  }
};
// getYieldForCrop without environmental factors
const getYieldForCrop = (crop) => crop.crop.yield * crop.numCrops;
// getYieldForCrop with environmental factors
const getYieldForCrop1 = (input, environmentFactors) => {
  const totalYield = getYieldForCrop(input);
  const sunLow = input.crop.factor.sun.low / 100;
  const sunHigh = input.crop.factor.sun.high / 100;

  const resultOfLowSun = totalYield * sunLow;
  const finalRes = resultOfLowSun + totalYield;

  const resultOfLowSun1 = totalYield * sunHigh;
  const finalRes1 = resultOfLowSun1 + totalYield;
  return environmentFactors.sun == "low"
    ? finalRes
    : environmentFactors.sun == "high"
    ? finalRes1
    : totalYield;
};
// getTotalYield without environmental factors
const getTotalYield = (crops) => {
  const NewCrops = [];
  crops.forEach((element) => {
    const element1 = element.crop.yield * element.numCrops;
    NewCrops.push(element1);
  });
  const total = NewCrops.reduce((e, currentTotal) => {
    return e + currentTotal;
  }, 0);
  return total;
};
// getTotalYield with environmental factors
const getTotalYield1 = (crops, environmentFactors) => {
  const NewCrops = [];
  crops.forEach((element) => {
    const element1 = getYieldForCrop1(element, environmentFactors);
    NewCrops.push(element1);
  });
  const total = NewCrops.reduce((e, currentTotal) => {
    return e + currentTotal;
  }, 0);
  return total;
};
// getCostsForCrop without environmental factors
const getCostsForCrop = (plant) => plant.crop.cost * plant.numCrops;
// getRevenueForCrop without environmental factors
const getRevenueForCrop = (plant) => plant.crop.sale_price * plant.numCrops;
// getRevenueForCrop1 with environmental factors
const getRevenueForCrop1 = (input, environmentFactors) => {
  const getrevenue = getYieldForCrop1(input, environmentFactors);
  const getTotal = getrevenue * input.crop.sale_price;
  return getTotal;
};
// getRevenueForCrop without environmental factors
const getProfitForCrop = (plantCrop) => {
  const totalNumber = plantCrop.crop.yield * plantCrop.numCrops;
  const totalPriceWithoutCost = plantCrop.crop.sale_price * totalNumber;
  const costTimeNumber = totalNumber * plantCrop.crop.cost;
  const totalPriceWithCost = totalPriceWithoutCost - costTimeNumber;
  return totalPriceWithCost;
};
// getRevenueForCrop1 with environmental factors
const getProfitForCrop1 = (crop, environmentFactors) => {
  const getRes = getRevenueForCrop1(crop, environmentFactors);
  const finalResult =
    getRes - crop.crop.cost * (crop.crop.yield * crop.numCrops);
  return finalResult;
};
// getTotalProfit without environmental factors
const getTotalProfit = (crops) => {
  const NewCrops = new Array();
  crops.forEach((element) => {
    const element1 = getProfitForCrop(element);
    NewCrops.push(element1);
  });
  const total = NewCrops.reduce((e, currentTotal) => {
    return e + currentTotal;
  }, 0);
  return total;
};
// getTotalProfit1 with environmental factors
const getTotalProfit1 = (input, environmentFactors) => {
  const NewCrops = [];
  input.forEach((element) => {
    const res = getProfitForCrop1(element, environmentFactors);
    NewCrops.push(res);
  });
  const total = NewCrops.reduce((e, currentTotal) => {
    return e + currentTotal;
  }, 0);
  return total;
};
module.exports = {
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
};
