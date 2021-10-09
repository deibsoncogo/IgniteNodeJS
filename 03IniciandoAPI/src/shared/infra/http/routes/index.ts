import { Router } from "express"; // iremos usar o router para lidar com as rotas
import { authenticateRoute } from "./authenticateRoute";
import { carRoute } from "./carRoute";
import { categoryRoute } from "./categoryRoute";
import { specificationRoute } from "./specificationRoute";
import { userRoute } from "./userRoute";

const router = Router(); // método para facilitar a utilização da dependência

router.use("/category", categoryRoute); // cria uma rota para categoria
router.use("/specification", specificationRoute); // cria uma rota para especificação
router.use("/user", userRoute); // cria uma rota para usuário
router.use("/car", carRoute); // cria uma rota para carro
router.use(authenticateRoute); // cria uma rota para autenticação

export { router }; // exporta para poder ser chamado
