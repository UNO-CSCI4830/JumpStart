# JumpStart

Project JumpStart is a website to assist current and incoming UNO students connect with other current and former UNO students to share resources and advice that can help newer students navigate their college experience.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm
- MongoDB
- Modern web browser

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/UNO-CSCI4830/JumpStart.git
   cd JumpStart
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Installing MongoDB
   
   Windows:
   1. [Download installer](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-8.0.3-signed.msi)
   2. Follow install prompt
   3. (Optionally) Specify a unique folder if necessary
   4. Start the MongoDB service by pasting the following into Command Prompt as admin:
      ```
      "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" 
      ```
      - If a unique folder has was chosen in step 3, append the command with `--dbpath="c:[PATH-TO-DB]`.
   5. Open MongoDBCompass app
   6. Click the Add New Connection button, or the plus in the Connections column
   7. Enter localhost:27017 into URI
   8. Select Save & Connect

   Mac:
   1. Install the MongoDB package using Homebrew
      ```bash
      $ brew tap mongodb/brew
      $ brew update
      $ brew install mongodb-community@8.0
      ```
   2. Start the MongoDB service
      ```bash
      $ brew services start mongodb
      ```

   RHEL:
   1. Prep `yum` with MongoDB repository
      ```bash
      $ touch /etc/yum.repos.d/mongodb-org-8.0.repo
      $ echo "name=MongoDB Repository" >> /etc/yum.repos.d/mongodb-org-8.0.repo
      $ echo "baseurl=https://repo.mongodb.org/yum/redhat/9/mongodb-org/8.0/x86_644/" >> /etc/yum.repos.d/mongodb-org-8.0.repo
      $ echo "gpgcheck=1" >> /etc/yum.repos.d/mongodb-org-8.0.repo
      $ echo "enabled=1" >> /etc/yum.repos.d/mongodb-org-8.0.repo
      $ echo "gpgkey=https://pgp.mongodb.com/server-8.0.asc" >> /etc/yum.repos.d/mongodb-org-8.0.repo
      ```
   2. Install mongodb-org packages
      ```bash
      $ sudo yum install mongodb-mongosh-shared-openssl3
      $ sudo yum install mongodb-org
      ```
   3. Start mongodb-service
      ```bash
      $ sudo systemctl start mongod
      $ sudo systemctl status mongod
      ```
   4. To launch an interactive mongod shell:
      ```bash
      $ mongosh
      ```
4. Add demo posts to Database
   ```bash
   node src/backend/loadDB.js
   ```
   
5. Start development backend
   ```bash
   node src/backend/server.js
   ```

3. Start development frontend
      ```bash
      npm start
      ```

## License

This project is licensed under the GNU General Public License - see the [LICENSE](LICENSE) file for details.
