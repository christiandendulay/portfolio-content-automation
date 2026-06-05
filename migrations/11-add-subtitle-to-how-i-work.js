module.exports = function (migration) {
  const howIWork = migration.editContentType('howIWork');

  howIWork.createField('subtitle', {
    name: 'Subtitle',
    type: 'Symbol',
    required: false,
  });

  howIWork.changeFieldControl('subtitle', 'builtin', 'singleLine');
};
