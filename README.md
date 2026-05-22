# Pleny Task 1

This is my submission for the first part of the task provided by Pleny.

## Task:

### 1. Restaurant Management:

- Create Restaurant API Allow users to create a new restaurant with details such as:
  - Restaurant Name (Arabic and English Names)
  - Restaurant Unique-Name (slug of the restaurant)
  - Restaurant Cuisines (Fried, Asian, Burgers, etc). Each restaurant can have between 1 to 3 cuisines.
- List Restaurants API List all restaurants and ability to filter by cuisine.
- Get Restaurant Details API Retrieve specific restaurant details by ID or unique-name (slug).
- Find Nearby Restaurants API Find nearby restaurants within a 1KM radius via MongoDB GeoSpatial Queries.

### 2. User Interaction:

- User Schema Define a User Schema with details such as:
  - User Full Name
  - User Favorite Cuisines.
- User-Restaurant Relationship Schema Define a Schema for Users following Restaurants:
  - Each restaurant can have many users as followers
  - Each user can follow many restaurants.
- Restaurant Recommendations API Develop an API that takes a User Id as an input and implement the following logic:
  - Step 1 - Find other users who share the same Favorite cuisine as the user Id in the input.
  - Step 2 - Retrieve the aggregated list of restaurants that are followed by those users (from step 1).
  - Step 3 - Respond with the list of users from Step 1 and the list of restaurants from Step 2.
  - Use MongoDB DataPipeline Aggregation to implement the above 3 steps

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Rahaf-H-007/pleny-task.git
cd pleny-task
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create `.env` file in root directory:

```env
# Database
MONGO_URL=mongodb://localhost:27017/pleny-task
```

### 4. Start Development Server

```bash
npm start
```

<div align="center">

**🎉 Server running at `http://localhost:3000`**

**📚 API Documentation: `http://localhost:3000/swagger`**

</div>

---

**NOTE: NestJS runs on Express by default, so this requirement is already satisfied without any extra configuration.**
