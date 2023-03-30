const express = require('express');
const fs = require('fs-extra');
const { Op } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const Package = require('../../models/package');
const User = require('../../models/user');
const auth = require('../auth');
const userConverter = require('../../converter/userConverter');

const router = express.Router();
const pageSize = 20;

router.use((req, res, next) => {
  const decodedJwt = auth.getJWTClaims(req);
  const user = userConverter.ConvertSeesionJWTToUser(decodedJwt);
  if (!checkPermission(user)) return res.sendStatus(403);
  next();
});

function checkPermission(user) {
  return user.roles && user.roles.includes(User.UserRoles.USER);
}

router.get('/', async (req, res) => {
  const offset = (req.query.page || 0) * pageSize;

  const packages = await Package.findAll({
    order: [['createdAt', 'DESC']],
    limit: pageSize,
    offset,
  });

  res.send(packages);
});

router.get('/:id(\\d+)', async (req, res) => {
  const package = await Package.findByPk(req.params.id);
  res.send(package);
});

router.get('/:id(\\d+).plist', async (req, res) => {
  const package = await Package.findByPk(req.params.id);
  const template = await fs.readFile(
    `${global.__basedir}/template.plist`,
    'utf-8',
  );
  const ipaUrl = `https://${process.env.DOMAIN}/api/packages/${package.fileName}?auth=${auth.getJWTFromRequest(
    req,
  )}`;
  const modifiedTemplate = template
    .replace('{{ipa url}}', ipaUrl)
    .replace('{{app bundle identifier}}', package.bundleIdentifier)
    .replace('{{bundle version}}', package.versionName)
    .replace('{{App Title}}', package.displayName);
  res.set('Content-Type', 'application/xml');
  res.send(modifiedTemplate);
});

router.get('/:uuid([a-z0-9\\-]{36}):ext(.ipa|.apk)', async (req, res) => {
  const { uuid, ext } = req.params;
  const filePath = `${global.__basedir}/data/packages/${uuid}${ext}`;
  res.contentType('application/octet-stream');
  res.setHeader(
    'Content-Disposition',
    `attachment: filename="${uuid}${ext}"`,
  );
  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
});

router.get('/overview', async (req, res) => {
  const uniquePackageList = await Package.findAll({
    attributes: [
      'displayName',
      [sequelize.fn('MAX', sequelize.col('id')), 'id'],
    ],
    group: 'displayName',
  });

  const packages = await Package.findAll({
    where: {
      id: uniquePackageList.map((i) => i.id),
    },
    order: [['createdAt', 'DESC']],
  });

  res.send(packages);
});

router.post('/versionHistory', async (req, res) => {
  const { name } = req.body;
  const versionHistory = await Package.findAll({
    attributes: [
      'id',
      'platform',
      'versionName',
      'buildVersion',
      'displayName',
      'bundleIdentifier',
      'fileName',
    ],
    where: { displayName: name },
    order: [['id', 'DESC']],
  });

  res.send(versionHistory);
});

module.exports = router;
