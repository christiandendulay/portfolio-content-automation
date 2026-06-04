module.exports = function (migration) {
  const socialLink = migration.createContentType('socialLink', {
    name: 'Social Link',
    description: 'Social Link',
    displayField: 'platformName',
  });

  socialLink.createField('icon', {
    name: 'icon',
    type: 'Link',
    linkType: 'Asset',
    required: false,
  });

  socialLink.createField('platformName', {
    name: 'Platform Name',
    type: 'Symbol',
    required: true,
    validations: [{ unique: true }],
  });

  socialLink.createField('url', {
    name: 'URL',
    type: 'Symbol',
    required: false,
  });

  socialLink.createField('label', {
    name: 'Label',
    type: 'Symbol',
    required: false,
  });

  socialLink.changeFieldControl('icon', 'builtin', 'assetLinkEditor');
  socialLink.changeFieldControl('platformName', 'builtin', 'singleLine');
  socialLink.changeFieldControl('url', 'builtin', 'singleLine');
  socialLink.changeFieldControl('label', 'builtin', 'singleLine');
};
