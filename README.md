# Project Documentation

<br></br>
## 🏃‍♂️ **How to Run the Buyer App**

1. Open the **command line** (CMD).
2. Run the following commands:
   ```bash
   cd apps/buyer
   npm install
   npm run dev
   ```

<br></br>
## 🚀 **Deploy**

**Next.js Buyer App Deployment**

- Local: [localhost:3000](http://localhost:3000)   => Vercel: [buyer-deal.vercel.app](https://buyer-deal.vercel.app)

**Spring Boot Backend Deployment**

- Local: [localhost:8080](http://localhost:8080)   => Ngrok: [cheetah-dear-mutt.ngrok-free.app](https://cheetah-dear-mutt.ngrok-free.app)

<br></br>
## ⛓️‍💥 **Ngrok**

**Ngrok** is a tool that creates a secure tunnel from a public endpoint to your local machine, which is great for exposing your locally running services for external testing or APIs.

- **Public Domain:** `https://cheetah-dear-mutt.ngrok-free.app/api/v1/`

#### **Common Ngrok Commands:**

1. Start Ngrok with a configuration file: `ngrok start --config=ngrok.yml backend`

2. Start Ngrok with the port 8080: `http 8080`

3. Get the address of ngrok.yml: `ngrok config check`

<br></br>
## 🚀 **Project keys**

1. TODO

2. NOTE

3. REFERENCED

4. EXP (EXPLAIN)

<br></br>
## 🧠 **Git Management & Commit Rules**

### ✅ **Commit Message Format**

Use the following format for all commit messages: `<type>([scope]): <message>`


- **`type`**: Required. Describes the purpose of the change.
- **`scope`**: Optional. A specific area/module affected.
- **`message`**: Short description of the change.
- For BREAKING CHANGES, append `!` to the type.
- For WIP, use chore(wip): temp commit and squash before merging.
- Example:
   - `feature: log in, sign up, Google`
   - `config: global Redux store`
   - `refactor!: apply DDD and CQRS`
- **✍️ Tips:** Keep your commit messages short and meaningful.


### 🌿 **Branch Naming Convention**

Branches should follow the format: `<type>/<scope>`


- Examples:
  - `feature/auth-login`
  - `fix/cart-total`
  - `refactor/user-flow`
  - `docs/readme-update`



### 🧩 **Common Commit Types**

| **Type**    | **Purpose**                                                        |
|-------------|--------------------------------------------------------------------|
| `feature`      | A new feature                                                      |
| `fix`       | A bug fix                                                          |
| `docs`      | Documentation changes                                              |
| `style`     | Code style changes (formatting, spacing – no logic change)        |
| `refactor`  | Refactor code (no features, no fixes)                             |
| `test`      | Add or improve tests                                               |
| `chore`     | Maintenance (e.g. update deps, cleanups — no src/test changes)     |
| `perf`      | Performance improvements                                           |
| `build`     | Build system or external dependency updates                        |
| `ci`        | CI/CD configuration and automation updates                         |



### 🔧 **Common Git Commands**

| **Action**                                | **Command**                                                     | **Note**                                                                 |
|-------------------------------------------|------------------------------------------------------------------|--------------------------------------------------------------------------|
| Add a new remote                          | `git remote add origin <url>`                                    | Liên kết repo local với remote lần đầu                                  |
| Change the remote URL                     | `git remote set-url origin <new-url>`                            | Thay đổi repo remote                                                     |
| Check current status                      | `git status`                                                     | Xem các file đã thay đổi hoặc staged                                     |
| Stage all changes                         | `git add .`                                                      | Dùng `.` để add toàn bộ, hoặc chỉ định file                             |
| Commit staged changes                     | `git commit -m "message"`                                        | Ghi lại các thay đổi đã stage                                            |
| Amend last commit (chưa push)            | `git commit --amend`                                             | Dùng để chỉnh sửa message hoặc thêm file trước khi push                 |
| Push to remote and set upstream           | `git push -u origin <branch>`                                    | Lần đầu push nhánh lên remote                                            |
| Push changes (sau khi upstream đã set)    | `git push`                                                       | Lần 2 trở đi không cần chỉ định `origin <branch>` nữa                   |
| Pull latest changes                       | `git pull`                                                       | Kéo về những thay đổi từ remote                                          |
| Merge another branch                      | `git merge <branch>`                                             | Merge `branch` vào nhánh hiện tại                                        |
| Rebase and squash commits                 | `git rebase -i <base-commit>` → chọn `squash`                    | Gộp nhiều commit thành một (dùng trong cleanup)                         |
| Rebase and edit commit messages           | `git rebase -i <base-commit>` → chọn `reword`                    | Đổi nội dung commit mà không thay đổi thứ tự                            |
| Delete local branch (có cảnh báo merge)   | `git branch -d <branch>`                                         | Sẽ báo lỗi nếu branch chưa được merge                                   |
| Delete local branch (bỏ qua cảnh báo)     | `git branch -D <branch>`                                         | Xóa luôn không cần merge                                                |
| Delete remote branch                      | `git push origin --delete <branch>`                              | Xóa nhánh trên GitHub/GitLab/etc                                        |


<br></br>
## 🎮 **Shortcuts for VSCode and IntelliJ IDEA**

| **Action**                           | **VSCode**             | **IntelliJ IDEA**      |
|--------------------------------------|------------------------|------------------------|
| **Clear Redundant Imports**          | `Shift + Alt + O`      | `Ctrl + Alt + O`       |
| **Format Code**                      | `Ctrl + S`             | `Ctrl + Alt + L`       |
| **Review README file**               | `Ctrl + Shift + V`     |                        |
| **Find and Replace**                 | `Ctrl + Shift + F`     | `Ctrl + Shift + F / R` |
| **Open File**                         | `Ctrl + P`             | `Ctrl + Shift + N`     |
| **Rename & Refactor**                | `F2`                   | `Shift + F6`           |
| **Window Icon**                      | `Window + .`           |                        |


<br></br>
## 🧩 **Phase 1: Identity ** (Date 5/14)

### ✅ **Tóm tắt các tính năng đã hoàn thành**

### 🔐 **1. Đăng nhập / Đăng ký**

- **Hỗ trợ đầy đủ:** Đăng nhập và Đăng ký bằng `Password` và `Google`.
- **Luồng thông minh:** Kiểm tra username tồn tại → phân nhánh `login` / `signup` tự động.
- **UI thân thiện:** Dùng Shadcn Form, UX rõ ràng cho cả 2 luồng.

### 🔁 **2. Token Provider chuẩn chỉnh**

- **TokenGate (server):** Kiểm tra `isAuthenticated` ở `Layout` → bảo vệ route server.
- **TokenRestorer (client):** Tự động gọi `refresh token` nếu hết hạn.
- **TokenAutoRefresher:** Interval định kỳ để chủ động refresh (tránh giật UI).
- **Middleware:** Redirect hợp lý giữa `public` / `private` route.
- **Luồng xác thực:** Tự động, mượt, không lộ `flicker`.

### 🚪 **3. Logout**

- Gọi API `/logout`.
- Clear toàn bộ: `Redux`, `Cookie`, `LocalStorage`.
- `router.refresh()` hoặc `router.push()` tùy theo context hiện tại.

### 🧠 **4. Shared Auth State**

| **Layer**        | **Lưu trữ gì**                             | **Mục đích**                               |
|------------------|--------------------------------------------|--------------------------------------------|
| **Redux**        | `accessToken`, `currentUser`               | Dùng toàn app (UI, logic client).          |
| **Cookies**      | `accessToken` (persist)                    | Sync với server (SSR, middleware, API).    |
| **LocalStorage** | `refreshToken`, `currentUser` (nếu cần)    | Giữ an toàn phía client, hỗ trợ fallback.  |

### 🔒 **5. Gọi API an toàn**

- `clientFetch` vs `serverFetch`: Tách rõ 2 context gọi API.
- Tự động retry khi accessToken hết hạn → fallback sang `TokenRestorer`.
- Backend hỗ trợ decorator và interface tiện lợi:
  - `@AuthUser`, `ICookieProvider`, `IOauth2Provider`, ...

### 📐 **6. Backend DDD chuẩn chỉnh**

| **Layer**      | **Vai trò chính**                                                     |
|----------------|------------------------------------------------------------------------|
| `controller`   | Chỉ nhận request → gọi service → trả response                          |
| `application`  | Tập trung xử lý logic (validate, dùng repo, trả kết quả)              |
| `domain`       | Nơi đặt Entity, Rule, Aggregate                                       |
| `infra`        | Giao tiếp DB, OAuth, JWT, Cookie, v.v                                 |

- Dùng `IAuthAppService`, `QueryService`, `BeanEnv`, rõ trách nhiệm.
- **Không vi phạm DDD:** `Controller` KHÔNG gọi trực tiếp `Repository`.

### 🚀 **Bạn đã đạt được:**

- Nền tảng xác thực vững chắc, production-ready.
- Sync logic rõ ràng giữa `server` và `client`.
- Dễ dàng mở rộng cho buyer, seller, admin sau này.
- Tái sử dụng logic giữa nhiều tầng (UI/API/Service).
- Tích hợp tốt với hệ thống backend (`cookie`, `token`, `session`).

### 🟢 **Gợi ý tiếp theo (nếu muốn build tiếp):**

| **Mục tiêu**                            | **Ý nghĩa / Lợi ích**                                         |
|----------------------------------------|---------------------------------------------------------------|
| 👥 Phân quyền (buyer, admin, etc.)     | Phân tách UI, quyền truy cập                                  |
| 🧾 Quản lý session đa thiết bị         | Hiện thông tin + logout thủ công các thiết bị khác            |
| 🔐 2FA / Email Verification            | Bảo mật nâng cao + verify email                               |
| 🗂️ Soft logout (token blacklist)       | Làm mượt trải nghiệm logout (không cần xoá token client)      |
| 🔎 Audit log                           | Ghi nhận ai đăng nhập, từ đâu, thời điểm nào                  |


<br></br>
## 🐞 **Faced Bugs and Issues**

| **Issue**                                                        | **Explanation**                                                                 |
|------------------------------------------------------------------|---------------------------------------------------------------------------------|
| **Client component calling server component**                   | ❌ Not allowed. Keep in mind the flow from server to client.                    |
| **Client component calling server action**                      | ✅ Allowed only in Next.js forms.                                                |
| **Defining a server action in a server action**                  | ❌ Not allowed.                                                                 |
| **Next server component vs. server action**                     | Dynamic UI on server vs Handling logic on server; no directive vs `use server`. |
| **Unused variable when building**                                | ❌ Configure ESLint to avoid this.                                              |
| **Transparent vs. Transition in CSS**                            | Transparent: Opacity; Transition: Smooth effect.                                |
| **CSS Border vs. Ring vs. Outline**                              | Border: Inside the element; Ring: Outside; Outline: On top of the box.         |
| **Repository and form data in #Postman**                         | ❓ Refer to Postman for API requests or testing forms.                         |

<br></br>
## ⚠️ **Advises**

| **Advice**                                           | **Explanation**                                                                 |
|------------------------------------------------------|---------------------------------------------------------------------------------|
| **GET requests should not have a body**              | Technically, GET requests should not send data in the body. Use query params.   |
| **Postman: POST should use raw**                     | POST should use raw, instead of form-data                                       |
| **Nullish coalescing operator**                      | ??                                       |


