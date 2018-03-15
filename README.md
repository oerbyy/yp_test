# Task list with time tracking

#### Author: Volodymyr Shchukin 

This is a small demo task-list tracker based on JS/React/Redux (no backend) with basic functionality:
* user may add a task
* user may delete a task
* user may turn on/off a task he is currently working on (only one task can be active at a time)
* user may see how much time is already spent on each task
* user may set a task as done
* user may prioritize tasks by drag-n-drop
* no authentication / authorization 
* webpage is packed into Electron, so it can be run as a desktop app (instructions below)

## Usage

Please download the latest source code.

I) To run in browser please use
```
npm install
npm start
```

Open the following URL in browser: 
http://localhost:3000/ 

II) To make a Win32 executable program please use

```
npm install
npm run dist
npm run pack
```

Locate and run the .\dist\win-unpacked\yp-test.exe

## Known issues

* For drag-n-drop please hold a task for half second then move on
* Please do NOT use drag-n-drop feature while timer is enabled

## Notes
Electron package was build with help of this [instruction]( 
https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c) 
