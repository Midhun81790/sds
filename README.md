# Smart Doubt Solver

Smart Doubt Solver is a MERN application that helps students ask doubts, automatically receive tag suggestions, and instantly discover similar previously answered questions. It checks every PRoU bonus box: multi-track submission, secure authentication, advanced UI interactions, deployments (Netlify + Render + MongoDB Atlas), and creative analytics.

## ✨ Features
- **JWT Authentication** — secure signup/login, protected routes, and role-aware access.
- **Smart Tagging** — lightweight NLP extracts keywords and predicts appropriate tags automatically.
- **Similarity Suggestions** — cosine similarity surfaces the top three matching doubts to reduce duplicates.
- **Full Discussion Flow** — ask, browse, reply, upvote, and filter doubts by tags or keyword search.
- **Analytics Dashboard** — Recharts visualizes doubt volume per tag for evaluators.
- **Deployment Ready** — frontend (Netlify/Vercel), backend (Render/Railway), database (MongoDB Atlas).

## 🧱 Project Structure
```
Smart-Doubt-Solver/
├── backend/  # Express API, NLP helpers
└── frontend/ # React SPA, Auth context, UI components
```

## 🔐 Environment Variables
Create `.env` files from the provided samples.

`backend/.env`
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=super_secure_string
```

`frontend/.env`
```
REACT_APP_API_BASE_URL=http://localhost:5000
```

## 🚀 Quick Start
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```
Visit `http://localhost:3000` and keep the backend at `http://localhost:5000`.

## 🔗 Link Backend + Frontend
Prefer a single origin (for example on Render/Railway)? Build the React app once and let the Express API serve it:
```bash
cd frontend
npm run build

cd ../backend
# ensure REACT_APP_API_BASE_URL points to the same origin (e.g., https://your-api-url)
npm run dev # or your production start command
```
When `frontend/build` exists, the backend automatically serves those static files, so visiting the backend URL will render the React pages while API routes (`/auth`, `/doubts`, `/replies`) keep functioning.

## 📡 API Overview
### Authentication
| Method | Endpoint      | Description |
| ------ | ------------- | ----------- |
| POST   | `/auth/signup`| Create user |
| POST   | `/auth/login` | Login user  |

### Doubts
| Method | Endpoint               | Description |
| ------ | ---------------------- | ----------- |
| GET    | `/doubts`              | List doubts (search & tag filters) |
| POST   | `/doubts`              | Create a doubt (auto-tag + similarity) |
| GET    | `/doubts/:id`          | Doubt detail + replies |
| GET    | `/doubts/:id/similar`  | Similar doubts snapshot |
| POST   | `/doubts/:id/upvote`   | Increment upvotes |

### Replies
| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | `/replies/:doubtId`| List replies     |
| POST   | `/replies/:doubtId`| Add reply (auth) |

## 🧠 Bonus Coverage
| Bonus requirement            | Status  | Notes |
| ---------------------------- | ------- | ----- |
| Multi-track submission       | ✅       | UI + API + Full-stack |
| Deployment (Netlify/Render/Atlas)| ✅ | Config ready |
| Authentication               | ✅       | JWT auth + protected routes |
| Advanced UI                  | ✅       | Tag chips, skeletons, search, similarity panel |
| Creative UX/Data Viz         | ✅       | Auto tags, similar doubts, analytics charts |

## 📸 Suggested Screenshots
1. Login & Signup panels
2. Ask Doubt form (auto tags + similar panel)
3. Doubt listing with search & tag filters
4. Doubt detail + replies
5. Analytics dashboard (Recharts)

## 🧪 Helpful Scripts
| Location | Command        | Description |
| -------- | -------------- | ----------- |
| backend  | `npm run dev`  | Start Express server with Nodemon |
| backend  | `npm run lint` | Quick syntax check |
| frontend | `npm start`    | React dev server |
| frontend | `npm run build`| Production build |

## 🌐 Deployment Pointers
- **Frontend:** Deploy `frontend/build` to Netlify/Vercel.
- **Backend:** Push backend to Render/Railway, set `MONGO_URI` & `JWT_SECRET` env vars.
- **Database:** MongoDB Atlas cluster shared between envs.

Once deployed, document URLs in the README + submission email. Add short Loom or video demo walking through the five bonus points for extra polish.
