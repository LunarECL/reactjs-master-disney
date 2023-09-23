# Disney Characters App

## Description

The Disney Characters App provides a fun and engaging way for users to browse and discover their favorite Disney characters. The main page allows users to view characters with endless scrolling and search functionality. Clicking on a character navigates to a detailed page, presenting more information about the character and showcasing the films they are related to.

## Features

1. **Home Page**:

   - Display a list of Disney characters.
   - Provides infinite scrolling. As users scroll, more characters are loaded automatically.
   - Search functionality to filter characters by name.
   - Handles image loading errors gracefully by not showing characters with faulty images.

2. **Detail Page**:
   - Display detailed information about a particular Disney character.
   - Show the character's related films with movie posters.
   - Navigation to return back to the main page.

## Components

1. **Home**: This is the main page of the app. It presents a list of characters that users can scroll through. As users reach the bottom of the page, more characters are loaded automatically. The component also provides a search functionality, allowing users to filter characters by name.

2. **DetailPage**: Upon selecting a character from the Home page, users are navigated to this component which showcases detailed information about the selected character, including the films they are related to.

## Dependencies

- **react-query**: Used for asynchronous data fetching and caching.
- **styled-components**: For styling React components.
- **react-router-dom**: For routing and navigation.
- **use-debounce**: For debouncing the search input to optimize performance.

---

Enjoy exploring your favorite Disney characters! Don't forget to share your feedback. 🌟🏰🐭
