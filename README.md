# Contentful Automation

Automated content model migrations for Contentful CMS using the Contentful Migration DSL.

## Setup

```bash
# Install dependencies
pnpm install

# Create .env file
cp .env.example .env
```

### Fill in your .env:

```bash
CONTENTFUL_SPACE_ID=your-space-id
CONTENTFUL_MANAGEMENT_TOKEN=your-cma-token
CONTENTFUL_ENVIRONMENT=dev
```

| Variable                      | Description              | Where to get it                                      |
| ----------------------------- | ------------------------ | ---------------------------------------------------- |
| `CONTENTFUL_SPACE_ID`         | Your Contentful space ID | Settings → General settings                          |
| `CONTENTFUL_MANAGEMENT_TOKEN` | CMA token for API access | Settings → CMA tokens → Create personal access token |
| `CONTENTFUL_ENVIRONMENT`      | Target environment       | `master`, `dev`, `staging`, etc.                     |

### Scripts

| Command                   | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `pnpm format`             | Format all files with Prettier and sort package.json   |
| `pnpm format:check`       | Check formatting without writing                       |
| `pnpm migrate`            | Run all pending migrations on `CONTENTFUL_ENVIRONMENT` |
| `pnpm export:model`       | Export current Contentful model to JSON                |
| `pnpm generate:migration` | Generate migration script from exported JSON           |

|

### Migrations

All content model changes live in migrations/ as versioned JavaScript files. They run sequentially and are immutable once applied.

#### Creating a New Migration

```bash # Create a new file with the next number
touch migrations/11-add-new-field.js
```

```javascript
module.exports = function (migration) {
  const project = migration.editContentType('project');

  project.createField('newField', {
    name: 'New Field',
    type: 'Symbol',
    required: false,
  });

  project.changeFieldControl('newField', 'builtin', 'singleLine');
};
```

#### Running Migrations

```bash
# Uses the environment from .env (default: dev)
pnpm migrate
# Override for a specific run
CONTENTFUL_ENVIRONMENT=staging pnpm migrate
```

### Content Types

| File                      | Content Type      |
| ------------------------- | ----------------- |
| `01-project.js`           | Project           |
| `02-navigation-item.js`   | Navigation Item   |
| `03-header-navigation.js` | Header Navigation |
| `04-about-me.js`          | About Me          |
| `05-principle.js`         | Principle         |
| `06-how-i-work.js`        | How I Work        |
| `07-job.js`               | Job               |
| `08-experiences.js`       | Experiences       |
| `09-social-link.js`       | Social Link       |
| `10-contact-me.js`        | Contact Me        |

#### Workflow

Export Existing Model
If you have content types built in the Contentful UI and want to capture them as code:

```bash
pnpm export:model
pnpm generate:migration
# Review and rename the generated file, then commit
```

### Add a New Field

```bash

# 1. Create migration file

touch migrations/11-add-github-url-to-project.js

# 2. Write the migration

# 3. Format

pnpm format

# 4. Test

pnpm migrate:single 11-add-github-url-to-project.js

# 5. Commit

git add migrations/11-add-github-url-to-project.js
git commit -m "Add GitHub URL field to Project"
```

### Rules

- Never edit a migration file after it has run on any environment
- Always create a new file for each change
- Keep migrations forever — they are your content model history
- Format before committing with pnpm format
