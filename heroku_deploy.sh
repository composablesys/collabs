rm -rf node_modules
rm -rf ./client/node_modules
rm -rf ./server/node_modules
rm -rf ./demo/node_modules
npm install client
cd ./client
npm run tsc 
cd ..
npm install server
cd ./server
npm run tsc 
cd ..
npm install demo
cd ./demo
npm run tsc
npm run wp 
npm run start
