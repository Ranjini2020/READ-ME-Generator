
//function to generate markdown for README
function generateMarkdown(data) {

  var license = true;
  
  //removing spaces
  var markdown = `# ${data.githubRepo.replace(/-/g, " ")}\n`
  
  //Badge for the repo.
  markdown += `\n[![repo size](https://img.shields.io/github/repo-size/${data.githubUserName}/${data.githubRepo})](https://github.com/${data.githubUserName}/${data.githubRepo})`;
  
  //displays license next to the badge
  if (license) {
    markdown += ` [![Github license](https://img.shields.io/badge/license-${data.license.replace(/\b \b/g, "%20")}-blue.svg)](https://opensource.org/licenses/${licenseLink})`;
  }
  
  markdown += `\n\n## Title\n\n${data.title}\n`;
  
  //adding Description data
  markdown += `\n\n## Description\n\n${data.description}\n`;
  
  //adding Table of contents
  if (data.table) {
      markdown += '\n## Table of contents\n';
      markdown += '\n* [Installation](#installation)\n';
      markdown += '\n* [Usage](#usage)\n';
  
      if (data.contributeTrueOrFalse) {
      markdown += '\n* [Contributing](#contributing)\n';
      }
  
      if (data.testsTrueorFalse) {
      markdown += '\n* [Tests](#tests)\n';
      }
  
      markdown += '\n* [Questions](#questions)\n'
      markdown += '\n* [License](#license)\n'
  }
  
  //Instructions for dependencies
      markdown += `\n## Installation\n\n>Command for installing dependencies:\n\n\`\`\`\n${data.install}\n\`\`\`\n`;
  
  //Instructions for usage
      markdown += `\n## Usage\n\n${data.usage}\n`;
  
   // Licensing switching between cases
   switch (data.license) {
    case 'MIT':
      var licenseLink = 'mit-license.php';
      break;
    case 'GPL 3.0':
      var licenseLink = 'GPL-3.0';
      break;
    case 'APACHE 2.0':
      var licenseLink = 'Apache-2.0';
      break;
    case 'BSD 3':
      var licenseLink = 'BSD-3-Clause';
      break;
    default:
      license = false;
  }
  
  //adding the license
  if (license) {
    markdown += `\nLicensed under the [${data.license}](https://opensource.org/licenses/${licenseLink}) license.`
  }
  
  //adding contributing section, based on user choice
  if (data.contributeTrueOrFalse) {
    markdown += '\n## Contributing\n';
  }
  
  //adding test section based on user choice
  if (data.testsTrueorFalse) {
    markdown += `\n## Tests\n\n>To run tests, run this command:\n\n\`\`\`\n${data.testsContent}\n\`\`\`\n`;
  }
  
  //contact details
  markdown += `\n## Questions\n\nIf you have any questions, please contact [${data.githubUserame}](https://github.com/${data.githubUsername}).\n`;
  
  
  
    return markdown;
  }
  
  module.exports = generateMarkdown;