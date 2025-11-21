import { defineConfig } from "tsdown";

const config = defineConfig({
	entry: "src/index.ts",
	sourcemap: true,
	dts: false,
	format: ["esm"],
	external: ["@prisma/client", "@prisma/adapter-pg", "pg"],
});

export default config as Record<string, unknown>;
