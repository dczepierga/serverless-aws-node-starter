const path = require('path');
const Docker = require('dockerode'); // eslint-disable-line import/no-extraneous-dependencies

const packageJson = require('../package.json');

const docker = new Docker();
const dockerImageName = 'swaggerapi/swagger-ui:latest';
const dockerContainerName = `${packageJson.name}-docs`;
const dockerCreateOptions = {
  Image: dockerImageName,
  name: dockerContainerName,
  Env: [
    'SWAGGER_JSON=/docs/api.json',
  ],
  ExposedPorts: {
    '8080/tcp:': {},
  },
  Volumes: {
    '/docs': {},
  },
  HostConfig: {
    Binds: [
      `${path.resolve(__dirname)}:/docs:ro`,
    ],
    PortBindings: {
      '8080/tcp': [{
        HostIP: '0.0.0.0',
        HostPort: '9200',
      }],
    },
  },
};

const dockerContainer = docker.getContainer(dockerContainerName);
dockerContainer.inspect((err, data) => {
  if (data) {
    const status = (data.State || {}).Status;

    if (status !== 'running') {
      console.log('Starting docker container...');
      dockerContainer.start();
    } else {
      console.log('Docker container is running');
    }
  } else {
    console.log('Pulling docker image...');
    docker.pull(dockerImageName, (streamErr, stream) => {
      if (streamErr) {
        console.error('Docker pull image error', streamErr);
        process.exit(1);
      }

      docker.modem.followProgress(stream, (progressErr) => {
        if (progressErr) {
          console.error('Docker pull image error', progressErr);
          process.exit(1);
        }

        console.log('Creating docker container...');
        docker.createContainer(dockerCreateOptions, (containerErr, container) => {
          if (containerErr) {
            console.error('Docker create container error', containerErr);
            process.exit(1);
          }

          container.start();
        });
      });
    });
  }
});
