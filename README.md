# QuickBite - Smart Recipe & Meal Planner

A lightweight web application that helps users discover and plan meals based on specific criteria such as prep time, ingredients, and dietary restrictions. Built with React and Node.js for fast, intuitive meal planning without the complexity.

## Features

- **Smart Recipe Discovery**: Find recipes by prep time, ingredients, diet, or meal type
- **Weekly Meal Planning**: Drag-and-drop interface for organizing your weekly meals
- **No Account Required**: Start using immediately without signup
- **Quick Filters**: Find "5-ingredient meals," "vegan dinners under 30 minutes," etc.
- **Recipe Sharing**: Share recipes with friends and family
- **Responsive Design**: Works perfectly on desktop and mobile
- **Curated Content**: Handpicked recipes focused on practical everyday cooking

## Tech Stack

- **Frontend**: React with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: JSON files (easily upgradeable to MongoDB/PostgreSQL)
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom components

## Quick Start

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/quick_bite.git
cd quick_bite
```

2. Install dependencies for all parts:

```bash
npm run install-deps
```

3. Start the development servers:

```bash
npm run dev
```

This will start:

- Backend server on <http://localhost:5000>
- Frontend development server on <http://localhost:3000>

### Individual Commands

Run backend only:

```bash
npm run server
```

Run frontend only:

```bash
npm run client
```

Build for production:

```bash
npm run build
```

## Testing

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:coverage
```

Run server tests only:

```bash
npm run test:server
```

Run client tests only:

```bash
npm run test:client
```

### Test Coverage

The project includes comprehensive unit tests for:

- **Backend API**: All endpoints with various scenarios and error handling
- **React Components**: Component rendering, user interactions, and state management
- **Frontend Pages**: Page navigation, data fetching, and user workflows
- **Integration**: API mocking and end-to-end user scenarios

## API Endpoints

### Recipes

- `GET /api/recipes` - Get all recipes with optional filters
- `GET /api/recipes/:id` - Get specific recipe
- `GET /api/recipes/random/:count` - Get random recipes
- `GET /api/recipes/meta/tags` - Get all available tags

### Meal Plans

- `GET /api/meal-plans` - Get all meal plans
- `POST /api/meal-plans` - Create new meal plan
- `GET /api/meal-plans/:id` - Get specific meal plan
- `PUT /api/meal-plans/:id` - Update meal plan
- `DELETE /api/meal-plans/:id` - Delete meal plan
- `POST /api/meal-plans/:id/meals` - Add recipe to meal plan
- `DELETE /api/meal-plans/:id/meals` - Remove recipe from meal plan

### Query Parameters for Recipe Search

- `search` - Search in title, description, or tags
- `maxTotalTime` - Maximum total cooking time in minutes
- `maxPrepTime` - Maximum prep time in minutes
- `diet` - Dietary filter (vegetarian, vegan, gluten-free, etc.)
- `difficulty` - Difficulty level (easy, medium, hard)
- `tags` - Meal type tags (breakfast, lunch, dinner, etc.)
- `limit` - Maximum number of results

## Project Structure

```
quick_bite/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── data/              # JSON data files
│   ├── routes/            # API routes
│   ├── index.js           # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## Development

### Adding New Recipes

Edit `server/data/recipes.json` to add new recipes. Each recipe should include:

- Basic info (title, description, prep/cook times, servings)
- Ingredients list
- Step-by-step instructions
- Tags for filtering
- Nutrition information (optional)

### Adding New Features

1. Backend: Add routes in `server/routes/`
2. Frontend: Add components in `client/src/components/` or pages in `client/src/pages/`
3. Update API calls in React components

### Customizing Styles

- Global styles: `client/src/index.css`
- Tailwind config: `client/tailwind.config.js`
- Component styles: Use Tailwind classes directly

## Deployment

### Production Build

```bash
npm run build
```

### Deployment Options

- **Render**: Deploy full-stack app with build command `npm run build` and start command `npm start`
- **Railway**: Connect GitHub repo for automatic deployments
- **Heroku**: Use Node.js buildpack with custom start script

### Environment Variables

Set `NODE_ENV=production` for production deployments.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Future Enhancements

- [ ] User accounts and saved meal plans
- [ ] Recipe ratings and reviews
- [ ] Grocery list generation
- [ ] Nutritional analysis
- [ ] Integration with grocery delivery services
- [ ] Recipe scaling for different serving sizes
- [ ] Kitchen timer integration
- [ ] Recipe collections and favorites

## Support

If you encounter any issues or have questions:

1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

---

**QuickBite** - Making meal planning simple and cooking accessible for everyone! 🍽️
