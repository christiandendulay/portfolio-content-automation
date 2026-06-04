module.exports = function (migration) {
  const contactMe = migration.createContentType('contactMe', {
    name: 'Contact Me',
    description: 'Contact me section',
    displayField: 'singletonId',
  });

  contactMe.createField('socialLinks', {
    name: 'Social Links',
    type: 'Array',
    required: false,
    items: {
      type: 'Link',
      linkType: 'Entry',
      validations: [
        {
          linkContentType: ['socialLink'],
          message: 'Should be Social Link Content',
        },
      ],
    },
  });

  contactMe.createField('singletonId', {
    name: 'Singleton ID',
    type: 'Symbol',
    required: true,
    validations: [
      { unique: true },
      {
        regexp: { pattern: '^contact-me$', flags: null },
        message: "Must be 'contact-me",
      },
    ],
  });

  contactMe.createField('title', {
    name: 'Title',
    type: 'Symbol',
    required: false,
  });

  contactMe.createField('description', {
    name: 'Description',
    type: 'Text',
    required: false,
  });

  contactMe.createField('email', {
    name: 'Email',
    type: 'Symbol',
    required: false,
  });

  contactMe.changeFieldControl('socialLinks', 'builtin', 'entryLinksEditor');
  contactMe.changeFieldControl('singletonId', 'builtin', 'singleLine');
  contactMe.changeFieldControl('title', 'builtin', 'singleLine');
  contactMe.changeFieldControl('description', 'builtin', 'markdown');
  contactMe.changeFieldControl('email', 'builtin', 'singleLine');
};
