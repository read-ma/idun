echo 'cleaning up the bucket'
#TODO make a backup before deleting
s3cmd del --recursive --force s3://linguamag.eu/

echo "Copying index.html"
cp public/index.production.html dist/index.html

echo "Uploading html"
s3cmd --exclude '*' --include '*.html' --mime-type="text/html"  --add-header='Cache-Control: max-age=259200' sync dist/* s3://linguamag.eu/

echo "Uploading css"
s3cmd --exclude '*' --include '*.css'  --mime-type="text/css" --add-header='Content-Encoding: gzip' --add-header='Cache-Control: max-age=259200'  sync dist/* s3://linguamag.eu/

echo "Uploading javascript"
s3cmd --exclude '*' --include '*.js'   --mime-type="application/javascript" --add-header='Content-Encoding: gzip' --add-header='Cache-Control: max-age=259200' sync dist/* s3://linguamag.eu/

echo "Uploading everything else"
s3cmd --exclude '*.html' --exclude '*.css' --exclude '*.js' sync dist/ s3://linguamag.eu/
