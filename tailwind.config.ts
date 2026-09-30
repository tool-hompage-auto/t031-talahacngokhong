import type { Config } from "tailwindcss";

// Tailwind is installed per the playbook but the ported pages rely on the
// original index.css / landing.css; no utility classes are used.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {} },
  plugins: [],
};

export default config;
