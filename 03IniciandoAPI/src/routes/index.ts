import { Router } from "express"; // importa a dependência necessária
import { categoryRoute } from "./categoryRoute"; // importa o arquivo de rota de categoria
import { specificationRoute } from "./specificationRoute"; // importa o arquivo de rota de especificações

const router = Router(); // método para facilitar a utilização da dependência

router.use("/category", categoryRoute); // cria uma rota para as categorias
router.use("/specification", specificationRoute); // cria uma rota para as especificações

export { router }; // exporta para poder ser chamado