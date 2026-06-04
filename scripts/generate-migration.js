import fs from 'fs';

const exportFile = process.argv[2] || 'content-model-export.json';
const outputFile = process.argv[3] || 'migrations/01-imported-model.js';

const data = JSON.parse(fs.readFileSync(exportFile, 'utf8'));

const lines = [];
lines.push(`module.exports = function (migration) {`);
lines.push(``);

for (const ct of data.contentTypes || []) {
  const id = ct.sys.id;
  const name = ct.name;
  const desc = ct.description || '';
  const displayField = ct.displayField;

  lines.push(`  // Content type: ${name}`);
  lines.push(`  const ${toCamelCase(id)} = migration.createContentType('${id}', {`);
  lines.push(`    name: '${escape(name)}',`);
  if (desc) lines.push(`    description: '${escape(desc)}',`);
  if (displayField) lines.push(`    displayField: '${displayField}'`);
  lines.push(`  });`);
  lines.push(``);

  for (const field of ct.fields || []) {
    const config = {
      name: field.name,
      type: field.type,
    };

    if (field.required) config.required = true;
    if (field.localized) config.localized = true;
    if (field.type === 'Link') config.linkType = field.linkType;
    if (field.type === 'Array' && field.items) config.items = field.items;
    if (field.validations?.length) config.validations = field.validations;
    if (field.defaultValue) config.defaultValue = field.defaultValue;

    lines.push(
      `  ${toCamelCase(id)}.createField('${field.id}', ${JSON.stringify(config, null, 4).replace(/\n/g, '\n  ')});`
    );
  }

  const editorInterface = data.editorInterfaces?.find((ei) => ei.sys.contentType.sys.id === id);

  if (editorInterface?.controls) {
    lines.push(``);
    for (const control of editorInterface.controls) {
      if (control.widgetId) {
        lines.push(
          `  ${toCamelCase(id)}.changeFieldControl('${control.fieldId}', '${control.widgetNamespace || 'builtin'}', '${control.widgetId}');`
        );
      }
    }
  }

  lines.push(``);
}

lines.push(`};`);

fs.writeFileSync(outputFile, lines.join('\n'));
console.log(`✅ Migration written to ${outputFile}`);

function toCamelCase(str) {
  return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase());
}

function escape(str) {
  return str.replace(/'/g, "\\'");
}
