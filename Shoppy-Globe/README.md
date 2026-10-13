
# ShoppyGlobe Studio

ShoppyGlobe Studio is a responsive React e-commerce storefront built around a warm, editorial shopping experience. The application retrieves product information from the DummyJSON Products API and lets visitors search and filter the catalogue, inspect individual products, manage a shopping bag, and complete a simulated checkout.

The interface uses a forest-green, cream, and terracotta visual palette, with responsive layouts, product imagery, subtle motion, and reusable UI components.

> **Important:** This is a front-end demonstration project. Checkout does not process payments, create a real order, or send/store the delivery details entered in the form.

## Features

- **Live product catalogue** — fetches up to 100 products from DummyJSON.
- **Product detail pages** — opens a product by its ID and shows its image, description, category, rating, price, and quantity selector.
- **Search** — filters products by title, description, category, or brand.
- **Category filtering** — narrows the catalogue by product category.
- **Sorting** — supports curated order, rating, price from low to high, and price from high to low.
- **Shopping bag** — add products, increase or decrease quantities, remove items, and clear the bag.
- **Order summary** — calculates subtotal and a demo shipping charge. Shipping is complimentary for subtotals of $75 or more.
- **Demo checkout** — validates required delivery fields and email format, shows an order confirmation, and clears the cart.
- **Client-side routing** — separate home, product detail, cart, checkout, and not-found routes.
- **Lazy-loaded pages** — route components load on demand with a loading screen fallback.
- **Loading and error states** — provides feedback while product data is loading or when a request fails.
- **Responsive interface** — custom styling for a range of screen sizes.

## Built with

| Technology | Role in the project |
| --- | --- |
| React | UI components and local component state |
| Vite | Development server and production build |
| React Router | Client-side navigation and dynamic product routes |
| Redux Toolkit | Cart and catalogue-search state |
| React Redux | Connecting React components to the Redux store |
| Lucide React | Interface icons |
| DummyJSON Products API | Sample product catalogue and product details |
| Oxlint | JavaScript/JSX linting |

## Getting started

### Prerequisites

Install a current Node.js LTS version, which includes npm. Check that both are available:

```bash
node --version
npm --version
```

### Installation

1. Download or clone this repository.
2. Open the project directory in your terminal. In the supplied project archive, the application folder is `Shoppy-Globe`.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local address printed in the terminal by Vite. It is commonly `http://localhost:5173`.

## Environment configuration

The project includes an `.env.example` file with the default product endpoint:

```env
VITE_PRODUCTS_API=https://dummyjson.com/products
```

To configure the endpoint locally, copy `.env.example` to `.env` in the application root. The app uses the same default endpoint if the variable is not set.

No API key is required for the default DummyJSON endpoint. Restart the development server after changing environment variables. Do not put private credentials in variables prefixed with `VITE_`, because these values are exposed to client-side code.

## Available scripts

Run these commands from the application directory:

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the local Vite development server |
| `npm run build` | Builds the application for production in `dist/` |
| `npm run preview` | Serves the production build locally for review |
| `npm run lint` | Runs Oxlint |

Before submitting or publishing changes, check the build and lint output:

```bash
npm run build
npm run lint
```

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Home page and product catalogue |
| `/product/:id` | Details for the product matching the URL ID |
| `/cart` | Shopping bag and order summary |
| `/checkout` | Demo delivery form and order confirmation |
| Any unmatched route | Not-found page |

## Project structure

```text
Shoppy-Globe/
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── src/
    ├── App/
    │   ├── App.jsx              # Shared layout: header, content outlet, footer
    │   ├── Router.jsx           # Routes and lazy-loaded pages
    │   └── Store.js             # Redux store configuration
    ├── Components/
    │   ├── Cart/
    │   │   └── CartItem.jsx     # Cart line item controls
    │   ├── Common/
    │   │   ├── LoadingScreen.jsx
    │   │   └── StatusPanel.jsx  # Empty, loading, and error feedback
    │   ├── Layout/
    │   │   ├── Header.jsx
    │   │   └── Footer.jsx
    │   └── Products/
    │       ├── ProductItem.jsx  # Individual product card
    │       └── ProductList.jsx  # Search, category filter, sorting, grid
    ├── Features/
    │   ├── Cart/
    │   │   └── cartSlice.js     # Cart reducers and selectors
    │   └── Search/
    │       └── searchSlice.js   # Search, category, and sort state
    ├── Hooks/
    │   └── useProducts.js       # Product fetch lifecycle hook
    ├── Pages/
    │   ├── HomePage.jsx
    │   ├── ProductDetails.jsx
    │   ├── CartPage.jsx
    │   ├── CheckoutPage.jsx
    │   └── NotFoundPage.jsx
    ├── services/
    │   └── ProductsApi.js       # Product collection and detail requests
    ├── Utilities/
    │   └── format.js            # Price and text formatting helpers
    ├── App.css                  # Application styles
    └── main.jsx                 # React entry point
```

## How it works

### Product data

`src/services/ProductsApi.js` contains the API functions for retrieving the product collection and an individual product. `src/Hooks/useProducts.js` uses React state and `useEffect` to manage loading, successful responses, errors, and request cleanup.

### Search and catalogue controls

The search slice in `src/Features/Search/searchSlice.js` stores the search query, selected category, and sorting option. `ProductList.jsx` uses these values to determine which products are displayed.

### Shopping bag

The cart slice in `src/Features/Cart/cartSlice.js` stores the cart items and their quantities. It exposes actions for adding an item, changing its quantity, removing an item, and clearing the cart. Selectors calculate the total item count and subtotal.

### Navigation

`src/App/Router.jsx` defines the main routes using React Router's `createBrowserRouter`. Page components are loaded with `React.lazy` and rendered through `Suspense` with a loading fallback.

### Checkout

The checkout form checks that the delivery fields are filled in and that the email address has a basic valid format. A successful submission displays a confirmation, clears the Redux cart, and returns to the home page. It is only a demonstration flow; it does not send the form to a server or collect payment.

## Current limitations

- Product availability depends on the DummyJSON service and an internet connection.
- Cart and search state are held in the client-side Redux store; they are not saved to a user account or database.
- Checkout is simulated and does not create a persistent order.
- There is no authentication, inventory management, or payment-provider integration.

## Potential future improvements

- Add automated tests for reducers, product loading, and key shopping flows.
- Persist carts for returning visitors.
- Connect an API/backend for accounts and order management.
- Integrate a secure payment provider if the project is extended beyond a demo.
- Add further accessibility checks and end-to-end testing.

## License

No license is currently specified. Add a `LICENSE` file if you want to define the terms under which others may use, modify, or distribute this project.

## Commits 
- Initialise React project using Vite
- Added project dependencies and configuration
- Created global CSS variables and design system
- Added the Structured Layout for the Website
- Updated the footer for my webpage
- Updated the Header component and App.jsx
- Updated the Loading Screen and Status Panel
- Added the features for the updates in the Cart
- Created product API services
- Implemented reusable useProducts custom hook
- Built product listing and product card components
- Created Redux store and search slice
- Implemented product search functionality
- Added category filters and sorting options
- Added Cart Page design
- Added CheckOut Page Functionality
- Added HomePage UI design
- Added the Not Found Page for wrong imputs
- Added the ProductDetails page design and functions
- Configured React Router with createBrowserRouter
- Imported the router functionality in the main.jsx
- Modified Html according to project requirements. Added meta tags, title, and preconnect links for performance optimization.
- Imported the ProductsApi file and updated the import statement in the ProductList component to use the correct path and corrected the import errors of some files. Also added a new file named .env.e…
- Updated the currency value and price according to products fetched by the API.
- Updated the README.md file as per the project procedures.