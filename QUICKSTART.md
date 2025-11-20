# Quick Start Guide

Get Code Journal up and running in 5 minutes!

## ✅ Prerequisites Check

You have:
- ✅ Node.js v22.18.0 (required: v20+)
- ✅ Docker installed
- ✅ Project cloned

## 🚀 Start the Application

### 1. Install Dependencies

```bash
# From project root
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

**Status:** ✅ Done!

### 2. Start the Database

```bash
# From project root
npm run db:up
```

**Status:** ✅ Done! (PostgreSQL is running)

### 3. Run Database Migrations

```bash
npm run migrate:up
```

**Status:** ✅ Done! (entries table created)

### 4. Start the Development Servers

```bash
# From project root
npm run dev
```

This will start:
- **Backend API** on `http://localhost:3000`
- **Frontend** on `http://localhost:5173`

### 5. Open in Browser

Navigate to: **http://localhost:5173**

You should see the Code Journal home page!

## 🎯 First Steps in the Application

1. **Create Your First Entry**
   - Click "New Entry" button
   - Add a title (e.g., "My First Entry")
   - Add some content
   - Click "Save Entry" or press `Ctrl+Enter` (Cmd+Enter on Mac)

2. **View Your Entry**
   - You'll be redirected to the entry detail page
   - See your entry with timestamp

3. **Edit Your Entry**
   - Click "Edit Entry" button
   - Make changes
   - Click "Save Changes"

4. **Delete an Entry**
   - Click "Delete Entry" button
   - Confirm deletion

## 🔧 Troubleshooting

### Database Not Starting?

```bash
# Check Docker
docker ps

# If not running, start it
npm run db:up

# Check logs
docker logs codejournal-db
```

### Port Already in Use?

```bash
# Find and kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or find and kill process on port 5173
lsof -i :5173
kill -9 <PID>
```

### Migration Issues?

```bash
# Reset database (WARNING: deletes all data)
npm run db:reset

# Then run migrations again
npm run migrate:up
```

## 📚 Next Steps

- Read the full [README.md](README.md)
- Review [Product Requirements](docs/PRD.md)
- Check [User Stories](docs/USER_STORIES.md)
- Explore [Technical Design](docs/TDD.md)

## 🛑 Stopping the Application

### Stop Development Servers
Press `Ctrl+C` in the terminal running `npm run dev`

### Stop Database
```bash
npm run db:down
```

### Stop and Remove All Data (Reset)
```bash
npm run db:reset
```

## 💡 Useful Commands

```bash
# View database
docker exec -it codejournal-db psql -U codejournal -d codejournal_dev

# Check API health
curl http://localhost:3000/health

# Run tests
npm test

# Check code quality
npm run lint
```

## 🎉 You're Ready!

The application is fully set up and ready for development. Happy coding!

---

**Need Help?** Check the [README.md](README.md) for detailed documentation.
