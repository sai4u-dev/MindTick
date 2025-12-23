**Architecture → Features → Backend → Frontend → Data Models → API Design → Auth Flow → Storage → Dev Roadmap**.

---

## 1. High-Level Architecture (MindTick)

```
Frontend (Vite + React)
 ├─ Redux Toolkit (global state)
 ├─ RTK Query (API layer)
 ├─ Tailwind CSS (UI)
 └─ Auth via HttpOnly Cookies (JWT)

Backend (Node + Express)
 ├─ Auth Service (JWT, bcrypt)
 ├─ Task Service
 ├─ User Service
 ├─ Notification Service
 ├─ Image Upload (ImageKit)
 └─ MongoDB (Mongoose)

Database
 ├─ Users
 ├─ Tasks
 ├─ Subtasks
 ├─ Comments
 ├─ Notifications
 └─ Activity Logs
```

---

## 2. Core Features (Mapped to Your UI)

### Authentication

- Login
- Signup
- Forgot password
- Reset password
- Remember me
- Secure cookies (HttpOnly)

### Dashboard

- Task statistics

  - Completed
  - Pending
  - In Progress
  - Overdue

- Charts (weekly progress, completion rate)
- Daily goal progress
- Upcoming deadlines

### Task Management

- Create / Edit / Delete tasks
- Priority (High, Medium, Low)
- Status (Pending, In Progress, Completed, Overdue)
- Due date & reminders
- Assignees (multi-user)
- Subtasks
- Activity timeline
- Comments

### Calendar

- Monthly / Weekly view
- Drag & drop tasks
- Date-based filtering

### Notifications

- Task status changes
- Mentions in comments
- Deadline reminders

### Profile

- Avatar upload (ImageKit)
- User preferences

---

## 3. Backend Folder Structure (Scalable)

```
backend/
├─ src/
│  ├─ config/
│  │  ├─ db.js
│  │  ├─ imagekit.js
│  │  └─ cors.js
│  ├─ controllers/
│  │  ├─ auth.controller.js
│  │  ├─ task.controller.js
│  │  ├─ user.controller.js
│  │  └─ notification.controller.js
│  ├─ middleware/
│  │  ├─ auth.middleware.js
│  │  ├─ error.middleware.js
│  │  └─ rateLimiter.js
│  ├─ models/
│  │  ├─ User.model.js
│  │  ├─ Task.model.js
│  │  ├─ Subtask.model.js
│  │  ├─ Comment.model.js
│  │  └─ Notification.model.js
│  ├─ routes/
│  │  ├─ auth.routes.js
│  │  ├─ task.routes.js
│  │  ├─ user.routes.js
│  │  └─ notification.routes.js
│  ├─ utils/
│  │  ├─ jwt.js
│  │  ├─ sendEmail.js
│  │  └─ dateUtils.js
│  └─ server.js
└─ .env
```

---

## 4. MongoDB Data Models (Core)

### User Model

```js
{
  name: String,
  email: { type: String, unique: true },
  password: String,
  avatar: {
    url: String,
    fileId: String
  },
  role: { type: String, default: "user" },
  createdAt: Date
}
```

### Task Model

```js
{
  title: String,
  description: String,
  status: "pending" | "in_progress" | "completed" | "overdue",
  priority: "low" | "medium" | "high",
  dueDate: Date,
  assignees: [ObjectId],
  createdBy: ObjectId,
  subtasks: [ObjectId],
  attachments: [{
    url: String,
    fileId: String
  }],
  createdAt: Date
}
```

### Subtask

```js
{
  title: String,
  isCompleted: Boolean,
  taskId: ObjectId
}
```

### Notification

```js
{
  user: ObjectId,
  message: String,
  isRead: Boolean,
  createdAt: Date
}
```

---

## 5. REST API Design

### Auth Routes

```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/profile
```

### Task Routes

```
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
PATCH  /api/tasks/:id/status
```

### Subtasks

```
POST   /api/tasks/:id/subtasks
PATCH  /api/subtasks/:id
DELETE /api/subtasks/:id
```

### Notifications

```
GET    /api/notifications
PATCH  /api/notifications/mark-read
```

---

## 6. Authentication Flow (JWT + Cookies)

1. User logs in
2. Backend:

   - Verifies password (bcrypt)
   - Signs JWT
   - Stores JWT in **HttpOnly cookie**

3. Frontend:

   - Uses `credentials: "include"` in RTK Query

4. Protected routes use `auth.middleware.js`

✅ Secure against XSS
✅ Simple refresh strategy later

---

## 7. Frontend Folder Structure (Vite + Redux Toolkit)

```
frontend/
├─ src/
│  ├─ app/
│  │  └─ store.js
│  ├─ features/
│  │  ├─ auth/
│  │  │  ├─ authSlice.js
│  │  │  └─ authApi.js
│  │  ├─ tasks/
│  │  │  ├─ taskSlice.js
│  │  │  └─ taskApi.js
│  │  ├─ notifications/
│  │  └─ calendar/
│  ├─ components/
│  │  ├─ ui/
│  │  ├─ charts/
│  │  └─ layout/
│  ├─ pages/
│  │  ├─ Login.jsx
│  │  ├─ Register.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ TaskDetails.jsx
│  │  ├─ Calendar.jsx
│  │  └─ Profile.jsx
│  ├─ hooks/
│  ├─ utils/
│  └─ main.jsx
```

---

## 8. RTK Query Example

```js
export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
```

---

## 9. ImageKit Integration (Avatars & Attachments)

- Upload from frontend → backend signed upload
- Store:

  - `url`
  - `fileId`

- Delete old images when replaced

Use cases:

- User avatar
- Task attachments

---

## 10. Development Roadmap (8 Weeks)

### Week 1

- Project setup (frontend + backend)
- Auth system
- User model

### Week 2

- Task CRUD
- Status & priority
- Dashboard counts

### Week 3

- Subtasks
- Comments
- Activity log

### Week 4

- Calendar integration
- Due date logic
- Overdue detection

### Week 5

- Notifications
- Real-time (optional: Socket.io)

### Week 6

- ImageKit integration
- Profile page

### Week 7

- Charts & analytics
- Performance optimizations

### Week 8

- Deployment
- Security hardening
- Documentation

---

## 11. Why MindTick Is Resume-Ready 💼

- Real-world SaaS architecture
- Secure authentication
- Clean state management
- Scalable backend
- Production UI
- API-driven design

---
