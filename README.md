Bad Bank Fullstack

This application follows a three-tier architecture:

Tier 1: User Interface (UI)
The UI consists of HTML, the Bootstrap CSS framework, and client-side JavaScript functionality. It handles dynamic management of web page elements and responds to user actions such as button clicks and text inputs.

Tier 2: Back-end API (API)
The API is built using Node.js functions and handles the management of routes, which represent different user environments (e.g., login page, transactions). It is connected to the third tier, the database, and facilitates data reading and writing to and from other web servers.

Tier 3: Back-end Cloud Database (Mongo)
The Cloud Database utilizes lowdb, a lightweight database package available through the Node Package Manager (NPM). It serves as the backend database for the application, storing and retrieving data as needed.


Installation and Instructions: Follow the steps below to download and set up this project on your local environment:

1. Download the project files and save them to a new directory.
2. Open the project directory in a text editor like VS Code.
3. In VS Code, open a new terminal and execute the command 'npm install' to install the project dependencies.
4. After the installation is completed, you should see a directory named 'node_modules' in the project directory.
5. In the terminal, run the command 'http-server' to start the project.
6. The terminal will display the port on which the project is running.
7. You can now access and explore the project in your local environment.

Project requirments
   
- Create Account
- Login 
- Deposit
- Withdraw
- All data
  
Technology used:
    HTML, CSS, JavaScript
    React, Redux, React Router
    Node, Express, Axios
    MongoDB, Mongoose
    Bootstrap, React Icons
    Input validation and error handling.

Link to AWS Deployment:---http://girum-mulat.s3-website-us-east-1.amazonaws.com/withdraw

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
