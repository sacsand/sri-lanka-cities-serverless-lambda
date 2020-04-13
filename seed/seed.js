const db = require('../db');
const cities = require("cities.json");


const seedCities = async () => {
  const cityObjects = [];

  // const districtData = await client.query({
  //   query: FIND_DISTRICT,
  // });

  await Promise.all(
    // Map through all the cities
    cities.map(async (city) => { 
      // Add city only if there are no duplicates and if it have a district   
        const cityData = {
          PK: city.geonameid,
          SK: 'CITY',
          data: city.name,
          isoProvinceCode: city["admin1 code"],
          isoDistrictCode,
          location: {
            type: "Point",
            coordinates: [
              city.latitude,
              city.longitude,
            ],
          },
        };
        cityObjects.push(cityData);     
    })
  );

  try {
    const cityCount = cityObjects.length;

    // Break the data into chunks since sending such a large amount of data once can break things
    const cityChunks = new Array(Math.ceil(cityObjects.length / 2000))
      .fill()
      .map(() => cityObjects.splice(0, 2000));
    // Write to the db
    await Promise.all(
      await cityChunks.map(async (chunk) => {

        // create record in file upload table
        const aCity = {
          TableName:tableName,
          Item:chunk                
        };

         await dynamoDb.put(aCity).promise();
      })
    );

    console.log(`Added ${cityCount} cities.`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { seedCities };

