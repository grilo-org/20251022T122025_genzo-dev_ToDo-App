import z from "zod";
import sanitize from "sanitize-html";

export const PriorityEnum = z.enum(["Eventual", "Normal", "Urgente"]);
export type Priority = z.infer<typeof PriorityEnum>;

const TaskBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Título deve ter pelo menos 1 caractere!")
    .max(50, "Título deve ter no máximo 50 caracteres!")
    .transform((val) => sanitize(val)),
  content: z
    .string()
    .trim()
    .min(5, "Conteúdo é obrigatório!")
    .transform((val) => sanitize(val)),

  priority: PriorityEnum.optional().default("Normal"),
});

// TaskCreateSchema: igual ao base por enquanto
export const TaskCreateSchema = TaskBaseSchema;

// TaskUpdateSchema: pode incluir campos extras no futuro (ex: id)
export const TaskUpdateSchema = TaskBaseSchema.extend({
  // id: z.string().uuid('ID inválido),
});
