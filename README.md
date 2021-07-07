# st21-busking-radar

Busking Radar is the final group project which was created in order to complete the Berlin TechLabs Bootcamp. The team disciplines included UX/UI design, Web Development, and Data Science. All disciplines were put into practice to develop Busking Radar. Using interactive map for displaying street performances the Busking Radar makes outdoor live entertainment easily discoverable for any user and helps buskers draw a larger audience to their performances.

TEAM
- Andrew Moussa UX
- Basan Kuberlinov Project Lead and WD
- Celestine Onwuka WD
- Claudia UX 
- Ken Dolman WD
- Padcha DS 
- Sefine K. DS
- Mentor: Bernardo Sunderhus

TECH STACK

Front End: CRA, React, Redux, Thunk, Axios, Node-Sass, Moment.js and react-dates(managing dates), React-Router-Dom 5, React-Query Material UI

Backend: Node.js, Express, Cors, MongoDB Atlas, Mongoose

PROJECT STATUS
The project is still in production. MVP restrictions include:

Event can only be filtered by dates or searched by genre or event name.
Event type list is restricted to Music.
Data Set with the list of popular locations for busking are included in the database but are not implemented yet.
The aim is to include more types of street performances, as well as more filters for events and the filters for user's events (past, current, future). Moreover, in the post MVP Non-Busker users can create an account and follow Buskers, the Buskers will receive notifications to confirm that the event will take place, non-Buskers will receive about the current events near them. 


PROJECT STRUCTURE
- /Busking Radar (main folder and the server side folder):
files: package.json, server.js, README.md, seeds.js and popPlaces.js
folders: client, routes, models, middleware,controllers, config

- /Busking Radar/client (Front End side folder inialized with CRA): 
-Busking Radar/client/src:
files: App.js, index.js, .env
folders: _tests_, actions, components, filters, images, reducers, store, routers, styles

PROJECT PLAN:

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


