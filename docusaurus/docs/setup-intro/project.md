---
sidebar_position: 2
slug: /setup/project
---

# Project

How to setup project in OBA2 after apply monorepo for docusaurus


### Folder structor in docusaurus  

```
ui
├── src
|   ├── token
|   |    └── ...
|   └── components   
|   |    ├── button
|   |    |   ├── composition.tsx
|   |    |   ├── index.tsx
|   |    |   └──  Style.ts
|   |    └── timer 
|   |        ├── Clock.tsx
|   |        ├── composition.tsx
|   |        ├── Dot.tsx
|   |        ├── index.tsx
|   |        ├── Style.ts
|   |        ├── Tick.tsx
|   |        ├── types.ts
|   |        └── useCountDown.ts
|   ├── index.ts
|   └── ultis.ts
├── package.json 
└── ...
``` 

### Install npm local in OBA2 

As the folder structor of doucusaurus above , we can install button and timer components to OBA2 by run 

``` npm install +  [ directory location where package.json located] ```  

``` yarn add +  [ directory location where package.json located] ``` 

in the terminal or command line

In OBA2 project you will see in your package.json 

```
"@yds/ui": "(your local directory)/yds-docusaurus/packages/ui"
``` 
 
Import components to app 

```
Import { Button , Timer } from  "@yds/ui"
``` 


### Publish private components to npm server 

1. To use private packages, you must
- be using npm version 2.7.0 or greater. To upgrade, on the command line, run

    ``` npm install npm@latest -g ``` 
- have a paid user or [`organization account`](https://www.npmjs.com/products)


2. To publish components , navigate to your root folder where your package.json ( contained your components ) located and run ``` npm publish ``` 
