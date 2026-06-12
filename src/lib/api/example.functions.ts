import { createServerFn } from "@tanstack/react-start";
// placeholder — unused
export const noop = createServerFn({ method: "GET" }).handler(async () => ({ ok: true }));
