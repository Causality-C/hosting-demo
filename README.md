#  Decoupled Hosting

This segment will assume that you have already completed the coupled section as we are going to use the same Heroku account. We will not host the frontend via the backend on Heroku, but separately on a third party hosting service called Netlify. 

# File Structure
There are a lot of files in this repository which might make it confusing on what each does.
- my-app: this folder contains the frontend React application 
- .gitignore: file that restricts some files from being pushed to git, we might want to do this to prevent sensitive information (API Keys) from being public
- package.json: contains all the libraries and scripts that we are going to use
- index.js: our backend application
- .env.example: what the environment variable file (.env) should look like. Put your environment variables in .env and not .env.example
- export_env.sh: custom script to export environment variables on Heroku App

# Instructions
<details>
  <summary> <h3> (Optional) Set up Firebase </h3> </summary>
This project includes a simple Firebase-hosted database (Firestore) which should be configured before starting the code. Additionally, it will also be referenced in a future section where we talk about configuring environment variables in Heroku.

Note: if you do not want to enable firebase, you don't have to. Just comment out the following section
<img width="680" alt="image" src="https://user-images.githubusercontent.com/39445369/164337721-f57372d9-1047-41da-b9ef-b0f5ce746c39.png">

1. Create a Firebase account by navigating towards https://firebase.google.com/
2. Create a new project (Google Analytics are optional)
3. Create a Service Account where you will get AdminSDK Information (Click "Generate new private key")
![image](https://user-images.githubusercontent.com/39445369/164480393-371ffc83-9892-4a6e-bd2e-2ed43f1c63a6.png)
4. Navigate towards Cloud Firestore and create a new Firestore with an initial collection of "user" and initial document "jonathan" (This is because the API we wrote queries for this :) )
![image](https://user-images.githubusercontent.com/39445369/164481048-2cf130c3-f630-45c5-aaab-3ba334bf9176.png)
5. Inside your repository, add the variables you got in STEP 3 for the private key into a `.env` file. An example of the file is in `.env.example`
</details>

## Run the Code
The code has already been written so lets verify that everything is working as expected.

1. If you are planning on using Firebase features, add a `.env` file and fill in the values you get from the admin config file
2. Within the root directory (not my-app), run `npm install` which will install all dependencies for the backend.
3. Run `npm run start` to start the application -> your app should be running on `http://localhost:5000/`
4. Navigate to `my-app` and run `npm install` and `npm run start` to run the frontend on `localhost:3000`

## Deploy Backend to Heroku

We will be using Heroku to host our application so there are a few things that need to happen
  
1. Create a Heroku Account and Project: https://dashboard.heroku.com/login
2. Download and install the Heroku Cli Tool: https://devcenter.heroku.com/articles/heroku-cli
3. Once the Cli tool is installed, navigate back to the directory and run `heroku login` -> if you get stuck, consult this [source](https://devcenter.heroku.com/articles/heroku-cli#:~:text=with%20these%20instructions.-,Get%20Started%20with%20the%20Heroku%20CLI,-After%20you%20install)
5. If you have made any changes, make a commit via `git commit -am "changes"`
6. Deploy this branch to heroku via `git push heroku decoupled-hosting:main` -> we have `decoupled-hosting:main` since heroku technically only allows you to push main branches in a repository.
7. Run `source export_env.sh .env` to export your environment variables from .env onto Heroku
8. If everything goes well, you should see something like this in your command line
![image](https://user-images.githubusercontent.com/39445369/164490214-06254a45-fbba-4188-bc80-8745513e859e.png)

If there are any issues, you can view the most recent logs by running `heroku logs --tail`


## Deploy Frontend to Netlify

1. Create a Netlify Account and Project
2. Click "Import Existing Project"
![image](https://user-images.githubusercontent.com/39445369/164546877-570126ae-b10a-49da-9759-5159bc715452.png)



