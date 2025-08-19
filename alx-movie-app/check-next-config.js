const fs = require('fs');
const path = require('path');

// Check if next.config.ts exists and is not empty
const checkNextConfigTs = () => {
  const configPath = path.join(__dirname, 'next.config.ts');
  
  if (!fs.existsSync(configPath)) {
    console.log('❌ next.config.ts does not exist');
    return false;
  }
  
  const stats = fs.statSync(configPath);
  if (stats.size === 0) {
    console.log('❌ next.config.ts exists but is empty');
    return false;
  }
  
  console.log('✅ next.config.ts exists and is not empty');
  console.log(`📄 File size: ${stats.size} bytes`);
  return true;
};

// Also check for other next.config files
const checkAllNextConfigs = () => {
  const possibleConfigs = [
    'next.config.ts',
    'next.config.js',
    'next.config.mjs',
    'next.config.cjs'
  ];
  
  console.log('🔍 Checking for Next.js configuration files...\n');
  
  possibleConfigs.forEach(config => {
    const configPath = path.join(__dirname, config);
    if (fs.existsSync(configPath)) {
      const stats = fs.statSync(configPath);
      console.log(`✅ ${config} - ${stats.size} bytes`);
    } else {
      console.log(`❌ ${config} - not found`);
    }
  });
};

// Run the checks
console.log('=== Next.js Configuration Check ===\n');
checkNextConfigTs();
console.log('\n=== All Configuration Files ===');
checkAllNextConfigs();
