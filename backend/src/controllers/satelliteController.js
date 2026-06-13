import N2YOService from '../services/N2YOService.js';
import { AppError } from '../middleware/errorHandler.js';

// N2YO category codes
const SATELLITE_CATEGORIES = {
  iss: { id: 25544, mode: 'single' },
  starlink: { category: 52, mode: 'above' },
  gps: { category: 50, mode: 'above' },
  weather: { category: 3, mode: 'above' },
  communication: { category: 29, mode: 'above' },
  all: { category: 0, mode: 'above' },
};

/**
 * Get satellite positions
 */
export const getSatellitePositions = async (req, res, next) => {
  try {
    const { satId, lat, lng, alt = 0, days = 0 } = req.query;

    if (!satId || !lat || !lng) {
      throw new AppError('Missing required parameters: satId, lat, lng', 400);
    }

    const data = await N2YOService.getPositions(
      parseInt(satId),
      parseFloat(lat),
      parseFloat(lng),
      parseInt(alt),
      parseInt(days)
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get satellites above a location
 */
export const getSatellitesAbove = async (req, res, next) => {
  try {
    const { lat, lng, alt = 0, radius = 90, limit = 10 } = req.query;

    if (!lat || !lng) {
      throw new AppError('Missing required parameters: lat, lng', 400);
    }

    const data = await N2YOService.getSatellitesAbove(
      parseFloat(lat),
      parseFloat(lng),
      parseInt(alt),
      parseInt(radius),
      parseInt(limit)
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get ISS visual passes
 */
export const getISSVisualPasses = async (req, res, next) => {
  try {
    const { lat, lng, alt = 0, days = 10, minVisibility = 300 } = req.query;

    if (!lat || !lng) {
      throw new AppError('Missing required parameters: lat, lng', 400);
    }

    const data = await N2YOService.getISSVisualPasses(
      parseFloat(lat),
      parseFloat(lng),
      parseInt(alt),
      parseInt(days),
      parseInt(minVisibility)
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get ISS current position
 */
export const getISSPosition = async (req, res, next) => {
  try {
    const { lat = 0, lng = 0, alt = 0 } = req.query;
    const ISS_ID = 25544;

    const data = await N2YOService.getPositions(
      ISS_ID,
      parseFloat(lat),
      parseFloat(lng),
      parseInt(alt),
      0
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get common satellites (ISS, Starlink, GPS)
 */
export const getCommonSatellites = async (req, res, next) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      throw new AppError('Missing required parameters: lat, lng', 400);
    }

    // Common satellite IDs
    const satelliteIds = {
      ISS: 25544,
      HUBBLE: 20580,
      STARLINK: 44713, // Example Starlink satellite
    };

    const data = await N2YOService.getSatellitesAbove(
      parseFloat(lat),
      parseFloat(lng),
      0,
      90,
      20
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get satellites by category (ISS, Starlink, GPS, Weather, Communication)
 */
export const getSatellitesByCategory = async (req, res, next) => {
  try {
    const { lat, lng, category = 'all', limit = 25 } = req.query;

    if (!lat || !lng) {
      throw new AppError('Missing required parameters: lat, lng', 400);
    }

    const catConfig = SATELLITE_CATEGORIES[category.toLowerCase()] || SATELLITE_CATEGORIES.all;

    let data;
    if (catConfig.mode === 'single') {
      // ISS specific — get its position
      data = await N2YOService.getPositions(
        catConfig.id,
        parseFloat(lat),
        parseFloat(lng),
        0,
        0
      );
    } else {
      // Category-based above query
      // N2YO above endpoint: /above/{lat}/{lng}/{alt}/{radius}/{category}
      data = await N2YOService.getSatellitesByCategory(
        parseFloat(lat),
        parseFloat(lng),
        0,
        90,
        catConfig.category,
        parseInt(limit)
      );
    }

    res.json({
      success: true,
      category,
      data,
    });
  } catch (error) {
    next(error);
  }
};
