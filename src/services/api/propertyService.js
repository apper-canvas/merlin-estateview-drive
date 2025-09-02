import propertyData from "@/services/mockData/properties.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyService = {
  async getAll() {
    await delay(300);
    return [...propertyData];
  },

  async getById(id) {
    await delay(200);
    const property = propertyData.find(p => p.Id === id);
    if (!property) {
      throw new Error(`Property with Id ${id} not found`);
    }
    return { ...property };
  },

  async create(property) {
    await delay(500);
    const newProperty = {
      ...property,
      Id: Math.max(...propertyData.map(p => p.Id)) + 1,
      listedDate: new Date().toISOString(),
    };
    propertyData.push(newProperty);
    return { ...newProperty };
  },

  async update(id, updates) {
    await delay(400);
    const index = propertyData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error(`Property with Id ${id} not found`);
    }
    propertyData[index] = { ...propertyData[index], ...updates };
    return { ...propertyData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = propertyData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error(`Property with Id ${id} not found`);
    }
    propertyData.splice(index, 1);
    return true;
  },
};