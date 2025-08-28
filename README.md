# youbloom - Multi-Country Authentication System

A modern, responsive React application featuring multi-country phone authentication, user management, and API integration. Built as a technical interview demonstration showcasing React best practices, clean architecture, and comprehensive testing.

## 🌟 Features

### 🔐 Authentication System
- **Multi-Country Support**: 20+ country codes (US, UK, India, Germany, etc.)
- **Phone Number Validation**: Country-specific format validation
- **User Registration**: Complete signup flow with form validation
- **Persistent Sessions**: localStorage-based authentication state
- **Demo Accounts**: Pre-configured test accounts for different countries

### 📱 User Interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Clean, professional interface design
- **Real-time Feedback**: Loading states and error handling
- **Accessible**: WCAG compliant components

### 🌐 API Integration
- **JSONPlaceholder API**: Real data fetching for users and posts
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Smooth user experience during API calls

### 🔍 Search & Navigation
- **Real-time Search**: Dynamic filtering by name, email, company
- **Protected Routes**: Secure navigation with authentication guards
- **Deep Linking**: Direct access to user detail pages

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
│   └── ProtectedRoute.js
├── context/            # Global state management
│   └── AuthContext.js
├── pages/              # Main application pages
│   ├── LoginPage/
│   │   └── LoginPage.js
│   ├── RegisterPage/
│   │   └── RegisterPage.js
│   ├── MainPage/
│   │   └── MainPage.js
│   └── DetailPage/
│       └── DetailPage.js
├── services/           # API and external services
│   └── fetchData.js
├── __tests__/         # Test files
│   └── DetailPage.test.js
├── App.js             # Main application component
└── index.js           # Application entry point
```

### Tech Stack
- **Frontend Framework**: React 
- **Routing**: React Router DOM 
- **Styling**: Tailwind CSS 
- **State Management**: React Context API + Hooks
- **HTTP Client**: Axios
- **Testing**: Jest + React Testing Library
- **Build Tool**: Create React App / Vite




## 🧪 Testing

The application includes comprehensive test coverage using Jest and React Testing Library.

### Test Structure
```
__tests__/
└── DetailPage.test.js      # User detail page tests 


## 🔒 Security Considerations

### Authentication
- Phone number validation with country-specific rules
- Session persistence using localStorage
- Protected routes with authentication guards
- Input sanitization and validation

### Data Privacy
- No sensitive data stored in localStorage
- Client-side only authentication (demo purposes)
- Form validation prevents XSS attacks

### Best Practices
- Error boundaries for graceful error handling
- Loading states prevent UI freezing
- Responsive design ensures accessibility
- Clean code architecture for maintainability

## 🚀 Deployment


#### Vercel

vercel --prod
```

### Development Guidelines
- Follow React best practices
- Write tests for new features
- Use TypeScript for type safety (if applicable)
- Follow the existing code style
- Update documentation for new features

## 📋 Requirements Met

### Technical Interview Criteria ✅
- [x] **React + Hooks**: Functional components with useState, useEffect, useContext
- [x] **State Management**: React Context API for global state
- [x] **API Integration**: JSONPlaceholder REST API
- [x] **Responsive UI**: Tailwind CSS with mobile-first design
- [x] **Phone Validation**: Multi-country phone number validation
- [x] **Search Functionality**: Real-time user filtering
- [x] **Navigation**: React Router with protected routes
- [x] **Testing**: Jest + React Testing Library
- [x] **Clean Architecture**: Modular file structure
- [x] **Error Handling**: Comprehensive error states
- [x] **Loading States**: User feedback during API calls

### Bonus Features ⭐
- [x] **Multi-Country Support**: 20+ country codes
- [x] **User Registration**: Complete signup flow
- [x] **Professional UI**: Modern, clean design
- [x] **Comprehensive Testing**: High test coverage
- [x] **Documentation**: Professional README
- [x] **TypeScript Ready**: Easy migration path


## 👨‍💻 Author

**kareem khamis**
- GitHub: [@karim-99-99](https://github.com/karim-99-99)
- LinkedIn: [Karim Khamis](https://www.linkedin.com/in/kareem-khamis-software-engineering6/)
- Email: kareemkhamis2030@gmail.com.com


---

**⭐ If you found this project helpful, please give it a star!**