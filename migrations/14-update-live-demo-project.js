module.exports = function (migration) {
  const project = migration.editContentType('project');

  project.editField('liveDemo', {
    validations: [
      {
        regexp: {
          pattern: '^https?://',
        },
        message: 'Must be a valid URL starting with http:// or https://',
      },
    ],
  });
};
