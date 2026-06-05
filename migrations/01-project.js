module.exports = function (migration) {
  const project = migration.createContentType('project', {
    name: 'Project',
    description: 'Sample project',
    displayField: 'title',
  });

  project.createField('description', {
    name: 'Description',
    type: 'RichText',
    required: false,
    validations: [
      {
        enabledMarks: [
          'bold',
          'italic',
          'underline',
          'code',
          'superscript',
          'subscript',
          'strikethrough',
        ],
        message:
          'Only bold, italic, underline, code, superscript, subscript, and strikethrough marks are allowed',
      },
      {
        enabledNodeTypes: [
          'heading-1',
          'heading-2',
          'heading-3',
          'heading-4',
          'heading-5',
          'heading-6',
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
          'embedded-entry-block',
          'embedded-asset-block',
          'table',
          'asset-hyperlink',
          'embedded-entry-inline',
          'entry-hyperlink',
          'hyperlink',
        ],
        message:
          'Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, Unordered list, horizontal rule, quote, block entry, asset, table, link to asset, inline entry, link to entry, and link to Url nodes are allowed',
      },
      { nodes: {} },
    ],
  });

  project.createField('slug', {
    name: 'Slug',
    type: 'Symbol',
    required: true,
    validations: [{ unique: true }],
  });

  project.createField('title', {
    name: 'Title',
    type: 'Symbol',
    required: false,
  });

  project.changeFieldControl('description', 'builtin', 'richTextEditor');
  project.changeFieldControl('slug', 'builtin', 'singleLine');
  project.changeFieldControl('title', 'builtin', 'singleLine');
};
