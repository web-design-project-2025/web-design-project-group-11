JOURNEE
-
A travel inspiration website for users to find their deam Journee.

DESCRIPTION:
- 
Journee is a website designed and developed by Ronja Ströberg, Sophia Vilhelmsson och Hannah Karlsson. 
The purpose of Journee is to help users/travellers find inspiration on where to travel to next and explore new potential dream destinations.
On Journee we have gathered the most popular destinations in Europe and Asia in one place. 
With Journee we wanted to create a minimalistic and aesthetically pleasing website that invites and inspire our users. 
We wanted to challenge ourselves in the design and the features, to create something we had not done before.

FEATURES:
- 
- Fetching real time Weather Data from OpenMeteo API, so that the users can know the current temperature in all capital cities.
- Responsive design, working well from desktop all the way down to mobile screen sizes.
- Fetching all the data about the continents and the destinations through JSON-files, making it easy to continue to developing the website if wanted, adding even more continentss for the users of Journee to explore.
- Like-features allowing the users to like their favorite destinations and save them to go back to look at later. The like feature also includes local storage, making sure the saved destinations are still there when wanted.
- A form on the contact page where users can contact us if they want. The form includes form validation, making sure the users know how to fill it out correctly. 

PROJECT STRUCTURE:
-
Through the development of Journee, we have worked with GitHub and multiple branches. We have one production branch where the final version of the website is distributed. Additionally we have one main branch which is the live version of the code and from the main branch we have created multiple feature branches and bug fix branches to keep the structure nice and clear. Every once in a while when a new feature is done and works as we would like it we have merged these branches back to main, making sure the main branch always has a working version of the website.

USAGE GUIDELINES:
-
To ensure the best experience, please follow these guidelines:

For Users:

Explore Destinations: Browse popular countries in Europe and Asia. Each destination includes current weather data and inspiring visuals helping user make the best decisions on where to travel to next.

Save Favorites: Use the like feature to mark your favorite destinations. These are stored in a local storage, meaning they will remain there next time you open the Journee website.

Responsive Experience: Journee is fully responsive and works across all screen sizes—from desktops to mobile devices.

Contact Us: Fill out the contact form if you wish to reach out to us. We use form validation to help guide you so that you do not miss anything.

For Developers:

All destination and continent data is managed through JSON files to load all data in a accessible way.

Multiple JS files are used to ensure a clear code, each file named after which page it are attached to. The main.js file is javascript code for destination and scroll-destination pages and HTML/CSS files.

Real-time weather data is fetched from the OpenMeteo API.

To contribute or build upon this project, follow the project structure:

The production branch holds the finalized version of the website.

The main branch holds the live version of the website.

All new features and bug fixes are developed in dedicated branches created from the main branch.
