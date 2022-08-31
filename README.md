# Made-up Social Network (demo app)

## Backend Mocks

A NodeJS-based mock REST backend, created with [`mockoon`](https://mockoon.com/)

- run locally: `npx @mockoon/cli start --daemon-off --data backend-mocks/mockoon.json`
- update the Docker image (run `gcloud auth configure-docker us.gcr.io` if auth fails)
  ```
  npx @mockoon/cli dockerize \
    --data backend-mocks/mockoon.json \
    --port 8080 \
    --output backend-mocks/docker/Dockerfile
  docker buildx build \
    --platform linux/amd64 \
    --tag us.gcr.io/dev-viktor/madeup-social/madeup-social-mockoon:latest \
    --push \
    backend-mocks/docker
  ```
- update the Cloud Run instance
  ```
  gcloud run services update madeup-social-mockoon \
    --image="us.gcr.io/dev-viktor/madeup-social/madeup-social-mockoon:latest" \
    --region="us-central1" \
    --project="dev-viktor"
  ```
- test: `curl https://madeup-social-mockoon-ul7dy2h3tq-uc.a.run.app/notifications`

## Client

A plain Next.JS app created with `create-next-app`

- run locally: `npm run dev`
- build a production bundle: `npm run build`

## StepZen

- init a StepZen workspace

  ```bash
  mkdir stepzen
  cd stepzen
  npx stepzen init
  ```

- create GraphQL schema for a REST endpoint (given a curl command)
  ```bash
  stepzen import curl https://madeup-social-mockoon-ul7dy2h3tq-uc.a.run.app/notifications
  ```
- tidy-up the auto-generated schema: merge the `GivenBy`, `Author` and `User` types
- enrich the `User` type: add a `country` property

  ```graphql
  extend type User {
    country: String
      @materializer(
        query: "userCountry"
        arguments: [{ name: "userId", field: "userId" }]
      )
  }

  type Query {
    userCountry(userId: String!): String
      @rest(
        endpoint: "https://madeup-social-mockoon-ul7dy2h3tq-uc.a.run.app/users/$userId;"
        resultroot: "country"
      )
  }
  ```

- deploy a GraphQL endpoint: `npx stepzen deploy` (be sure to login with `npx stepzen login` first)
