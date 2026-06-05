module.exports = function (migration) {
  const project = migration.editContentType('project');

  project.createField('tags', {
    name: 'Tags',
    type: 'Array',
    required: false,
    items: {
      type: 'Symbol',
      validations: [],
    },
  });

  project.changeFieldControl('tags', 'builtin', 'tagEditor');
};
