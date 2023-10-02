import { Router } from "express";
import { methods as afiliadosControllers } from "../controllers/afiliados.controllers.js";

const router = Router();

router.get("/", afiliadosControllers.getAfiliados);
router.get("/:datos", afiliadosControllers.getDatos);
router.post("/create", afiliadosControllers.addAfiliado);
router.post("/empleador", afiliadosControllers.addEmpleadores);
router.post("/api/familiar", afiliadosControllers.addFamiliar);
router.delete("/api/afiliados/:dni", afiliadosControllers.deleteAfiliados);
router.put("/api/afiliados/:dni", afiliadosControllers.updateAfiliados);

export default router;