module.exports = function (migration) {
  const aboutMe = migration.createContentType('aboutMe', {
    name: 'About Me',
    description: 'About me section',
    displayField: 'singletonId',
  });

  aboutMe.createField('title', {
    name: 'Title',
    type: 'Symbol',
    required: false,
  });

  aboutMe.createField('name', {
    name: 'Name',
    type: 'Symbol',
    required: false,
  });

  aboutMe.createField('yearsOfExperience', {
    name: 'Years of experience',
    type: 'Integer',
    required: false,
  });

  aboutMe.createField('specializations', {
    name: 'Specializations',
    type: 'Array',
    required: false,
    items: { type: 'Symbol' },
  });

  aboutMe.createField('coreStack', {
    name: 'Core Stack',
    type: 'Array',
    required: false,
    items: { type: 'Symbol' },
  });

  aboutMe.createField('searchEngine', {
    name: 'Search engine',
    type: 'Array',
    required: false,
    items: { type: 'Symbol' },
  });

  aboutMe.createField('cms', {
    name: 'CMS',
    type: 'Array',
    required: false,
    items: { type: 'Symbol' },
  });

  aboutMe.createField('bio', {
    name: 'Bio',
    type: 'Text',
    required: false,
  });

  aboutMe.createField('role', {
    name: 'Role',
    type: 'Symbol',
    required: false,
  });

  aboutMe.createField('headless', {
    name: 'Headless',
    type: 'Array',
    required: false,
    items: { type: 'Symbol' },
  });

  aboutMe.createField('singletonId', {
    name: 'Singleton ID',
    type: 'Symbol',
    required: true,
    validations: [
      { unique: true },
      {
        regexp: { pattern: '^about-me$', flags: null },
        message: "Must be 'about-me",
      },
    ],
    defaultValue: { 'en-US': 'about-me' },
  });

  aboutMe.createField('profilePicture', {
    name: 'Profile Picture',
    type: 'Link',
    linkType: 'Asset',
    required: false,
  });

  aboutMe.changeFieldControl('title', 'builtin', 'singleLine');
  aboutMe.changeFieldControl('name', 'builtin', 'singleLine');
  aboutMe.changeFieldControl('yearsOfExperience', 'builtin', 'numberEditor');
  aboutMe.changeFieldControl('specializations', 'builtin', 'tagEditor');
  aboutMe.changeFieldControl('coreStack', 'builtin', 'tagEditor');
  aboutMe.changeFieldControl('searchEngine', 'builtin', 'tagEditor');
  aboutMe.changeFieldControl('cms', 'builtin', 'tagEditor');
  aboutMe.changeFieldControl('bio', 'builtin', 'singleLine');
  aboutMe.changeFieldControl('role', 'builtin', 'singleLine');
  aboutMe.changeFieldControl('headless', 'builtin', 'tagEditor');
  aboutMe.changeFieldControl('singletonId', 'builtin', 'singleLine');
  aboutMe.changeFieldControl('profilePicture', 'builtin', 'assetLinkEditor');
};
