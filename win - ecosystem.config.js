module.exports = {
  apps: [
    {
      name: "celestial-auth",
      script: "./celestial-webservices/auth/server.js",
      ignore_watch: ["node_modules", "logs"],
      watch: true,
    },
    {
      name: "celestial-application",
      script: "node_modules/next/dist/bin/next",
      args: "dev",
      cwd: "./celestial-application",
      ignore_watch: ["node_modules", ".next"],
      watch: true,
      env: {
        NODE_ENV: "development",
        PORT: 80,
      },
    },
  ],
};
