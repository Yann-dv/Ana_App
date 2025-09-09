# Ana Fitness App 💪

A comprehensive fitness application built with modern web technologies, offering personalized workout programs, live classes, and progress tracking.

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure registration and login system
- **Subscription Management**: Three-tier subscription model (Free, Standard, Premium)
- **Video Streaming**: High-quality workout video playback with progress tracking
- **Live Classes**: Real-time fitness classes with scheduling
- **Progress Tracking**: Comprehensive user progress monitoring and analytics
- **Mobile-First Design**: Responsive design optimized for all devices
- **PWA Support**: Progressive Web App capabilities for mobile installation

### User Experience
- **Personalized Dashboard**: Customized content based on user preferences and subscription
- **Program Catalog**: Extensive library of fitness programs with filtering and search
- **Achievement System**: Gamified progress tracking with achievements and scoring
- **Video Controls**: Advanced video player with playback controls and quality settings
- **Subscription Badges**: Visual indicators for content access levels

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **Animations**: Framer Motion for smooth UI transitions
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Context API for global state

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Main dashboard page
│   ├── login/              # Authentication pages
│   ├── register/           # User registration
│   ├── programs/           # Program catalog and details
│   ├── progress/           # User progress tracking
│   └── subscription/       # Subscription management
├── components/             # Reusable UI components
│   ├── layout/             # Layout components
│   ├── sections/           # Page sections
│   └── ui/                 # Base UI components
├── contexts/               # React Context providers
│   ├── AuthContext.tsx    # Authentication state
│   ├── SubscriptionContext.tsx # Subscription management
│   ├── VideoContext.tsx   # Video playback state
│   └── ProgressContext.tsx # User progress tracking
├── types/                  # TypeScript type definitions
│   ├── auth.ts            # Authentication types
│   └── program.ts          # Program and video types
└── lib/                    # Utility functions
```

## 🔧 Core Systems

### Authentication System
The app uses a context-based authentication system with JWT tokens:

- **AuthContext**: Manages user state, login, registration, and logout
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Token Management**: Secure token storage and validation
- **User Profiles**: Comprehensive user data management

### Subscription Management
Three-tier subscription model with content access control:

- **Free Tier**: Basic access to limited content
- **Standard Tier**: Access to most programs and features
- **Premium Tier**: Full access to all content including live classes
- **Dynamic Content Filtering**: Content visibility based on subscription level
- **Upgrade/Downgrade**: Seamless subscription tier changes

### Video System
Advanced video management with progress tracking:

- **Video Context**: Centralized video state management
- **Progress Tracking**: Automatic save of watch time and completion status
- **Quality Control**: Multiple video quality options
- **Playback Controls**: Full-featured video player with custom controls
- **Resume Functionality**: Continue watching from last position

### Progress Tracking
Comprehensive user progress monitoring:

- **Video Completion**: Track completed videos and watch time
- **Program Progress**: Overall progress through fitness programs
- **Achievement System**: Unlock achievements based on milestones
- **Statistics**: Detailed analytics and progress visualization
- **Goal Setting**: Personal fitness goals and tracking

## 📱 Progressive Web App (PWA)

The app includes PWA capabilities for enhanced mobile experience:

- **Service Worker**: Offline functionality and caching
- **App Manifest**: Native app-like installation
- **Responsive Design**: Optimized for all screen sizes
- **Touch Gestures**: Mobile-friendly interactions
- **Push Notifications**: Engagement and reminder notifications

## 🎨 UI/UX Design

### Design System
- **Color Palette**: Modern gradient-based color scheme
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: Reusable component library
- **Animations**: Smooth transitions and micro-interactions

### Responsive Design
- **Mobile-First**: Designed primarily for mobile devices
- **Breakpoints**: Tailwind's responsive breakpoint system
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive layouts
- **Touch-Friendly**: Optimized touch targets and gestures

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ana_App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📦 Dependencies

### Core Dependencies
- `next`: React framework with App Router
- `react`: UI library
- `typescript`: Type safety
- `tailwindcss`: Utility-first CSS framework
- `framer-motion`: Animation library
- `lucide-react`: Icon library

### Development Dependencies
- `@types/*`: TypeScript type definitions
- `eslint`: Code linting
- `postcss`: CSS processing
- `autoprefixer`: CSS vendor prefixing

## 🔐 Security Features

- **Input Validation**: Client-side form validation
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Cross-site request forgery prevention
- **Secure Headers**: Security-focused HTTP headers
- **Token Security**: Secure JWT token handling

## 📊 Performance Optimizations

- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized images
- **Lazy Loading**: Components and routes loaded on demand
- **Caching**: Efficient caching strategies
- **Bundle Analysis**: Optimized bundle sizes

## 🧪 Testing

The application includes comprehensive testing setup:

- **Unit Tests**: Component and utility function testing
- **Integration Tests**: Feature workflow testing
- **E2E Tests**: End-to-end user journey testing
- **Type Checking**: TypeScript compilation validation

## 🚀 Deployment

The app is optimized for deployment on various platforms:

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Static site deployment
- **Docker**: Containerized deployment
- **Traditional Hosting**: Standard web server deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for fitness enthusiasts everywhere!**