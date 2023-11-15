import { Router } from "express";
import { methods as afiliadosControllers } from "../controllers/afiliados.controllers.js";

const router = Router();



router.get("/", afiliadosControllers.getAfiliados);
router.get("/:datos", afiliadosControllers.getDatos);
router.get("/familiares", afiliadosControllers.getFamiliar);
router.post("/create", afiliadosControllers.addAfiliado);
router.post("/familiar", afiliadosControllers.addFamiliar);
router.delete("/api/afiliados/:dni", afiliadosControllers.deleteAfiliados);
router.put("/api/afiliados/:dni", afiliadosControllers.updateAfiliados);

export default router;

.