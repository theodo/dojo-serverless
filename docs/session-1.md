## Session 1: Set up a serverless application with simple functions

First, checkout session-1 branch.

```
git checkout session-1
```

### Set up AWS on your computer

First follow [this documentation](./setup-aws.md) to setup AWS profile on your computer

### Bootstrap your serverless application

- First install globally serverless library on your computer

```
npm install -g serverless
```

- Go in `/backend` folder and use serverless start command to create your project

```
serverless create --template aws-nodejs-typescript
yarn
```

This will create a serverless.yml that will container the configuration of your ressources. Here are the information you'll have to fill out

```
service:
  name: <name of your service; ex: dojo-serverless>

plugins: # this allow you to extend serverless framework with plugins
  - serverless-webpack

provider: # this will contains all the configuration related to your provider (AWS here)
  name: aws
  runtime: nodejs12.x
  region: <ex: eu-west-1>
  stage: <your environment; ex: dev>
  profile: <the profile used to deploy>

functions:
  hello: # name of your function
    handler: hello.main # file that handle the function execution
    events: # element that trigger the function -> here it's an http call to API Gateway service
      - http:
          method: get
          path: hello

resources: # Allow to import Cloudformation files to configure your ressources (DynamoDB, API Gateway etc.)
  - <path-to-ressouce-file>

custom: # Allow to define custom keys that can be used in the file with  ${self:custom.<key>}
  key: test
```

- **Bonus**: The create command has also generated `webpack.config.js` which will allow the serverless-webpack plugin to parse correctly the typescript and `tsconfig.json` to configure typescript.

- **Bonus**: To setup the absolute imports on your project, you can create `tsconfig.paths.json` and extend it in `tsconfig.json` with the key `"extends": "./tsconfig.paths.json"`

```
tsconfig.paths.json example

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@libs/*": ["libs/*"],
      "@handlers": ["handlers"],
    }
  }
}
```

### Deploy !

- To deploy your newly created stack, run `serverless deploy`
- You can go on [AWS Cloudformation](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks?filteringText=&filteringStatus=active&viewNested=true&hideStacks=false) interface to check out the ressources that have been created
- If you call your ressource with the url returned by the command http://<url>/hello, you should get you response !
- If you want to deploy only one function, use `serverless deploy -f <your-function-name>`
- To call locally one function, use `serverless invoke -f <your-function-name> --path path/to/mocked-event.json`

### Create the functions that will allow you to handle viruses

- createVirus
  --> use response.ts utilities
- getVirus
  --> explain how to get query params
- killVirus
  --> explain how to get url params

### Conclusion

To see final result, checkout session-2 branch
