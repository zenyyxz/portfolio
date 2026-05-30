# Modern Full-Stack Portfolio

A professional, responsive portfolio website built with **Next.js 14**, featuring a comprehensive admin panel for real-time content management.

## Features

- **Dynamic Public Portfolio**:
    - Animated Hero section with 2D/3D character support.
    - Categorized Projects showcase with folder-style navigation.
    - Interactive Skills and Experience timelines.
    - SEO optimized with Open Graph and Twitter card support.
    - Dark-themed glassmorphism design.
- **Robust Admin Panel**:
    - Secure authentication via NextAuth.js.
    - Full CRUD operations for Projects, Skills, and Experience.
    - Settings management for brand identity and social links.
    - Real-time updates via file-based JSON storage.

## Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: File-based JSON storage (No SQL/NoSQL setup required)

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zennyxz/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Copy `.env.example` to `.env.local` and fill in the required values:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

### Environment Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `NEXTAUTH_URL` | The base URL of your application | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | A random string for session encryption | `(required)` |
| `ADMIN_USERNAME` | Initial admin username (optional override) | `admin` |
| `ADMIN_PASSWORD` | Initial admin password (optional override) | `admin123` |

### Admin Access
The default credentials for the first run are:
- **Username**: `admin`
- **Password**: `admin123`
- **Login URL**: `/admin/login`

*Note: Change these immediately after your first login via the Admin Panel settings.*

## Project Structure

```
├── app/                # Next.js App Router (Pages & API)
├── components/         # React components
├── data/               # JSON storage for portfolio content
├── lib/                # Shared utilities & Auth config
├── public/             # Static assets (images, 3D models)
└── .env.example        # Environment variable template
```

## Deployment

This project is optimized for deployment on a Linux VPS using PM2 and Nginx.

1. **Build the application**:
   ```bash
   npm run build
   ```
2. **Start with PM2**:
   ```bash
   pm2 start npm --name "portfolio" -- start
   ```
3. **Configure Nginx**: Proxy requests to `http://localhost:3000`.

## Customization

- **3D Models**: Add `.gltf` or `.glb` models to `public/models/` to enable 3D hero characters.
- **Theme**: Modify `tailwind.config.ts` to adjust the color palette.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
