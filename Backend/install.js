const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Learning Hub Backend Installation Script');
console.log('==========================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    console.log('📋 Creating .env file from template...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created. Please update with your actual values.');
  } else {
    console.log('❌ No .env.example file found. Please create .env file manually.');
  }
} else {
  console.log('✅ .env file already exists.');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully!');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

console.log('\n🎉 Installation completed!');
console.log('\n📝 Next steps:');
console.log('1. Update your .env file with your MongoDB URI and other settings');
console.log('2. Run "npm run seed" to populate the database with sample data');
console.log('3. Run "npm run dev" to start the development server');
console.log('\n🔗 The server will be available at http://localhost:3000');
console.log('📊 API Health Check: http://localhost:3000/api/health');

