module.exports = function (migration) {
  const experiences = migration.createContentType('experiences', {
    name: 'Experiences',
    description: 'Job experience collections',
    displayField: 'singletonId',
  });

  experiences.createField('singletonId', {
    name: 'Singleton ID',
    type: 'Symbol',
    required: true,
    validations: [{ unique: true }, { regexp: { pattern: '^experiences$', flags: null } }],
  });

  experiences.createField('jobExperiences', {
    name: 'jobExperiences',
    type: 'Array',
    required: false,
    items: {
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['job'] }],
    },
  });

  experiences.createField('title', {
    name: 'Title',
    type: 'Symbol',
    required: false,
  });

  experiences.changeFieldControl('singletonId', 'builtin', 'singleLine');
  experiences.changeFieldControl('jobExperiences', 'builtin', 'entryLinksEditor');
  experiences.changeFieldControl('title', 'builtin', 'singleLine');
};
