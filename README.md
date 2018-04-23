## Set IAM User 
Download created IAM User as a .csv file. 

## Config Servlerless to use user account
```
sls config credentials --provider aws --key <access-key> --secret <secret-key>
``` 

## start dynamodb locally & Run in offline mode
```
sls offline start
```

## Test API with Httpie
```
http GET :3000/notes
http POST :3000/notes content="test note"
```

### Find process running on port 8000 if DynamoDB gets stuck
```
lsof -i tcp:8000
```

#### then kill process 
```
kill -9 <PID>
```

## Deploy to AWS
```
sls deploy -v
```
