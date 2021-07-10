#Busking Radar
##Blog post

Busking Radar is an app that makes outdoor live entertainment easily discoverable for any user and helps buskers draw a larger audience to their performances. We are very happy to have successfully finished this project and we would like to share with you our path through its creation. 
*UX/UI:* We started the process by a brainstorming session about what features should the app include. For this purpose, we used the Prioritization grid, to evaluate the features in terms of importance and feasibility. 

![Screenshot of Prioritization Grid](https://github.com/TechLabs-Berlin/st21-busking-radar/blob/main/UX_Design/PrioritizationGrid.PNG)

After that we did our user research. This was a hard step, due to the fact that the users we were researching were very specific - buskers. Despite the fact that we did not have a broad number of people filling-up our survey, it still helped us a lot in terms of defining our personas and user stories. A great number of the buskers stated that they sometimes promote their performances on social media (45.5%), whereas 27.3% said they absolutely do. We were happy to discover that 90.9% of the people that filled up our survey would be happy to use an app that helps them showcase the time, date and location of their performances. Part of our questions consisted also in asking people what issues they encountered while busking. Most of them had recurring problems such as being asked by the police to leave or having a dispute with other buskers about the place. Due to the limited time we had, we unfortunately decided to drop off the feature that lets buskers rate a location in terms of “busker-friendliness”, in order to help buskers find the best spot for their performances. However, we included this feature in our Post MVP. 
Here of course comes the next phase - personas. We created two types of personas, the registered user (busker) and non-registered user (fans). This helped us to better identify their struggles and understand our users' perspective. 

![Screenshot of Personas](https://github.com/TechLabs-Berlin/st21-busking-radar/blob/main/UX_Design/Personas_UserStories.PNG)

An important part of our work was to create the wireframes and the user flow. We needed to decide on how the features we have previously thought about will be displayed on our app and how the user would interact with it. 

![Screenshot of Wireframes](https://github.com/TechLabs-Berlin/st21-busking-radar/blob/main/UX_Design/Wireframes.PNG) 
![Screenshot of User-flow](https://github.com/TechLabs-Berlin/st21-busking-radar/blob/main/UX_Design/User-Flow.PNG) 

Our final (but not really) final step was to create the prototypes. This step included a lot of testing, reviewing, fixing, retesting and was the part that we spent the most time on. Together with the creation of the UI, we also created the logo of our Busking Radar app. 

![Screenshot of Prototype](https://github.com/TechLabs-Berlin/st21-busking-radar/blob/main/UX_Design/PrototypeScreenshot.PNG) 
![Screenshot of Logo](https://github.com/TechLabs-Berlin/st21-busking-radar/blob/main/UX_Design/BuskingRadar-logo.png)

*Web Development:* As for web development, the CRUD operations for events, user authentication as well as the interactive map to display events were created to perform basic functionality of the application, whilst UX/UI delivered the wireframes and the first prototype. The technology used for the back end was NodeJS, Express, and MongoDB Atlas. Basic database structures were created for users (Buskers) and events which would later be tweaked to match UX and Data Science needs. JWT authentication was used for user auth and Mapbox GL JS was used to integrate in the app the interactive map. The mapbox-sdk npm package was used for geocoding. For the front end, React was applied. A small debate was had between using CSS and SASS which eventually settled on SASS. Redux was used for state management which stored user data, events, error and success handling. Furthermore, React Query was applied to create the polling mechanism for updating the events' status to active, when the certain event takes place at the time a user visits the interactive map. The project moved along quite quickly towards the MVP and was able to be deployed on Heroku. 

*Data Science:* In terms of data science, we implemented popular busking places by using geographic coordinates. The geographic coordinate system is a three-dimensional spherical surface to determine any location on Earth by a point with longitude and latitude coordinates. The places we used were selected by long-time street musicians. Here we created JSON data with 19 different locations and their coordinates. For this we used Visual Studio Code to create the JSON file. JSON data or so-called JavaScript Object Notation is a data representation format and is commonly used for APIs and Configs, they are easy to read and write and are compatible with most languages. The coordinates were found out through google maps. The popular places have the function of suggestions for buskers as well as for users searching for the best locations to join.
For testing and prototyping purposes, we needed user accounts for buskers.  Therefore we acquired a free fake API from jsonplaceholder. This is a website, which provides free fake data and is sponsored by mockend. This data was used to generate user accounts for buskers. By doing that we tested the user surface of profiles and made changes for a more user-friendly and aesthetic look. Furthermore, we checked the functionality of our website and the map view and created fake events.

Thank you very much for your attention. We are extremely happy to have had the opportunity to do this project. We really hope to have caught your interest :) 

*Best wishes from the Busking Radar’s Team!* 


