# Tic-Tac-Toe



### Description:
TicTacToe is small JS game where it takes one or two players to play. The goal of the game is to make a row, column or diagonal of the same symbols to win. This project's developement started on my JS Front-End studying program in SoftUni at the summer of 2024 as training and improving my knowledge, skills and practice with HTML, CSS, JS and DOM elements. it's now in pre-lapha version but its development continues on. I hope you like it :>


### Download repo guide:
There are a couple of ways to do it:

- Create a new folder on C: drive. Open CMD and navigate to its location: `cd C:\...\<folder path>`. Then type:
```
git clone https://github.com/S7lkr/Tic-Tac-Toe.git`
```
- Or simply click `<> Code` button, `Download ZIP`. Make sure the folder you extract the files, is on C: drive.

- If you are using GitHub Desktop app, select `Open with GitHub Desktop`.


### How to Test/run in CMD (Command Prompt):
1> Have Node.js installed on your system. Check with: `node --version` or `node -v`

2> You can run your file in http-server. Run the command `npm install http-server -g`

3> Execute command `http-server` to start a local server.

4> Go to your browser and type in the address bar `localhost:8080`. Your Application should run now locally on port 8080.


### How to Test/run in VSC (Visual Studio Code):
=============================
1> Go to Extensions tab in VSC, type 'Live Server' in searh bar and install it.

2> Locate the folder you cloned/downloaded into, open it and on an empty space click right mouse button and select `Open with code` option. Or simply open VSC, if your workspace is empty you will see 2 blue buttons: `Open folder` and `Clone repository`. Click on 'Open Folder' and navigate to it.

3> When in VSC right click on the .html file and select `Open with Live Server`. The game has launched automatically on _http://localhost:5500_


### NOTE:
Live Server' localhost works on port **5500** by default. The most common and recommended method to work on a custom port is to use Workspace Settings. To do this, create a `.vscode` folder at the root of your project directory if it doesn't already exist, then create a file named settings.json inside it. Add the following JSON structure, replacing [YOUR_DESIRED_PORT] with your chosen port number:

```
{
    liveServer.settings.port: ['YOUR_PORT']
}
```
For example to use port 8080:

```
{
    liveServer.settings.port: 8000,
}
```
Now app will be working on this particular port.