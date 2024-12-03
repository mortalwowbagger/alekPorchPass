Project Overview
This project implements a Page Object Model (POM) design pattern using Playwright and TypeScript for automated browser testing. The goal is to provide an easily extensible and maintainable structure for writing end-to-end tests for https://www.braustin.com/. The Page Object Model helps separate the logic of interacting with web pages from the tests themselves, leading to cleaner, more maintainable, and reusable test code.

Installation

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14 or higher)
npm (or yarn, if you prefer)

Steps to Install
Clone the repository:

git clone <https://github.com/mortalwowbagger/alekPorchPass>
cd <playwright-porchpass>

Install dependencies:

Install Playwright and TypeScript 

npm install playwright typescript @playwright/test ts-node

Configure TypeScript: If you don't have a tsconfig.json file already, create one by running:

npx tsc --init

Example of a basic tsconfig.json:

{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
Set up Playwright browser binaries: Playwright requires browser binaries to run tests. Install them by running:

npx playwright install
npm install

Run Tests
Options
npx playwright test
npx playwright test <testfile> 
npx playwright test --headed


Assumptions 
* Results will always return under all models for Oak Creek
* Monthly payment will change with downpayment options. Percentage selection won't equal input selection.
* Nav options have unique text

Challenges
* Captcha displayed running headless.
* Majority of elements interacted with during a test did not have ids - Used different selectors like class or text.
* Monthly payment did not reflect changes immediately - Added explicit waits.
