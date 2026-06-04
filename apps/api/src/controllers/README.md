# Controllers

Request handlers that parse input, call services, and format responses.

## Pattern
```typescript
export async function createProject(req: Request, res: Response) {
  const input = createProjectSchema.parse(req.body);
  const project = await projectService.create(req.userId, input);
  res.status(201).json({ data: project });
}
```

## Planned Controllers (Phase 5+)
- `project.controller.ts`
- `execution.controller.ts`
- `ai.controller.ts`
- `user.controller.ts`
