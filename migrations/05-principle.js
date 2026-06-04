module.exports = function (migration) {
  const principle = migration.createContentType('principle', {
    name: 'Principle',
    description: 'Principles on How I work',
    displayField: 'heading',
  });

  principle.createField('heading', {
    name: 'Heading',
    type: 'Symbol',
    required: true,
  });

  principle.createField('description', {
    name: 'Description',
    type: 'Text',
    required: true,
  });

  principle.createField('order', {
    name: 'Order',
    type: 'Integer',
    required: false,
    validations: [{ unique: true }],
  });

  principle.changeFieldControl('heading', 'builtin', 'singleLine');
  principle.changeFieldControl('description', 'builtin', 'markdown');
  principle.changeFieldControl('order', 'builtin', 'numberEditor');
};
