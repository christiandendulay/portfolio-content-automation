require('dotenv').config();

const contentful = require('contentful-management');
const { runMigration } = require('contentful-migration');
const path = require('path');
const fs = require('fs');

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const migrationDir = path.join(__dirname, 'migrations');
const files = fs
  .readdirSync(migrationDir)
  .filter((f) => f.endsWith('.js'))
  .sort();

async function getExistingContentTypes() {
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master');
    const types = await environment.getContentTypes();
    return new Set(types.items.map((t) => t.sys.id));
  } catch (err) {
    console.error('Failed to fetch content types:', err.message);
    return new Set();
  }
}

function extractCreateContentTypeId(content) {
  // Match createContentType('id', { or createContentType("id", {
  const match = content.match(/createContentType\(['"]([^'"]+)['"]\)/);
  return match ? match[1] : null;
}

async function runAll() {
  const existing = await getExistingContentTypes();
  console.log('Existing content types:', Array.from(existing).join(', ') || 'none');

  for (const file of files) {
    console.log(`\n▶️ Checking ${file}...`);

    const filePath = path.join(migrationDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const contentTypeId = extractCreateContentTypeId(content);

    // Skip if this migration creates an existing content type
    if (contentTypeId && existing.has(contentTypeId)) {
      console.log(`⏭️  Skipped ${file} - content type "${contentTypeId}" already exists`);
      continue;
    }

    console.log(`   Running ${file}...`);

    try {
      await runMigration({
        filePath: filePath,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
        environmentId: process.env.CONTENTFUL_ENVIRONMENT || 'master',
        yes: true,
      });
      console.log(`✅ ${file} completed`);

      // Add to existing set so subsequent skips work
      if (contentTypeId) {
        existing.add(contentTypeId);
      }
    } catch (err) {
      console.error(`❌ ${file} failed:`, err.message || err);
      process.exit(1);
    }
  }
  console.log('\n🎉 All migrations completed!');
}

runAll();
