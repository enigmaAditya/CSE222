# Node.js Server Practice Exercises

Use these exercises to practice creating Node.js servers using the `http` and `fs` modules.

### Exercise 1: Basic Routing
Create a server that has three routes:
- `/home`: Displays "Welcome to Home Page" in Green.
- `/about`: Displays "Welcome to About Page" in Blue.
- Any other route: Displays "404 Page Not Found" in Red.

### Exercise 2: Natural Numbers
Create a route `/numbers` that displays 10 natural numbers (1 to 10) in an unordered list (`<ul>`) when a button is clicked or when the page is loaded.

### Exercise 3: File Operations & Word Count
Create a form with a text area. When the user submits the form:
1. Save the input text into a local file named `user_data.txt`.
2. Read the file back.
3. Count the total number of words in that file and display it to the user.

### Exercise 4: Serving Local Images
Create a server that serves a local image (e.g., `logo.png`) when the user visits `/image`. Embed this image in another route `/gallery`.

### Exercise 5: JSON Data Handling
Create a local file `students.json` with an array of student objects (id, name, grade). Create a route `/students` that reads this file and displays the student names in a table.

### Exercise 6: Query Parameters
Create a route `/greet` that takes a `name` query parameter (e.g., `/greet?name=Aditya`) and displays "Hello, Aditya!" on the screen.

### Exercise 7: Basic Calculator
Create a route `/add` that takes two numbers as query parameters (e.g., `/add?a=5&b=10`) and displays the sum.

### Exercise 8: Dynamic Background
Create a route `/theme` that takes a `color` parameter and changes the body background color of the response accordingly using internal CSS.
