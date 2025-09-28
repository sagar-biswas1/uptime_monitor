/**
 * Title: Environments
 * Description: Handle all environment related things
 * Author: Sagar Biswas
 * Date: 28/8/25
 */

// dependencies

// module scaffolding

const environments = {};

environments.staging = {
  port: 4000,
  envName: "staging",
};

environments.production = {
  port: 5000,
  envName: "production",
};

// determine which env was passed
const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

//   export corresponding env object

const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;

module.exports = environmentToExport;
