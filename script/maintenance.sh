#!/bin/sh

echo 'cleaning up the bucket'
#TODO make a backup before deleting
s3cmd del --recursive --force s3://beta.readma.eu

echo 'Preparing dist with maintenance page'
rm -rf dist/ && mkdir dist/
cp src/templates/maintenance.html dist/index.html

echo "Enabling maintenance. To enable page just do the deploy"
s3cmd --exclude '*' --include '*.html' --mime-type="text/html"  --add-header='Cache-Control: max-age=259200' sync dist/* s3://beta.readma.eu/
