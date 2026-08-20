module.exports = {
  apps: [
    {
      name: 'aadhi-bhairava-backend',
      script: 'dist/index.js',
      instances: 'max', // Cluster mode
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      error_file: 'logs/pm2-error.log',
      out_file: 'logs/pm2-out.log',
      log_merge: true,
      time: true,
    },
  ],
};
