
# 🌐 ClevenStudio

> **Reliable. Scalable. Stress-free. Simple. Intuitive. Never boring.**  
> Cleven Studios makes maintaining, optimizing, and enhancing your site effortless.



## 🚀 Getting Started – Local Setup Guide

Follow these steps to run ClevenStudio locally on your machine.



### 📦 Step 1: Clone the Repository

```bash
git clone https://github.com/Urcodingbuddy/ClevenStudio.git
```
---

### 🔐 Step 2: Set Up Environment Variables

#### 🖥️ Frontend `.env`

```bash
cd ClevenStudio/apps/client
touch .env
```

Paste the following in `.env`:

```env
NEXTAUTH_SECRET="create any secret"
GOOGLE_CLIENT_ID="Get it from Google Cloud Console"
GOOGLE_CLIENT_SECRET="Get it from Google Cloud Console"
GITHUB_CLIENT_ID="Get it from GitHub Apps"
GITHUB_CLIENT_SECRET="Get it from GitHub Apps"
```


#### 🛢️ Database `.env`

```bash
cd ClevenStudio/packages/db
touch .env
```

Paste the following:

```env
DATABASE_URL="Your PostgreSQL connection string"
```

---

### 🔄 Step 3: Prisma Setup (Database Migration)

> 💡 **Note**: If Prisma is not installed, follow this [guide](https://medium.com/@yhimanshu22/prisma-installation-full-guide-a13c54ce0c00)

#### Run the following commands:

```bash
cd packages/db
bun prisma migrate dev --name init_schema
bun prisma generate
```

---

### 📚 Step 4: Install Dependencies & Run Dev Server

```bash
bun install
bun dev
```


## ✅ You're All Set!

The application should now be running locally. Open your browser and check the magic! ✨
                                                         

 ---

## 🤝 Open Source Contribution Guide

We welcome contributions from everyone! Here's how you can get started:

### 🛠️ Step-by-Step

1. **Fork the Repository**
   - Click on the `Fork` button in the top right corner of this repo.

2. **Create a New Issue**
   - Navigate to the [Issues tab](../../issues) and create a new issue describing your feature or bug fix.

3. **Clone Your Fork**
   ```bash
   git clone https://github.com/<your-username>/ClevenStudio.git
   cd ClevenStudio
   ```

4. **Create a New Branch**
   ```bash
   git checkout -b issue-<issue-number>-your-branch-name
   ```

5. **Make Your Changes**
   - Code your fix or feature.
   - Follow the project’s coding standards and structure.

6. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "fix: <brief message> (closes #<issue-number>)"
   ```

7. **Push to Your Fork**
   ```bash
   git push origin issue-<issue-number>-your-branch-name
   ```

8. **Create a Pull Request**
   - Go to your fork on GitHub and click on `Compare & Pull Request`.


> 💡 **Tips:**
> - Reference the issue number in your PR.
> - Keep pull requests focused and small.
> - Make sure your code passes all checks before requesting a review.

Thank you for helping improve ClevenStudio! 🚀

---

## 📸 Screenshots

**Landing Page Preview**:

![Landing Page](https://github.com/user-attachments/assets/8e338f85-96b3-403e-8abe-b8a769ae354f)

---

Made with ❤️ by ClevenStudio
