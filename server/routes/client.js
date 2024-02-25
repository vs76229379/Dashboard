import express from "express";
import {
  
  getGeography,
  getYear,
  getTopic,
  getSector,
  getRegion,
  getPest,
  getSource,
  getPestle,
  getSwot,
} from "../controllers/client.js";

const router = express.Router();
router.get("/geography", getGeography);
router.get("/year",getYear);
router.get("/topic",getTopic);
router.get("/sector",getSector);
router.get("/region",getRegion);
router.get("/pest",getPest);
router.get("/source",getSource);
router.get("/pestle",getPestle);
router.get("/swot",getSwot);

export default router;
