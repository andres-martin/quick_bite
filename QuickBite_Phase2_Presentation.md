# QuickBite - Smart Recipe & Meal Planner

## Phase 2 Presentation

---

## Slide 1: Title Slide

# QuickBite - Smart Recipe & Meal Planner

**A lightweight web application for discovering and planning meals**

**GitHub Repository:** <https://github.com/andres-martin/quick_bite>

**Phase 2 Deliverable**
*July 2025*

---

## Slide 2: Purpose of the Web Application

### **Problem Statement**

- Meal planning is time-consuming and overwhelming
- Users struggle to find recipes that match their specific criteria
- Existing apps are too complex or require lengthy signups

### **Solution: QuickBite**

- **Smart Recipe Discovery**: Find recipes by prep time, ingredients, diet, or meal type
- **Quick Filters**: "5-ingredient meals," "vegan dinners under 30 minutes"
- **Weekly Meal Planning**: Intuitive drag-and-drop interface
- **No Account Required**: Start using immediately
- **Mobile-First Design**: Works perfectly on all devices

---

## Slide 3: Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT TIER                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   React SPA     │  │  Tailwind CSS   │  │ Lucide Icons │ │
│  │   (Port 3000)   │  │   Styling       │  │   Library    │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                               │
                        HTTP/REST API
                               │
┌─────────────────────────────────────────────────────────────┐
│                       SERVER TIER                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Express.js    │  │     Morgan      │  │    Helmet    │ │
│  │   (Port 5000)   │  │   Logging       │  │   Security   │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                               │
                        File System I/O
                               │
┌─────────────────────────────────────────────────────────────┐
│                        DATA TIER                            │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │   recipes.json  │  │ meal-plans.json │                  │
│  │   (Recipe Data) │  │ (User Plans)    │                  │
│  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 4: Technology Stack Overview

### **Frontend Technologies**

- **React 18.2**: Component-based UI framework
- **React Router DOM 6.8**: Client-side routing
- **Tailwind CSS 3.3**: Utility-first styling framework
- **Lucide React**: Modern icon library
- **React Testing Library**: Component testing

### **Backend Technologies**

- **Node.js**: JavaScript runtime environment
- **Express.js 4.18**: Web application framework
- **Morgan**: HTTP request logger middleware
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing

### **Development & Testing**

- **Jest**: Testing framework
- **Supertest**: HTTP assertions for API testing
- **Nodemon**: Development server auto-restart
- **Concurrently**: Run multiple npm scripts

---

## Slide 5: Application Screenshots - Home Page

### **Home Page Features**

![Home Page Screenshot - Replace with actual screenshot]

**Key Elements:**

- Clean, modern navigation header
- Hero section with clear value proposition
- Quick action buttons for "Find Recipes" and "Plan Meals"
- Featured recipe cards with prep time, difficulty, and dietary tags
- Responsive grid layout that adapts to screen size
- Search functionality prominently displayed

---

## Slide 6: Application Screenshots - Recipe Search

### **Smart Recipe Discovery**

![Recipe Search Screenshot - Replace with actual screenshot]

**Advanced Filtering:**

- Search by ingredients, recipe name, or tags
- Filter by prep time (5, 15, 30+ minutes)
- Dietary restrictions (vegan, vegetarian, gluten-free)
- Difficulty level (easy, medium, hard)
- Meal type (breakfast, lunch, dinner, snack)
- Real-time search results with instant feedback

---

## Slide 7: Application Screenshots - Recipe Detail

### **Detailed Recipe View**

![Recipe Detail Screenshot - Replace with actual screenshot]

**Comprehensive Information:**

- High-quality recipe image
- Prep time, cook time, and total time
- Serving size and difficulty level
- Complete ingredients list with measurements
- Step-by-step cooking instructions
- Nutritional information and dietary tags
- "Add to Meal Plan" functionality

---

## Slide 8: Application Screenshots - Meal Planner

### **Weekly Meal Planning Interface**

![Meal Planner Screenshot - Replace with actual screenshot]

**Interactive Features:**

- Weekly calendar view (Monday-Sunday)
- Drag-and-drop recipe assignment
- Meal type organization (breakfast, lunch, dinner)
- Quick recipe preview cards
- Save and load meal plans
- Export grocery list functionality

---

## Slide 9: API Endpoints & Data Flow

### **RESTful API Design**

**Recipe Endpoints:**

- `GET /api/recipes` - Get all recipes with filters
- `GET /api/recipes/:id` - Get specific recipe
- `GET /api/recipes/random/:count` - Get random recipes
- `GET /api/recipes/meta/tags` - Get available tags

**Meal Plan Endpoints:**

- `GET /api/meal-plans` - Get all meal plans
- `POST /api/meal-plans` - Create new meal plan
- `PUT /api/meal-plans/:id` - Update meal plan
- `DELETE /api/meal-plans/:id` - Delete meal plan

**Query Parameters:**
`search`, `maxTotalTime`, `maxPrepTime`, `diet`, `difficulty`, `tags`, `limit`

---

## Slide 10: Changes from Initial Proposal

### **What Changed and Why**

| **Original Proposal** | **Final Implementation** | **Reason for Change** |
|----------------------|--------------------------|----------------------|
| MongoDB Database | JSON File Storage | Simplified deployment, no external dependencies |
| User Authentication | No Account Required | Faster user onboarding, reduced complexity |
| Recipe Ratings/Reviews | Curated Recipe Content | Focus on quality over quantity |
| Shopping Cart Integration | Export Grocery List | MVP approach, external integration complexity |
| Real-time Collaboration | Individual Meal Plans | Scope management for Phase 2 |

### **Key Benefits of Changes:**

- ✅ **Faster Development**: No database setup or auth implementation
- ✅ **Easier Deployment**: Self-contained application
- ✅ **Better UX**: Immediate access without signup friction
- ✅ **Maintainable**: Simpler architecture, easier testing

---

## Slide 11: Testing & Quality Assurance

### **Comprehensive Test Coverage**

**Backend Testing (38 tests):**

- API endpoint functionality
- Error handling and edge cases
- Data validation and filtering
- CRUD operations for meal plans

**Frontend Testing (40 tests):**

- Component rendering
- User interaction flows
- Routing and navigation
- Mock API integration

**Total: 78 Tests - 100% Passing**

### **Quality Metrics:**

- ✅ Jest testing framework
- ✅ React Testing Library best practices
- ✅ Supertest for API testing
- ✅ Continuous integration ready

---

## Presentation Notes

### **For Slide Conversion:**

1. Use the markdown content above to create PowerPoint/Google Slides
2. Replace screenshot placeholders with actual application screenshots
3. Use the architecture diagram as a visual aid
4. Consider adding animations for the technology stack slide
5. Include demo videos if presenting live

### **Key Talking Points:**

- Emphasize the practical problem-solving approach
- Highlight the technology choices rationale
- Demonstrate the clean, intuitive user interface
- Explain the strategic simplifications made for Phase 2
- Showcase the comprehensive testing strategy

### **Demo Preparation:**

- Have the application running locally
- Prepare sample searches and meal planning scenarios
- Show mobile responsiveness
- Demonstrate the API endpoints using browser dev tools
