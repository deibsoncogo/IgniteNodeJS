import { Request, Response } from "express";
import createCourseService from "./createCourseService";

export default function CreateCourse(request: Request, response: Response) {
  createCourseService.execute({ // executa o método chamado
    name: "Node JS",
    educator: "Daniela",
    duration: 10,
  });

  return response.send(); // retornar algo para o chamado
}
