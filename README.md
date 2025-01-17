# Picsart Masonry

## What is the application about

Picsart Masonry is a photo gallery application that displays a list of photos in a masonry layout. The application allows users to view photo details by clicking on individual photos. The photo list is implemented using a virtualized component to efficiently render a large number of photos. We use the [Pexels API](https://www.pexels.com/api/) to fetch the photo list and photo details. To run the application locally, you will need an API key from Pexels. Refer to the "How to run locally" section for more details.

## PhotoList Implementation

The `PhotoList` component is implemented using a masonry virtualized component. This approach ensures that only the visible photos are rendered, improving performance and reducing memory usage.


## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **React Router**: A library for routing in React applications.
- **Vite**: A fast build tool and development server for modern web projects.
- **Jest**: For running unit tests
- **Yarn**: Used for dependency management.

## How to Run Locally

1. **Clone the repository:**
    ```sh
    git clone https://github.com/pragyaPS/picsart-masonry
    cd picsart-masonry
    ```

2. **Install dependencies:**
    ```sh
    yarn install
    ```

3. **Get a Pexels API key:**
    - Sign up at [Pexels API](https://www.pexels.com/api/) and get your API key.

3. **Create a .env file in the root of your project and add your Pexels API key**
    ```sh
    VITE_PEXELS_API_KEY=YOUR_KEY_HERE
    ```

4. **Run the development server:**
    ```sh
    yarn dev
    ```

5. **Open the application in your browser. The port may vary and is visible in terminal on server start:**
    ```
    http://localhost:${port}
    ```

## Future Enhancements

- **React Query for Data Fetching:**
  - Implement React Query to manage server state and data fetching.

- **Test Cases:**
  - Add unit tests and integration tests to ensure the reliability of the application.

- **Search Feature in the List Page:**
  - Implement a search feature to allow users to search for photos in the list.

- **Scroll Maintenance on Page Switch:**
  - Maintain the scroll position when switching between the list and details pages.

- **Avoid Recalculation on Page Switch:**
  - Optimize the application to avoid unnecessary recalculations when switching between pages.

- **TypeScript Aliases:**
  - Use TypeScript path aliases to simplify imports and improve code readability.

## Demo
Demo recording to demonstrate infinite scrolling with list virtualisation and resizing.  Please note that the demo URL will open in the same tab, so you will need to use the browser's back button to return to the project repository.
https://github.com/user-attachments/assets/e9a2570a-5898-4367-aa0f-819b2d3e09fb

