## start dynamodb locally & Run in offline mode
```
sls offline start
```

## find process running on port 8000
```
lsof -i tcp:8000
```
### then kill process 
```
kill -9 <PID>
```

## Deploy to AWS
```
sls deploy -v
```
