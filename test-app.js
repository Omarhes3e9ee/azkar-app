#!/usr/bin/env node

/**
 * Quran App Test Script
 * Run this script to test the application functionality
 * 
 * Usage:
 * node test-app.js
 */

console.log('🧪 Quran App Test Script');
console.log('========================\n');

// Test configuration
const testConfig = {
  baseUrl: 'http://localhost:5173',
  endpoints: [
    '/',
    '/surah',
    '/juz',
    '/translation',
    '/tajweed',
    '/azkar',
    '/test',
    '/surah/001',
    '/juz/01'
  ],
  timeout: 5000
};

// Simple HTTP test function
async function testEndpoint(url) {
  try {
    const response = await fetch(url);
    return {
      url,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText
    };
  } catch (error) {
    return {
      url,
      status: 'ERROR',
      ok: false,
      statusText: error.message
    };
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting endpoint tests...\n');
  
  const results = [];
  
  for (const endpoint of testConfig.endpoints) {
    const url = `${testConfig.baseUrl}${endpoint}`;
    console.log(`Testing: ${url}`);
    
    const result = await testEndpoint(url);
    results.push(result);
    
    if (result.ok) {
      console.log(`  ✅ ${result.status} - ${result.statusText}`);
    } else {
      console.log(`  ❌ ${result.status} - ${result.statusText}`);
    }
  }
  
  // Print summary
  console.log('\n📊 Test Results Summary');
  console.log('========================');
  
  const passed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  const total = results.length;
  const successRate = ((passed / total) * 100).toFixed(1);
  
  console.log(`Total Endpoints: ${total}`);
  console.log(`Passed: ${passed} ✅`);
  console.log(`Failed: ${failed} ❌`);
  console.log(`Success Rate: ${successRate}%`);
  
  if (failed > 0) {
    console.log('\n❌ Failed Endpoints:');
    results
      .filter(r => !r.ok)
      .forEach(r => {
        console.log(`  - ${r.url}: ${r.status} ${r.statusText}`);
      });
  }
  
  console.log('\n✅ Endpoint tests completed!');
  
  // Recommendations
  console.log('\n💡 Recommendations:');
  if (failed > 0) {
    console.log('  - Check if the development server is running');
    console.log('  - Verify all routes are properly configured');
    console.log('  - Check for any build errors');
  } else {
    console.log('  - All endpoints are accessible');
    console.log('  - Application is ready for testing');
  }
  
  return results;
}

// Check if running in Node.js environment
if (typeof window === 'undefined') {
  // Node.js environment
  const fetch = require('node-fetch');
  runTests().catch(console.error);
} else {
  // Browser environment
  console.log('This script is designed to run in Node.js environment.');
  console.log('For browser testing, use the test dashboard at /test');
}

module.exports = { runTests, testConfig };
