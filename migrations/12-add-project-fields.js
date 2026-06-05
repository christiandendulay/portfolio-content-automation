module.exports = function (migration) {
  const project = migration.editContentType('project');

  project.createField('repoUrl', {
    name: 'Repository URL',
    type: 'Symbol',
    required: false,
    validations: [
      {
        regexp: {
          pattern: '^https://',
        },
        message: 'Must be a valid URL starting with https://',
      },
    ],
  });

  project.createField('liveDemo', {
    name: 'Live Demo',
    type: 'Symbol',
    required: false,
    validations: [
      {
        regexp: {
          pattern: '^https://',
        },
        message: 'Must be a valid URL starting with https://',
      },
    ],
  });

  project.createField('thumbnail', {
    name: 'Thumbnail',
    type: 'Link',
    linkType: 'Asset',
    required: false,
  });

  project.changeFieldControl('repoUrl', 'builtin', 'singleLine');
  project.changeFieldControl('liveDemo', 'builtin', 'singleLine');
  project.changeFieldControl('thumbnail', 'builtin', 'assetLinkEditor');
};
