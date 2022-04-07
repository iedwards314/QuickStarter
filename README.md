# Quickstarter

Welcome to the QuickStarter wiki! Quickstarter is an app (clone of Kickstarter) for business founders to connect with perspective investors/angels to allow the businesses to receive donations to begin their businesses. Businesses receive support without the expectation of receiving ownership or expectations of return of capital.

## Index
[MVP Feature List ](https://github.com/iedwards314/QuickStarter/wiki/Feature-List) | [ User Stories ](https://github.com/iedwards314/QuickStarter/wiki/User-Stories)| [ Database Schema ](https://github.com/iedwards314/QuickStarter/wiki/Database-Schema)|
[ Wire Frames ](https://github.com/iedwards314/QuickStarter/wiki/Wire-Frames)

## Technologies Used
1. Front End
   - React, Redux, HTML, CSS
2. Backend
   - Python, SQLAlchemy, Psychopg, Flask

## Getting starterd
### Dev Containers (M1 Users, follow this guide)
1. Make sure you have the [Microsoft Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed.
2. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer.
3. Clone the repository (only this branch)
   ```bash
   git clone https://git@github.com:iedwards314/QuickStarter.git
   ```
4. Open the repo in VS Code.
5. Click "Open in Container" when VS Code prompts to open container in the bottom right hand corner.
6. **Be Patient!** The initial install will take a LONG time, it's building a container that has postgres preconfigured and even installing all your project dependencies. (For both flask and react!)

   **Note:** This will take much less time on future starts because everything will be cached.

7. Once everything is up, be sure to make a `.env` file based on `.env.example` in both the root directory and the *react-app* directory before running your app.

8. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

9. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

<br>

### Standard (Traditional)

1. Clone this repository (only this branch)

   ```bash
   git clone https://git@github.com:iedwards314/QuickStarter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***


*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Helpful DB commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |

## Features

### Users Who are not Logged In
These users can:
  - Sign-up for a username
  - View a list of projects
  - View a specific project page
  - View projects based on search criteria

### Logged in Users
These users can:
  - Create/View/Edit/Delete Projects
  - Create/View/Edit/Delete Project Rewards for projects they created
  - Add support to other projects

### Projects
To View a list of Projects:
  - Navigate to the main page, scroll down the page to see a list of projects
    - Click on the `Quickstarter` logo at the top of any page
  - Click `Discover` on the top left
    - Click on any `category button` and a list of projects related to that category will populate

To View a Project:
  - Click on any `Project Title` or `Project Description` to be taken to that project's unique page

To Create a Project:
  - Log into the site
  - Click `Create a project` to be taken to the create project form page
  - Fill in the following fields:
    1. Title (required)
    2. Funding Goal (required as an integer)
    3. End Data (required)
    4. Image url (prepopulated if no custom image submitted)
    5. Project Category (required)
    6. Description (required)
  - Click `Create a new project` to be taken back to the home page to see the newly created project at the bottom of the list

To Edit a Project:
  - Log into the site
  - Navigate to the project page
  - Click `Edit` to be taken to the edit project form
  - Review and update the following fields:
    1. Title (required)
    2. Funding Goal (required as an integer)
    3. End Data (required)
    4. Image url (prepopulated if no custom image submitted)
    5. Project Category (required)
    6. Description (required)
  - Click `Finalize Edit` to be taken back to the home page to see the newly created project at the bottom of the list

To Delete a Project:
  - Log into the site
  - Navigate to the project page
  - Click `Delete`
    - Click `Confirm` to successfully delete a project
    - Click `Cancel` to back out of the action

### Project Backing / Rewards
(Project Creator View)
To View a reward on a project that the user created:
  - Log into the site
  - Navigate to the project page
  - Click `Edit Rewards` to be taken to the rewards form and see a list of currently available *reward* options

To Add a reward on a project that the user created:
  - Log into the site
  - Navigate to the project page
  - Click `Edit Rewards` to be taken to the rewards form and see a list of currently available *reward* options
  - Click `Add reward` and a reward module will show
    - Provide the following information:
      1. Reward Title ((*required*))
      2. Description ((*required*))
      3. Amount ((*required*))
    - Click `Submit`
  - The newly added reward will be present in the list

To Edit a reward on a project that the user created:
  - Log into the site
  - Navigate to the project page
  - Click `Edit Rewards` to be taken to the rewards form and see a list of currently available *reward* options
  - Click `Edit reward` on an existing reward and a reward module will show
    - Update/Review the following information:
      1. Reward Title ((*required*))
      2. Description ((*required*))
      3. Amount ((*required*))
    - Click `Submit`
  - The updated reward will be present in the list

To Delete a reward on a project that the user created:
  - Log into the site
  - Navigate to the project page
  - Click `Edit Rewards` to be taken to the rewards form and see a list of currently available *reward* options
  - Click `Delete` on an existing reward and the reward will be removed from the list

(Project Supporter View)
To Add support to a project:
  - Log into the site
  - Navigate to the project page
  - Click `Back this Project` to take
  - *Select a Reward*
  - Enter an *amount* of the contribution
  - Click `Continue` to be taken to the payment details form
    - Enter the following info:
      1. Card Number (*required*)
      2. Cardholder Name (*required*)
      3. Expiration (*required*)
      4. Security Code (*required*)
      5. Zip/Postal Code (*required*)
    - Click `Pledge` to be taken back to the project page and the amount of the rewards increased


### Categories
- While on any page, Click `Discover`
- *Select a category* to be taken to a category page and see a list of projects matching that category

### Search
- While on any page, Click `Search`
- Enter *Search Criteria*
  - Hit `enter` or `return` on keyboard
  - A list of projects matching the criteria will populate
- Click `X` to leave the search module
