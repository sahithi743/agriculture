# 🌾 AgroMarket - Smart Agriculture Marketplace

A comprehensive React + Vite web application connecting farmers directly with buyers for fresh agricultural products. Built with a beautiful green theme reflecting sustainability and nature.

## ✨ Features

### For Farmers (Sellers)
- **Product Management**: Add, edit, and manage your agricultural products
- **Inventory Tracking**: Monitor stock levels in real-time
- **Order Management**: View and process incoming orders
- **Earnings Dashboard**: Track your revenue and sales history
- **Farm Profile**: Showcase your farm details, certifications, and farming methods
- **Direct Messaging**: Communicate with buyers for special requests
- **Price Analytics**: AI-powered price suggestions based on market trends
- **Crop Recommendations**: Seasonal crop recommendations for optimal yield

### For Buyers
- **Product Browsing**: Browse thousands of fresh products from local farms
- **Advanced Filters**: Filter by category, price range, location, and rating
- **Product Details**: View detailed information including harvest date and farmer details
- **Shopping Cart**: Easy-to-use shopping cart with quantity adjustments
- **Order Tracking**: Real-time tracking of your orders from farm to doorstep
- **Ratings & Reviews**: Rate products and farmers, read reviews from other buyers
- **Direct Chat**: Communicate with farmers for bulk orders or special requests
- **Order History**: Access your complete order history and receipts

### For Admins
- **User Management**: Manage farmers, buyers, and platform users
- **Seller Approval**: Verify and approve new farmer accounts
- **Transaction Monitoring**: Monitor all transactions on the platform
- **Analytics Dashboard**: View platform statistics and growth metrics
- **Report Handling**: Address user complaints and disputes
- **Content Moderation**: Review and manage user-generated content

## 🎨 Design Features

- **Green Theme**: Beautiful green color palette (#16a34a primary) reflecting agriculture and sustainability
- **Responsive Design**: Mobile-first approach, fully responsive on all devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Accessibility**: ARIA labels and semantic HTML for better accessibility
- **Performance**: Fast loading with optimized images and lazy loading

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: CSS3 with CSS Variables
- **HTTP Client**: Axios
- **State Management**: React Context API & Local Storage
- **Authentication**: JWT-based authentication

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header with user menu
│   ├── Header.css          # Header styles
│   └── ProtectedRoute.jsx  # Route protection wrapper
├── context/
│   └── AuthContext.jsx     # Authentication context
├── pages/
│   ├── Home.jsx            # Landing page with features
│   ├── Marketplace.jsx     # Product browsing & search
│   ├── ProductDetail.jsx   # Individual product page
│   ├── AddProduct.jsx      # Farmer product upload
│   ├── Cart.jsx            # Shopping cart
│   ├── Orders.jsx          # Order tracking
│   ├── Reviews.jsx         # Product reviews & ratings
│   ├── Messaging.jsx       # Buyer-Farmer chat
│   ├── Profile.jsx         # User profile management
│   ├── Login.jsx           # Login page
│   ├── Register.jsx        # Registration & role selection
│   ├── FarmerDashboard.jsx # Farmer control panel
│   ├── BuyerDashboard.jsx  # Buyer overview
│   └── AdminDashboard.jsx  # Admin panel
├── utils/
│   └── api.js              # API utility functions
├── App.jsx                 # Main app component
├── main.jsx                # React entry point
├── index.css               # Global styles & design tokens
└── index.html              # HTML template
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd agromarket
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file with your backend API URL:
```
VITE_API_BASE_URL=http://localhost:3000/api
```

4. Start the development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

## 📱 Key Pages

### Home Page
- Beautiful landing page showcasing features
- Call-to-action buttons for registration and browsing
- Feature highlights and benefits
- How-to steps for buyers and farmers
- Platform statistics

### Marketplace
- Browse all available products
- Filter by category, price range, and rating
- Search functionality with instant results
- Sort options (latest, price, rating)
- Quick product preview cards

### Product Detail
- Complete product information
- Farmer profile and ratings
- Available quantity and harvest date
- Customer reviews and ratings
- Add to cart functionality
- Direct messaging option

### User Dashboards
- **Farmer Dashboard**: Product management, order tracking, earnings
- **Buyer Dashboard**: Recent orders, saved items, order history
- **Admin Dashboard**: User management, analytics, transaction monitoring

### Shopping & Orders
- Add/remove items from cart
- View order summary with tax calculation
- Order tracking with real-time status updates
- Order history with receipts

### Reviews System
- Rate and review products
- View average ratings and distributions
- Respond to reviews (farmers)
- Farmer responses visible to buyers

## 🔐 Authentication

The app uses JWT-based authentication with roles:
- **Farmer**: Can sell products
- **Buyer**: Can purchase products
- **Admin**: Platform management

Tokens are stored in localStorage and sent with all API requests.

## 🎯 Color Palette

```css
Primary Green: #16a34a
Dark Green: #15803d
Light Green: #22c55e
Light Green BG: #dcfce7
Very Light BG: #f0fdf4
```

## 📊 Features by Role

### Farmer
- Add/Edit Products ✓
- Manage Orders ✓
- Track Earnings ✓
- Chat with Buyers ✓
- Upload Farm Details ✓
- View Ratings ✓

### Buyer
- Browse Products ✓
- Search & Filter ✓
- Add to Cart ✓
- Checkout ✓
- Track Orders ✓
- Rate & Review ✓
- Chat with Farmers ✓

### Admin
- Manage Users ✓
- Approve Sellers ✓
- Monitor Transactions ✓
- View Analytics ✓
- Handle Reports ✓

## 🔌 API Integration

The app connects to a backend API with the following endpoints:

**Products**
- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `POST /products` - Add new product (Farmer)
- `PUT /products/:id` - Update product (Farmer)

**Orders**
- `GET /orders` - Get user orders
- `POST /orders` - Create order
- `GET /orders/:id` - Get order details

**Reviews**
- `GET /products/:id/reviews` - Get product reviews
- `POST /products/:id/reviews` - Submit review

**Users**
- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `GET /profile` - Get user profile
- `PUT /profile` - Update profile

## 🌐 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All pages are fully responsive and mobile-optimized.

## 🎨 Customization

### Colors
Edit the CSS variables in `src/index.css`:
```css
:root {
  --primary: #16a34a;
  --primary-dark: #15803d;
  /* ... other colors */
}
```

### Typography
Default fonts are system fonts for optimal performance. Modify in `src/index.css` to add custom fonts.

## 📝 Environmental Variables

```
VITE_API_BASE_URL    - Backend API base URL (default: http://localhost:3000/api)
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙋 Support

For support, email support@agromarket.com or open an issue on the repository.

## 🚢 Deployment

### Build for Production
```bash
pnpm build
```

### Preview Production Build
```bash
pnpm preview
```

Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

---

**Made with 🌱 for sustainable agriculture and direct farmer-consumer connections**
