require('dotenv').config();
const { runMigration } = require('contentful-migration');
const path = require('path');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/run-single-migration.js <migration-file>');
  process.exit(1);
}

runMigration({
  filePath: path.join(__dirname, '..', 'migrations', file),
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  environmentId: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  yes: true,
})
  .then(() => console.log('✅ Done'))
  .catch((err) => {
    console.error('❌ Failed:', err.message);
    process.exit(1);
  });
