# Recommended setup
1. Create a new user for this script.
```
sudo adduser dca
```

2. Enter in the new user created.
```
sudo su - dca
```

3. Install node via nvm. Follow the instructions:
https://github.com/nvm-sh/nvm

4. Check you have node installed successfully.
```
node -v
```

5. Check and save where is node installed.
```
whereis node
```

6. Clone this repository.
```
git clone https://github.com/bofavom/krakenDCA.git
```

7. Change to the new directory.
```
cd krakenDCA
```

8. Install the required npm packages.
```
npm install
```

9. Edit the .env file with the corresponding data.
```
nano .env
```

10. Give strict permissions to the main files.
```
chmod 400 kraken.js .env
```

11. Use crontab for run this script periodically.
```
crontab -e
0 1 * * 1 cd /home/dca/krakenDCA/ && /home/dca/.nvm/versions/node/v15.3.0/bin/node kraken.js >> /home/dca/krakenDCA/kraken.log 2>> /home/dca/krakenDCA/error
```