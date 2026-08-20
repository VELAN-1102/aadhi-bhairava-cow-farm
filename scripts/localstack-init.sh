#!/bin/sh
echo "Initializing LocalStack S3 Buckets..."
awslocal s3api create-bucket --bucket cowfarm-assets --region us-east-1

# Configure bucket CORS
cat <<EOF > /tmp/cors.json
{
  "CORSRules": [
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
      "AllowedOrigins": ["*"],
      "ExposeHeaders": ["ETag"]
    }
  ]
}
EOF

awslocal s3api put-bucket-cors --bucket cowfarm-assets --cors-configuration file:///tmp/cors.json
echo "S3 Bucket cowfarm-assets initialized with CORS."
