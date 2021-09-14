import { Router } from "express"; // importa a dependência necessária
import { categoryRoute } from "./categoryRoute"; // importa o arquivo de rota de categoria
import { specificationRoute } from "./specificationRoute"; // importa o arquivo de rota de especificação
import { userRoute } from "./userRoute"; // importa o arquivo de rota de usuário

const router = Router(); // método para facilitar a utilização da dependência

router.use("/category", categoryRoute); // cria uma rota para categoria
router.use("/specification", specificationRoute); // cria uma rota para especificação
router.use("/user", userRoute); // cria uma rota para usuário

export { router }; // exporta para poder ser chamado
