import { Request, Response } from "express";
import createCourseService from "./createCourseService";

export default function CreateCourse(request: Request, response: Response) {
  createCourseService.execute({ // executa o método chamado
    name: "Node JS",
    educator: "Daniela",
    duration: 10,
  });

  createCourseService.execute({ // executa mais uma vez o método
    name: "React JS",
    educator: "Diego",
  });

  return response.send(); // retornar algo para o chamado
}
