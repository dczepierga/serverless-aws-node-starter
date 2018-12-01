# serverless-aws-node-starter
[![Build Status](https://cloud.drone.io/api/badges/dczepierga/serverless-aws-node-starter/status.svg)](https://cloud.drone.io/dczepierga/serverless-aws-node-starter)

Modern AWS Serverless Starter Kit built on top of the [Serverless Framework](https://serverless.com/), giving you support for:
* JavaScript linting with [ESLint](https://eslint.org/) and style guide created by [Airbnb](https://github.com/airbnb/javascript)
* Unit tests with [Jest](https://jestjs.io/)
* GIT commit with [Commitizen](https://github.com/commitizen/cz-cli)
* GIT hooks with [husky](https://github.com/typicode/husky) to lint code on every commit and run tests before push
* Local development with [serverless-offline](https://github.com/dherault/serverless-offline)
* Releases with [semantic-release](https://semantic-release.gitbook.io/semantic-release/)
* CI/CD with [Drone.io](https://cloud.drone.io/)
* API documentation with [Swagger UI](https://swagger.io/tools/swagger-ui/)

## Requirements
- [Node.js v8.10.0](https://nodejs.org/en/blog/release/v8.10.0/)
- [Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [AWS CLI account configured](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
- [Docker](https://www.docker.com/) - for API documentation

## Install
```bash
# If you don't already have the serverless cli installed, do that
npm install -g serverless

# Use the serverless cli to install this repo
serverless install --url https://github.com/dczepierga/serverless-aws-node-starter --name <your-service-name>

# cd into project and set it up
cd <your-service-name>

# Install dependencies
npm install
```

Now you only need to change service name in following files:
* [`package.json`](./package.json) - `name` field
* [`serverless.yml`](./serverless.yml) - `service` field

## Deploy
If you've already set up your default AWS credentials:

```bash
npm run deploy
```

By default script will deploy to `dev` stage and `eu-west-1` region. You can deploy to different stage or region by passing command line arguments:
```bash
npm run deploy -- --stage test --region us-east-1
```

## Development
### Local dev server - simulate API Gateway
```bash
npm start
```

By default local dev server will use `dev` stage and `eu-west-1` region. You can start local dev server for different stage or region by passing command line arguments:
```bash
npm start -- --stage test --region us-east-1
```

For more options check [serverless-offline](https://github.com/dherault/serverless-offline) plugin documentation - [Usage and command line options](https://github.com/dherault/serverless-offline#usage-and-command-line-options)


### Creating and deploying new functions
#### Create function with unit tests
The starter Hello World function can be found at [`./src/handler.js`](./src/handler.js) with unit tests ['./src/handler.js`](./src/handler.spec.js). There you can find a basic function that returns success response with body and simple unit test for this functionality.

This is all basic [Serverless](https://serverless.com/). If you've never used it, be sure to get familiar with their [docs](https://serverless.com/framework/docs/providers/aws/).
More information about writing unit tests using [Jest](https://jestjs.io/) can be found in their [guide](https://jestjs.io/docs/en/getting-started.html).

#### Create configuration
The starter Hello World configuration can be found at [`src/handler.yml`](./src/handler.yml) and at [`serverless.yml`](./serverless.yml) in the `functions` section (linked file).

More details about function configuration can be found in the [AWS functions guide](https://serverless.com/framework/docs/providers/aws/guide/functions/)

> **IMPORTANT** Remember to add all required files in `package/include` section. Without this your function may not work after deploy to the cloud!

#### Test and diagnose your function
You can run unit tests using following command:
```bash
npm test
```

More options is available in Jest docs - [CLI Options](https://jestjs.io/docs/en/cli.html).

If you want to diagnose you function and local dev webserver is not enough for you, then you can invoke the function with logs - more details you can find in the Serverless docs - [AWS Invoke](https://serverless.com/framework/docs/providers/aws/cli-reference/invoke/).

#### Commit your code
Add all files to stage and run:
```bash
npm run commit
```

You'll be prompted to fill out any required commit fields at commit time.

## API documentation
Documentation for AWS API Gateway is provided by [serverless-aws-documentation](https://github.com/deliveryhero/serverless-aws-documentation) plugin and exported to [Swagger UI](https://swagger.io/tools/swagger-ui/) format.

To open deployed to AWS API Gateway documentation in Swagger UI, you must run:
```bash
npm run docs
```

## Cleanup
```bash
npm run detroy
```

By default script will cleanup `dev` stage and `eu-west-1` region. You can cleanup different stage or region by passing command line arguments:
```bash
npm run detroy -- --stage test --region us-east-1
```
