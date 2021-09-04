import { SpecificationRepository } from "../../repositories/implementations/specificationRepository";
import { CreateSpecificationController } from "./createSpecificationController";
import { CreateSpecificationService } from "./createSpecificationService";

const specificationRepository = new SpecificationRepository();
const createSpecificationService = new CreateSpecificationService(specificationRepository);
const createSpecificationController = new CreateSpecificationController(createSpecificationService);

export { createSpecificationController };
