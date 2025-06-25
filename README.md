# SmartSend - Bulk Messaging SaaS Platform

SmartSend is a comprehensive bulk messaging platform that enables businesses to send SMS and email campaigns to their customers. Built with modern web technologies, it provides a complete solution for contact management, campaign creation, analytics, and more.

## Features

### 🚀 Core Functionality
- **Multi-Channel Messaging**: Send both SMS and email campaigns from a single platform
- **Contact Management**: Import, organize, and segment contacts with custom fields and tags
- **Campaign Builder**: Create, schedule, and manage messaging campaigns
- **Template System**: Pre-built and custom templates for quick campaign creation
- **Real-time Analytics**: Track delivery rates, opens, clicks, and conversions
- **List Management**: Organize contacts into targeted lists for precise messaging

### 🔧 Technical Features
- **User Authentication**: Secure login and registration system
- **Multi-tenant Architecture**: Organization-based user management
- **Role-based Access Control**: Admin, Manager, and User roles
- **API Integration**: RESTful API for external integrations
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live campaign status and analytics

### 📊 Analytics & Reporting
- Campaign performance metrics
- Delivery and engagement tracking
- Contact interaction history
- Custom reporting capabilities

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **React Hook Form** with Zod validation
- **Lucide React** for icons
- **Recharts** for data visualization
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express (planned)
- **Prisma ORM** with PostgreSQL
- **JWT Authentication**
- **RESTful API architecture**

### Database Schema
- **Users & Organizations**: Multi-tenant user management
- **Contacts & Lists**: Flexible contact organization
- **Campaigns & Messages**: Campaign management and tracking
- **Templates**: Reusable message templates
- **Analytics**: Comprehensive tracking and reporting
- **API Keys**: Secure API access management

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smartsend-saas
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Update .env with your database and API configurations
   ```

4. **Set up the backend** (when implemented)
   ```bash
   npm run server:setup
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run server:dev` - Start backend development server
- `npm run server:setup` - Set up backend dependencies and database

## Project Structure

```
smartsend-saas/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   └── layout/         # Layout components
│   ├── pages/              # Page components
│   ├── store/              # Redux store and slices
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── server/                 # Backend application
│   ├── prisma/            # Database schema and migrations
│   └── src/               # Server source code
└── public/                # Static assets
```

## Database Schema

The application uses a comprehensive PostgreSQL schema with the following main entities:

- **Organizations**: Multi-tenant organization management
- **Users**: User accounts with role-based access
- **Contacts**: Customer contact information with custom fields
- **Contact Lists**: Organized contact groupings
- **Campaigns**: SMS and email campaign management
- **Messages**: Individual message tracking
- **Templates**: Reusable message templates
- **Analytics**: Campaign performance data
- **API Keys**: Secure API access management

## Current Status

### ✅ Completed
- Frontend application structure
- Authentication UI (Login/Register forms)
- Landing page with full marketing content
- Database schema design
- Redux store setup
- Routing configuration
- Responsive design implementation

### 🚧 In Progress
- Backend API implementation
- Database integration
- Authentication system
- Core messaging functionality

### 📋 Planned Features
- SMS/Email sending integration
- Payment processing
- Advanced analytics dashboard
- API documentation
- Automated testing suite
- Deployment configuration

## Environment Variables

```env
# Frontend Configuration
VITE_API_URL=http://localhost:3001/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend Configuration (when implemented)
DATABASE_URL=postgresql://username:password@localhost:5432/smartsend
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SMS_API_KEY=your_sms_api_key
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact [support@smartsend.com](mailto:support@smartsend.com)