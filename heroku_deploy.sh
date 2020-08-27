npm install --force client
cd ./client
npm run --force tsc 
cd ..
npm install --force server
cd ./server
npm run --force tsc 
cd ..
npm install --forcedemo
cd ./demo
npm run --force tsc
npm run --force wp 
npm run --force start
