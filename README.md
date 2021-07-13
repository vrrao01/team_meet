<p align="center"><a href = "https://team-meet.netlify.app/"> <img src="https://team-meet.netlify.app/static/media/Logo.19626df0.svg" alt="Logo" width="200" ></a></p>

## Brief

<a href="https://team-meet.netlify.app/">Team meeT</a> is a Microsoft Teams clone webapp that allows users to have video calls and group chats. This project was created as a part of Microsoft Engage Mentorship 2021. 
### Project Deployment 
This project is deployed on <a href="https://team-meet.netlify.app/">https://team-meet.netlify.app/</a>

### Project Documentation
Details on the project design, components and agile sprints can be found <a href="https://drive.google.com/file/d/13q8OEGOZdKAyCCXZ1rwMP9NCEYepUPC7/view?usp=sharing">here</a>

## Features

1. User Authentication using Email and Password
2. Google Sign In
3. Create group chats
4. Video call with screenshare and raise hand
5. Post poll questions during video calls and download results.
6. Take down meeting notes during video calls
7. Continue group chats during video call
8. Admins can mute all participants and remove participants
9. Download attendance list as CSV

## Techstack used

1. ReactJS
2. Bootstrap
3. Jitsi Meet
4. ChatEngine
5. Firebase

## Agile Methodology

To uphold the "Be Agile" spirit of Engage 2021, this project was build in a series of agile sprints:

- The first week was spent on desiging the website and enlisting possible features to include. Research was done on the available options. Throughout the first and second sprints, time was devoted to learning ReactJS.
- Simple prototypes were made using OpenVidu, WebRTC and Jitsi Meet. Jitsi Meet external API was chosen due to easy integration and ability to handle large number of participants with lesser load on browser. A **Kanban style project board** was created on GitHub for the repository. The project board kept track of **Todo, In Progress and Completed** tasks during the sprints.
- The third week was spent on extending the Jitsi Meet prototype to include other features. Chat Engine was integrated into the app, Firebase was used for authentication and storage and UI of the app was improved. A new feature call **Polls** was added into the video call component. This feature allows admins to post a poll question and download a CSV file with the participants' answers.
- The fourth week involved incorporating the chat feature into the video call component. Previously, Jitsi Meet chat was used during video calls. This was changed to the group chat to allow users to continue group conversations. A new feature called **Meeting Notes** was incorporated. This feature allows all participants to take down notes during a meeting using a rich text-editor.

### CI/CD

**Continuous Integration** was done using GitHub actions. A NodeJS CI workflow was set up to ensure all pull requests build correctly. Furthermore, 5 additional checks were done by the Netlify bot to ensure that new code deploys correctly.

**Continuous Deployment** was ensured by setting the main branch of the repository as a the production branch on Netlify. All changes during the sprints were first pushed into the development branch and then merged into the main branch after they pass the CI tests. To ensure that code wasn't inadvertently pushed into the main branch, security rules were laid out on GitHub preventing a direct push.

## Screenshots
![Login and Chat Dashboard](https://user-images.githubusercontent.com/75874394/125432582-818e433c-3f5c-446f-b730-a4ae6f68f748.gif)

![Video Call and Features](https://user-images.githubusercontent.com/75874394/125432859-61ca2289-e207-421d-98a4-41949cd7bba6.gif)

