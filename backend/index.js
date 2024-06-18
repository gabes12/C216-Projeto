import Fastify from "fastify";
import cors from "@fastify/cors";
import { connectToDB } from "./lib/db.js";
import { taskModel } from "./models/Task.js";

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors);

// Adicionar
fastify.post("/api/v1/task", async (req, res) => {
  const body = req.body;

  const newTask = taskModel({
    title: body.title,
  });

  try {
    await newTask.save();
    return {
      status: 201,
      message: "Task created!",
      task: newTask,
    };
  } catch (error) {
    console.log(error);
  }
});

// Listar todas
fastify.get("/api/v1/task/all", async (_, reply) => {
  try {
    const tasks = await taskModel.find({}).exec();
    reply.send({ tasks });
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: "Internal Server Error" });
  }
});

// deletar
fastify.delete("/api/v1/task/:id", async (request, reply) => {
  try {
    const deletedTask = await taskModel.findByIdAndDelete(request.params.id);
    if (!deletedTask) {
      return reply.status(404).send({ error: "Task não encontrada" });
    }
    reply.send({ message: "Task deletada com sucesso", task: deletedTask });
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: "Internal Server Error" });
  }
});

// Atualizar
fastify.put("/api/v1/task/:id", async (request, reply) => {
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    if (!updatedTask) {
      return reply.status(404).send({ error: "Task não encontrada" });
    }
    reply.send({ message: "Task atualizada com sucesso", task: updatedTask });
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: "Internal Server Error" });
  }
});

// Iniciar servidor
fastify.listen({ port: 3333, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info("Server rodando em http://localhost:3333");
  connectToDB();
});
