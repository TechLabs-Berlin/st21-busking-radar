# st21-busking-radar
Team
Project Lead and WD Basan Kuberlinov
WD Ken Dolman
WD Celestine Onwuka
UX Claudia 
UX Andrew Moussa
DS Padcha
DS Sefine K.


Mentor
Bernardo Sunderhus

Tech Stack

Front End: CRA(Create React App) with Functional Components and Hooks, Redux (state Managment), Thunk(middleware), axios(sending http requests), Node-Sass(styling), Moment.js and react-dates(managing dates), react-router-dom 5 with history(for client side routing), Material UI

Backend: Node.js with Express, Cors (controlling access), MongoDB Atlas, Mongoose

1. Project Plan:

Two types of users, registered buskers and unregistered:

1. Landing Page (access: all users)
Content:
Registration or Login buttons
Info about the project with a link to interactive map

Actions:
When clicking a link to the interactive map
the user redirected to the interactive map
When clicking registration
The user is redirected to registration page 
When clicking login the user redirected to login page

2. Registration Page (access: all users)

Content
Registration form

Actions
Submit

3. Login Page (access: all users)

Content
Login Form

Actions
Login

4. Events Page (access: all users, actions restricted)

Content
Events (info: location, beginning time, ending time, title of the event, the name of the buskers, and genre?);
List of events;
List of the popular locations for Busking;
Interactive Map with the locations of events represented by pins;
Create Event Button

Actions
Events:
Currently happening events are underlined or lightened up (Polling?)
Past events are automatically deleted from the list and map (Polling?)

All users: 
Events can be filtered by date or time, and search by genre or name of the artist
When clicking on the event's location on the map open the list of events scheduled in this location
When clicking on the event's name opens event's info?! (maybe we don't need that)
When clicking on the busker's name, the user is redirected to the buskers profile page

Unregistered users: 
When clicking on Create Event Button, they are redirected to registration page 

Registered users:
Can rate the list of popular locations depending on how busking friendly is the location. 
when clicking on the Create Event Button, they offerred to choose the location for event from the list, by clicking on the map or typing in the dress. Afterwards, they should confirm they are choice and proceed to create event form. 

5. Buskers Page (access: all users)

Content
List of Buskers' profiles, with info

6. My Profile page (access: registered users)

Content
Profile info

Actions
Delete, edit profile, change password

7. My Events page (access: registered users)

Content
List of events created by the user

Actions:
Delete and edit event
End event/police alert ('because of police!!')

8. Forgot password page (access: registered users)

Content:
Recover password form

Actions:
recover password

9. Busking in Berlin page (access: all users)

Content:
Info about city regulations and the most popular places for buskers in Berlin.
Links to Busker organizations in Berlin



2. Work Plan and Deadlines
- Together

Week 0/due 17 May
- Collect as much data about the topic as possible.
- Develop an elaborate plan and tasks.
- Establish a good team communication.
- Maybe: Finding Boiler plates for MERN stack?!


- WD

Week 1/Due 25 May
- Together: 
Decide on the project structure (folders structure)
- BackEnd: 
Initialize Express App;
Create a server;
Start working on a database (Mongo DB);
Start working on authetication features;
- Front End:
Initialize CRA(Create React App) for client side of application;
The component with registration and sign in forms;

Basan - CRUD functionality for Events, Project Plan

Week 2/Due 1 June
Celestine, Ken - user authentication. 
Basan - CRUD functionality for Events, Project Plan

Week 3/Due 8 June
- Start to work with the UX prototype
Celestine, Ken - user authentication. 
Basan - Interactive Map, Project Plan

Week 4/Due 15 Jun

Basan - Polling Mechanism

Week 5/Due 22 June

- Styling;

Week 6/Due 29 June
- Styling and testing;

- DS
Week 0
- Padcha: MockUp data with users finished

Week 1/Due 25 May

Padcha, Sefine: List of the popular locations with Geolocations data

Week 2/Due 1 June

Padcha, Sefine: List of the popular locations with Geolocations data

Week 3/Due 8 June

Padcha, Sefine: List of the popular locations with Geolocations data

Week 4/Due 15 June

Week 5/Due 22 June

Week 6/Due 29 June

- UX

Week 0
- Ken: 
the contacts of the musicians for survey collected
- UX team: 
had a meeting and outlined the most feasible and important features of the app

Week 1/Due 25 May

Claudia, Andrew - Survey

Week 2/Due 1 June

Claudia, Andrew - Survey

Week 3/Due 8 June

Claudia, Andrew - Survey and Wireframe

Week 4/Due 15 June

Claudia, Andrew - Wireframe and Prototype

Week 5/Due 22 June

Week 6/Due 29 June




3 Project structure (folders)
- /Busking Radar (main folder and the server side folder):
- files: package.json, index.js
- folders: client

- /Busking Radar/Client (Front End Side folder, inialized with CRA):
