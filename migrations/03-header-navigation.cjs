module.exports = function (migration) {
  const headerNavigation = migration.createContentType('headerNavigation', {
    name: 'Header Navigation',
    description: 'Header Navigation',
    displayField: 'title',
  });

  headerNavigation.createField('title', {
    name: 'Title',
    type: 'Symbol',
    required: false,
  });

  headerNavigation.createField('logoText', {
    name: 'Logo Text',
    type: 'Symbol',
    required: false,
  });

  headerNavigation.createField('logoLink', {
    name: 'Logo Link',
    type: 'Symbol',
    required: false,
  });

  headerNavigation.createField('navigationItems', {
    name: 'Navigation Items',
    type: 'Array',
    required: false,
    items: {
      type: 'Link',
      linkType: 'Entry',
      validations: [
        {
          linkContentType: ['navigationItem'],
          message: 'Should be Navigation Item Content',
        },
      ],
    },
  });

  headerNavigation.changeFieldControl('title', 'builtin', 'singleLine');
  headerNavigation.changeFieldControl('logoText', 'builtin', 'singleLine');
  headerNavigation.changeFieldControl('logoLink', 'builtin', 'singleLine');
  headerNavigation.changeFieldControl('navigationItems', 'builtin', 'entryLinksEditor');
};
