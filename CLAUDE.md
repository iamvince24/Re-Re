# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm start` (serves on port 3000)
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Format code**: `npm run format` (uses Prettier)

## Architecture Overview

Re-Re is a React-based note-taking application with Gantt chart visualization. The app was migrated from Create React App to Vite.

### Core Technologies
- **Frontend**: React 18 with React Router for navigation
- **State Management**: Redux with traditional store setup (not Redux Toolkit)
- **UI Framework**: Material-UI (MUI) with Joy UI components and Ant Design
- **Styling**: styled-components + Emotion
- **Backend**: Firebase (Authentication, Realtime Database, Firestore)
- **Build Tool**: Vite with React plugin

### Key Application Features
- **Two view modes**: Notebook Mode (markdown editor) and Gantt Chart Mode (timeline visualization)
- **Authentication**: Firebase Auth with Google OAuth and email/password
- **Data persistence**: Firebase Realtime Database for user notebooks and chapters
- **Markdown rendering**: react-markdown with syntax highlighting

### Project Structure
- `/src/features/notebook/` - Core notebook functionality split into two main modes:
  - `NotebookMode/` - Markdown editor interface
  - `GanttChartMode/` - Timeline/Gantt chart visualization
- `/src/store/` - Redux store with notebook and screen slice reducers
- `/src/pages/` - Main route components (Home, Login, Application)
- `/src/firebase.js` - Firebase configuration and authentication helpers

### State Management Pattern
Uses traditional Redux with:
- `notebookSlice.js` - Manages notebook data, chapters, and content
- `screenSlice.js` - Handles responsive breakpoints and screen states
- Actions defined in `action.js` for screen width handling

### Firebase Integration
- User data stored in Realtime Database under `/users/{uid}`
- New users get sample notebooks with markdown examples
- Authentication state managed in localStorage with uid/username

### Development Notes
- Vite config includes path alias `@` pointing to `/src`
- Server runs on port 3000 with HMR overlay disabled
- Uses ESBuild for JSX transformation
- No test runners currently configured (has testing-library dependencies but no test scripts)