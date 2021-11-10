# image-lambda

Created by Sarah Creager

## Dependencies
 none

## Summary of Problem Domain

Use a lambda function to automatically process image files after they're uploaded to an s3 bucket.  
 
lambda function must:

* Download the “images.json” from the S3 Bucket if it exists

* Create a metadata object describing the image

* Append the data for this image to the array

* Upload the images.json file back to the S3 bucket

## Problems Encountered
 I encountered quite a few issues in this lab. I'm not able to get my lambda function working properly. Normally, I would play around with things, break them, fix them, and learn as I go, but I'm more hesistant to do this with this lab because it could result in me being charged.

## Links to application deployment

[images.json link](https://creager-image-bucket.s3.us-west-2.amazonaws.com/images.json)

