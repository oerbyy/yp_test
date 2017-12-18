# Y-Productive test task 

#### Author: Volodymyr Shchukin 

## [Task details](https://drive.google.com/file/d/1Assl0HLFEMRc9_WxCq4CAXzxEltDOTMJ/view) 

Реализовать​ ​небольшой​ ​таск​ ​лист​ ​с​ ​тайм-трекингом​ ​на​ ​базе​ ​React​ ​и​ ​Flux
архитектуры​ ​(Redux,​ ​Reflux,​ ​etc)​ ​без​ ​бэкенда.
Базовый​ ​функционал:
* аутентификация​ ​и​ ​авторизация​ ​не​ ​требуется
* пользователь​ ​должен​ ​иметь​ ​возможность​ ​добавить​ ​задачу
* пользователь​ ​должен​ ​иметь​ ​возможность​ ​отметить​ ​задачу,​ ​как
выполненная
* пользователь​ ​должен​ ​иметь​ ​возможность​ ​удалить​ ​задачу
* пользователь​ ​должен​ ​иметь​ ​возможность​ ​включить/выключить
таймер​ ​для​ ​задачи,​ ​тем​ ​самым​ ​показывая,​ ​что​ ​он​ ​начал​ ​над​ ​ней
работать.​ ​Он​ ​может​ ​работать​ ​только​ ​над​ ​одной​ ​задачей​ ​одновременно.
* пользователь​ ​должен​ ​иметь​ ​возможность​ ​увидеть,​ ​сколько​ ​времени​ ​он
потратил​ ​на​ ​задачу
* упаковать​ ​вашу​ ​страничку​ ​в​ ​Electron​,​ ​чтобы​ ​вышло​ ​приложение​ ​на
десктоп.
* Special​ ​feature​ ​(большой​ ​плюс​ ​в​ ​рейтинг):​ ​ ​пользователь​ ​должен​ ​иметь
возможность​ ​изменить​ ​приоритет​ ​задачи​ ​с​ ​помощью​ ​drag-and-drop.
Неуточненные​ ​детали​ ​реализуются​ ​по​ ​усмотрению​ ​разработчика.

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