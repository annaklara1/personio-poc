# Proof of Concept

This PoC should show, that it is possible to fetch data inside a FaaS from an external API and process it.<br />
In this case it's done with AWS Lambda and Person.io-API.

To set Environment Variables create a file called `secrets.yml` and place it inside a S3-Bucket
```yaml
ENVIRONMENT:
  PERSONIO_CLIENT_ID: <client_id>
  PERSONIO_CLIENT_SECRET: <Client_secret>
  PGHOST: <host>
  PGUSER: <user>
  PGPASSWORD: <password>
  PGDATABASE: <table>
  PGPORT: <port>
```