# Tech Bash 2025 Brandeis University
## Solace: A Mental Health & Self-Discovery App

Solace is an app designed to help users break negative thought spirals, deal with grief, and embark on a journey of self-discovery. With the power of AI, Solace offers personalized conversations, mental health support, and tools for reflection. The app includes an intuitive, AI-powered chat interface and a drawing tool to encourage emotional expression and healing.

### Features:
- **AI-powered Chat**: Engage in meaningful conversations to help break negative thought patterns and process grief.
- **Self-discovery Prompts**: Thoughtful prompts designed to help users reflect and explore their identities.
- **Drawing Tool**: A canvas where users can express themselves creatively by drawing, which gets saved alongside their text entries.
- **Text Analysis**: Powered by an AI API (like Google Gemini), the app analyzes user text and provides insights on emotions, helping guide users through their journey.
- **Save Entries**: Users can save their text entries and drawings for later reflection.
- **Responsive UI/UX**: The app features a user-friendly interface with interactive elements, ensuring a smooth experience across devices.

### Requirements:
- **Node.js** (v14 or higher)
- **React** (v18 or higher)
- **Konva.js**: For the interactive drawing canvas.
- **API Key**: A valid API key for the AI service (Google Gemini or another service).
- **CSS/Styling**: Tailwind CSS or similar for modern UI/UX design.
- **html**: To give you a better understanding of the app's user interface, here's a simple HTML version of the drawing tool

### Installation:

#### Try it out as below or on the live page [here](https://vedanshishah7.github.io/tech-bash/)
1. Clone the repository:

   git clone https://github.com/VedanshiShah7/tech-bash.git
   cd solace-app

2. Install the dependencies:

   npm install

3. Set up your API key:
   - Replace the placeholder API key in the `App.js` file with your valid API key from the AI service (e.g., Google Gemini).
   - You can securely store the API key in environment variables if needed.

4. Run the development server:

   npm start

   The app will open in your browser at `http://localhost:3000`.

### How to Use:
1. **Chat with the AI**: Enter a text prompt in the chat interface. The AI will respond with insightful, supportive feedback. You can ask for different prompts as well.
2. **Express Yourself**: Use the drawing tool to create art that reflects your emotions or thoughts. The drawing will be saved along with the text for future reflection.
3. **Save Your Entries**: Click on "Save Entry" to save both your text and drawing. You can revisit your saved entries later in the app.
4. **Text Analysis**: After submitting a text entry, the app will analyze the text and give feedback based on emotional content, helping you understand and navigate your feelings.
5. **Browse Saved Entries**: View all saved entries, including text and drawings, to reflect on your progress.

### Key HCI (Human-Computer Interaction) Elements:
- **Empathy-based design**: The AI is designed to understand and respond with empathy, offering personalized support based on the user’s input.
- **Interactive and Intuitive UI**: The app includes elements like smooth chat interfaces and an interactive canvas, ensuring users can engage easily without feeling overwhelmed.
- **Accessible Design**: The design prioritizes accessibility, with clear buttons, easy-to-read text, and voice-to-text options for greater inclusivity.
- **User Control**: The user can control the flow of interaction by choosing different prompts, saving entries, and drawing freely, allowing for an empowering experience.
- **Affordances**: Each button, like "Save Entry" or "Analyze Text", is clearly labeled to make navigation straightforward for all users.

### Technologies Used:
- **React.js**: For building the user interface.
- **Konva.js**: For the drawing canvas feature.
- **Tailwind CSS**: For fast and responsive styling.
- **Axios**: For handling API requests.
- **Google Gemini API (or other AI services)**: For analyzing the text and generating feedback.

### Future Features:
- **Voice-to-Text**: Implement a voice recognition feature to allow users to speak their thoughts instead of typing them.
- **Mood Tracking**: Track user mood over time and provide feedback on emotional trends.
- **Customizable Prompts**: Let users customize the kinds of prompts they receive to better cater to their unique needs.
- **Group Support**: Introduce a community feature where users can share and support each other in their mental health journeys.

### Contributing:
We welcome contributions! Feel free to fork the repository, submit pull requests, and open issues for feature requests or bugs.
