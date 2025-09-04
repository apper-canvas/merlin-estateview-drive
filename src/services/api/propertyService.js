const TABLE_NAME = 'property_c';

// Field mapping from mock data to database schema
const mapToDatabase = (property) => {
  return {
    Name: property.title || property.Name,
    title_c: property.title,
    price_c: property.price,
    type_c: property.type,
    bedrooms_c: property.bedrooms,
    bathrooms_c: property.bathrooms,
    sqft_c: property.sqft,
    address_c: property.address,
    city_c: property.city,
    state_c: property.state,
    zip_code_c: property.zipCode,
    description_c: property.description,
    images_c: Array.isArray(property.images) ? property.images.join('\n') : property.images,
    amenities_c: Array.isArray(property.amenities) ? property.amenities.join(',') : property.amenities,
    year_built_c: property.yearBuilt,
    parking_c: property.parking,
    lat_c: property.lat,
    lng_c: property.lng,
    listed_date_c: property.listedDate,
    status_c: property.status,
  };
};

// Field mapping from database to display format
const mapFromDatabase = (record) => {
  return {
    Id: record.Id,
    title: record.title_c || record.Name,
    price: record.price_c,
    type: record.type_c,
    bedrooms: record.bedrooms_c,
    bathrooms: record.bathrooms_c,
    sqft: record.sqft_c,
    address: record.address_c,
    city: record.city_c,
    state: record.state_c,
    zipCode: record.zip_code_c,
    description: record.description_c,
    images: record.images_c ? record.images_c.split('\n').filter(img => img.trim()) : [],
    amenities: record.amenities_c ? record.amenities_c.split(',').map(a => a.trim()).filter(a => a) : [],
    yearBuilt: record.year_built_c,
    parking: record.parking_c,
    lat: record.lat_c,
    lng: record.lng_c,
    listedDate: record.listed_date_c,
    status: record.status_c,
  };
};

export const propertyService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "sqft_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "amenities_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "parking_c"}},
          {"field": {"Name": "lat_c"}},
          {"field": {"Name": "lng_c"}},
          {"field": {"Name": "listed_date_c"}},
          {"field": {"Name": "status_c"}}
        ],
        orderBy: [{"fieldName": "listed_date_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords(TABLE_NAME, params);

      if (!response.success) {
        console.error("Error fetching properties:", response.message);
        throw new Error(response.message);
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data.map(mapFromDatabase);
    } catch (error) {
      console.error("Error in propertyService.getAll:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "sqft_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "amenities_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "parking_c"}},
          {"field": {"Name": "lat_c"}},
          {"field": {"Name": "lng_c"}},
          {"field": {"Name": "listed_date_c"}},
          {"field": {"Name": "status_c"}}
        ]
      };

      const response = await apperClient.getRecordById(TABLE_NAME, parseInt(id), params);

      if (!response.success) {
        console.error(`Error fetching property ${id}:`, response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error(`Property with Id ${id} not found`);
      }

      return mapFromDatabase(response.data);
    } catch (error) {
      console.error(`Error in propertyService.getById(${id}):`, error?.response?.data?.message || error);
      throw error;
    }
  },

  async create(property) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Map to database format and include only updateable fields
      const dbProperty = mapToDatabase(property);
      
      const params = {
        records: [dbProperty]
      };

      const response = await apperClient.createRecord(TABLE_NAME, params);

      if (!response.success) {
        console.error("Error creating property:", response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} properties:`, failed);
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        if (successful.length > 0) {
          return mapFromDatabase(successful[0].data);
        }
      }

      throw new Error('Property creation failed');
    } catch (error) {
      console.error("Error in propertyService.create:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Map to database format and include only updateable fields
      const dbUpdates = mapToDatabase(updates);
      
      const params = {
        records: [{
          Id: parseInt(id),
          ...dbUpdates
        }]
      };

      const response = await apperClient.updateRecord(TABLE_NAME, params);

      if (!response.success) {
        console.error(`Error updating property ${id}:`, response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} properties:`, failed);
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        if (successful.length > 0) {
          return mapFromDatabase(successful[0].data);
        }
      }

      throw new Error('Property update failed');
    } catch (error) {
      console.error(`Error in propertyService.update(${id}):`, error?.response?.data?.message || error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(TABLE_NAME, params);

      if (!response.success) {
        console.error(`Error deleting property ${id}:`, response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} properties:`, failed);
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful.length > 0;
      }

      return true;
    } catch (error) {
      console.error(`Error in propertyService.delete(${id}):`, error?.response?.data?.message || error);
      throw error;
    }
  },
};