import { loadEnvConfig } from '@next/env'
 
if (typeof window === 'undefined') { // Kiểm tra nếu đang chạy trên server
    const { loadEnvConfig } = require('@next/env');
  
    const projectDir = process.cwd();
    loadEnvConfig(projectDir);
}