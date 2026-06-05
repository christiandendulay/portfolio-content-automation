module.exports = function (migration) {
  const howIWork = migration.createContentType('howIWork', {
    name: 'How I Work',
    description: 'Principles and methodology',
    displayField: 'singletonId',
  });

  howIWork.createField('singletonId', {
    name: 'Singleton ID',
    type: 'Symbol',
    required: true,
    validations: [
      { unique: true },
      {
        regexp: { pattern: '^how-i-work$', flags: null },
        message: "Must be 'how-i-work'",
      },
    ],
  });

  howIWork.createField('principles', {
    name: 'Principles',
    type: 'Array',
    required: false,
    items: {
      type: 'Link',
      linkType: 'Entry',
      validations: [
        {
          linkContentType: ['principle'],
          message: 'Should be Principle content',
        },
      ],
    },
  });

  howIWork.createField('title', {
    name: 'Title',
    type: 'Symbol',
    required: false,
  });

  howIWork.changeFieldControl('singletonId', 'builtin', 'singleLine');
  howIWork.changeFieldControl('principles', 'builtin', 'entryLinksEditor');
  howIWork.changeFieldControl('title', 'builtin', 'singleLine');
};
