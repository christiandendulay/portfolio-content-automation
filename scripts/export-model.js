import 'dotenv/config';
import { execSync } from 'child_process';

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!spaceId || !token) {
  console.error('Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env');
  process.exit(1);
}

const cmd = `contentful space export \
  --content-file content-model-export.json \
  --skip-content \
  --skip-roles \
  --skip-webhooks \
  --space-id ${spaceId} \
  --management-token ${token}`;

console.log('Running:', cmd);
execSync(cmd, { stdio: 'inherit' });
