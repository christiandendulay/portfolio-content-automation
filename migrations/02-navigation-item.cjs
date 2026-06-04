module.exports = function (migration) {
  const navigationItem = migration.createContentType('navigationItem', {
    name: 'Navigation Item',
    description: 'Navigation Item',
    displayField: 'label',
  });

  navigationItem.createField('label', {
    name: 'Label',
    type: 'Symbol',
    required: false,
  });

  navigationItem.createField('url', {
    name: 'URL',
    type: 'Symbol',
    required: false,
  });

  navigationItem.createField('isExternal', {
    name: 'Is External',
    type: 'Boolean',
    required: false,
    defaultValue: { 'en-US': false },
  });

  navigationItem.changeFieldControl('label', 'builtin', 'singleLine');
  navigationItem.changeFieldControl('url', 'builtin', 'singleLine');
  navigationItem.changeFieldControl('isExternal', 'builtin', 'boolean');
};
