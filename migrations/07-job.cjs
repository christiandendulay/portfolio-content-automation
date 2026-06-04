module.exports = function (migration) {
  const job = migration.createContentType('job', {
    name: 'Job',
    description: 'Job Experience',
    displayField: 'company',
  });

  job.createField('company', {
    name: 'Company',
    type: 'Symbol',
    required: false,
  });

  job.createField('role', {
    name: 'Role',
    type: 'Symbol',
    required: false,
  });

  job.createField('locationType', {
    name: 'Location Type',
    type: 'Symbol',
    required: false,
  });

  job.createField('startDate', {
    name: 'Start Date',
    type: 'Date',
    required: false,
  });

  job.createField('endDate', {
    name: 'End Date',
    type: 'Date',
    required: false,
  });

  job.createField('isCurrent', {
    name: 'Is Current',
    type: 'Boolean',
    required: false,
    defaultValue: { 'en-US': false },
  });

  job.createField('description', {
    name: 'Description',
    type: 'Text',
    required: false,
  });

  job.changeFieldControl('company', 'builtin', 'singleLine');
  job.changeFieldControl('role', 'builtin', 'singleLine');
  job.changeFieldControl('locationType', 'builtin', 'singleLine');
  job.changeFieldControl('startDate', 'builtin', 'datePicker');
  job.changeFieldControl('endDate', 'builtin', 'datePicker');
  job.changeFieldControl('isCurrent', 'builtin', 'boolean');
  job.changeFieldControl('description', 'builtin', 'markdown');
};
