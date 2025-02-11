# Ad Overlay System  

## Libraries Used  

- **Axios**: An asynchronous HTTP client library for making API requests.  

## Code Logic  

1. **Ad Refresh Polling (Replaced by WebSocket)**  
   - Runs a polling mechanism that makes an API call to the **ad-stream server** every **10 seconds** to fetch a new ad.

2. **WebSocket Connection for scalable ad delivery**  
   - Established a WebSocket connection to the **ad-stream server** to receive real-time ad updates.


3. **Ad Overlay Positioning**  
   - The position of the **ad overlay** is randomly changed every **10 seconds**.  

4. **HTML5 Fullscreen API Integration**  
   - Overrides the native **fullscreen functionality** to ensure ad overlays remain visible.  
   - Applies fullscreen mode on the **video container** and **ad overlay** together.  

5. **Ad Click Behavior**  
   - Clicking on the ad opens the **ad URL** in a **new browser tab**.  

6. **Ad Click Tracking**  
   - Tracks the **ad click** and **hover time** to send the data to the **ad-stream server**.

7. **Animation**  
   - The ad overlay uses a simple **CSS animations**.

## Installation

1. Clone the repository.
2. Install the dependencies.
3. Run the development server 'npm start'.


# Production Build with Docker

1. Build the Docker image ```docker build -t ad-overlay-system .```
2. Run the Docker container ```docker run --network ad-service-network -p 3000:3000 ad-overlay-system ```


# System Architecture

AD Overlay System is a React application that is built using **Create React App**, It is a simple application that displays an ad overlay on the screen. It receives real-time ad updates from the **ad-stream-server** through a WebSocket connection. features/ads-api branch contains the code prior to migration to WebSocket which utilizes the REST API to fetch ads, The primary reason for migration to WebSocket was to scale the ad delivery and to reduce the load on the client and reduce the frequency of ad requests.

AD Overlay system is built to override some of the native browser functionalities to ensure the ad overlay is displayed fullscreen and is not obstructed by the browser's UI. A fullscreen button is placed on the top right of the video screen to toggle the fullscreen mode.

System records certain Ad metrics like click, hover time, etc. and sends the data to the **ad-stream-server** through a POST request, which is saved in the PostgreSQL database.

ad-stream-server is a Golang application that is built using **Go-Fiber**. It is a simple application that streams ads to the **ad-overlay-system** through a WebSocket connection. It also records certain Ad metrics like click, hover time, etc. and saves the data in the PostgreSQL database.


















