import Data from "../models/User.js";
import countries from 'i18n-iso-countries';
import enLang from 'i18n-iso-countries/langs/en.json' assert { type: 'json' };
import getCountryIso3 from "country-iso-2-to-3";

countries.registerLocale(enLang);


export const getGeography = async (req, res) => {
  try {
    const datas = await Data.find();
    

    const mappedLocations = datas.reduce((acc, { country }) => {
      const iso2Code = countries.getAlpha2Code(country, 'en');
      const countryISO3 = getCountryIso3(iso2Code);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getYear = async (req, res) => {
  try {
    const datas = await Data.find();

    // Group data by topic
    const groupedData = datas.reduce((acc, { start_year, end_year, topic }) => {
      // Convert start_year and end_year to Date objects
      const startDate = start_year ? new Date(start_year) : null;
      const endDate = end_year ? new Date(end_year) : null;

      // If this topic already exists in the accumulator, append the new data
      if (acc[topic]) {
        acc[topic].start_year.push(startDate);
        acc[topic].end_year.push(endDate);
      } else {
        // Otherwise, create a new entry in the accumulator
        acc[topic] = { start_year: [startDate], end_year: [endDate] };
      }

      return acc;
    }, {});

    // Convert the grouped data into an array format
    const formattedData = Object.entries(groupedData)
      .map(([topic, { start_year, end_year }]) => ({
        topic,
        start_year,
        end_year
      }))
      // Filter out topics that do not have either a start year or an end year
      .filter(({ start_year, end_year }) => start_year.some(year => year !== null) && end_year.some(year => year !== null));

    res.status(200).json(formattedData);
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



export const getTopic = async (req, res) => {
  try {
    const datas = await Data.find();
    
    const mappedTopic = datas.reduce((acc, { topic }) => {
      if (!acc[topic]) {
        acc[topic] = 0;
      }
      acc[topic]++;
      return acc;
    }, {});

    const formattedTopic = Object.entries(mappedTopic).map(
      ([topic, count]) => {
        return { id: topic, value: count };
      }
    );
    console.log('Formatted Topic:', formattedTopic);

    res.status(200).json(formattedTopic);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getSector = async (req, res) => {
  try {
    const datas = await Data.find();
    
    const mappedSector = datas.reduce((acc, { sector }) => {
      // Check if sector is not an empty string
      if (sector) {
        if (!acc[sector]) {
          acc[sector] = 0;
        }
        acc[sector]++;
      }
      return acc;
    }, {});

    const formattedSector = Object.entries(mappedSector).map(
      ([sector, count]) => {
        return { id: sector, value: count };
      }
    );
    console.log('Formatted Sector:', formattedSector);

    res.status(200).json(formattedSector);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getRegion = async (req, res) => {
  try {
    const datas = await Data.find();
    
    const mappedRegion = datas.reduce((acc, { region }) => {
      // Check if sector is not an empty string
      if (region) {
        if (!acc[region]) {
          acc[region] = 0;
        }
        acc[region]++;
      }
      return acc;
    }, {});

    const formattedRegion = Object.entries(mappedRegion).map(
      ([region, count]) => {
        return { id: region, value: count };
      }
    );
    console.log('Formatted Region:', formattedRegion);

    res.status(200).json(formattedRegion);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getPest = async (req, res) => {
  try {
    const datas = await Data.find();

    const mappedPest = datas.reduce((acc, { likelihood, intensity, insight, title, sector }) => {
      // Check if likelihood and intensity are not empty
      if (likelihood && intensity) {
        // Create a key using likelihood and intensity
        const key = `${likelihood}-${intensity}`;
        if (!acc[key]) {
          // Initialize an empty object for the key
          acc[key] = {};
        }
        // Assign the insight, title, and sector as properties of the object
        acc[key].insight = insight;
        acc[key].title = title;
        acc[key].sector = sector;
      }
      return acc;
    }, {});

    const formattedPest = Object.entries(mappedPest).map(
      ([key, value]) => {
        // Split the key into likelihood and intensity
        const [likelihood, intensity] = key.split('-');
        // Return an object with likelihood, intensity, and value
        return { likelihood, intensity, value };
      }
    );
    console.log('Formatted Pest:', formattedPest);

    res.status(200).json(formattedPest);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getSource = async (req, res) => {
  try {
    const datas = await Data.find();
    
    const mappedSource = datas.reduce((acc, { source }) => {
      // Check if sector is not an empty string
      if (source) {
        if (!acc[source]) {
          acc[source] = 0;
        }
        acc[source]++;
      }
      return acc;
    }, {});

    const formattedSource = Object.entries(mappedSource).map(
      ([source, count]) => {
        return { id: source, value: count };
      }
    );
    console.log('Formatted Source:', formattedSource);

    res.status(200).json(formattedSource);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getPestle = async (req, res) => {
  try {
    const datas = await Data.find();
    
    const mappedPestle = datas.reduce((acc, { pestle }) => {
      // Check if sector is not an empty string
      if (pestle) {
        if (!acc[pestle]) {
          acc[pestle] = 0;
        }
        acc[pestle]++;
      }
      return acc;
    }, {});

    const formattedPestle = Object.entries(mappedPestle).map(
      ([pestle, count]) => {
        return { id: pestle, value: count };
      }
    );
    console.log('Formatted Pestle:', formattedPestle);

    res.status(200).json(formattedPestle);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getSwot= async (req, res) => {
  try {
    // Find all the data from the database
    const datas = await Data.find();

    // Map the data to an array of objects with all the fields
    const formattedSwot = datas.map((data) => {
      return {
        end_year: data.end_year,
        intensity: data.intensity,
        sector: data.sector,
        topic: data.topic,
        insight: data.insight,
        url: data.url,
        region: data.region,
        start_year: data.start_year,
        impact: data.impact,
        added: data.added,
        published: data.published,
        country: data.country,
        relevance: data.relevance,
        pestle: data.pestle,
        source: data.source,
        title: data.title,
        likelihood: data.likelihood,
      };
    });

    // Log the formatted data
    console.log('Formatted Data:', formattedSwot);

    // Send the formatted data as a JSON response
    res.status(200).json(formattedSwot);
  } catch (error) {
    // Handle any errors
    res.status(404).json({ message: error.message });
  }
};








