import 'dotenv/config';

import { runMigration } from 'contentful-migration';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationDir = path.join(__dirname, 'migrations');
const files = fs
  .readdirSync(migrationDir)
  .filter((f) => f.endsWith('.js'))
  .sort();

async function runAll() {
  for (const file of files) {
    console.log(`\n▶️ Running ${file}...`);

    const absolutePath = path.resolve(migrationDir, file);

    try {
      await runMigration({
        filePath: absolutePath,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
        environmentId: process.env.CONTENTFUL_ENVIRONMENT ?? 'master',
        yes: true,
      });
      console.log(`✅ ${file} completed`);
    } catch (err) {
      console.error(`❌ ${file} failed:`, err.message);
      process.exit(1);
    }
  }
  console.log('\n🎉 All migrations completed!');
}

runAll();
