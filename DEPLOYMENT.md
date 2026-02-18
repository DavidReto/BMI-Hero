# Production & Deployment Guide

## Pre-Deployment Checklist

- [ ] All dependencies installed (`npm install`)
- [ ] Database configured and migrations run
- [ ] Environment variables set correctly
- [ ] Code tested locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors or warnings

---

## Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

---

## Environment Variables

### Development (.env.local)

```
DATABASE_URL="postgresql://user:password@localhost:5432/bmi_hero_db"
```

### Production

Ensure you set the `DATABASE_URL` environment variable in your production environment (e.g., Vercel, Heroku, AWS).

---

## Deployment Platforms

### Vercel (Recommended)

Easiest deployment for Next.js applications:

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy (automatic on push to main)

### Heroku

1. Create PostgreSQL database addon
2. Set DATABASE_URL environment variable
3. Deploy using Git or GitHub automation

### Self-Hosted (Linux Server)

1. Install Node.js and PostgreSQL
2. Clone repository
3. Install dependencies: `npm install`
4. Generate Prisma: `npm run prisma:generate`
5. Run migrations: `npm run prisma:migrate`
6. Build: `npm run build`
7. Start with PM2 or systemd: `npm start`

---

## Performance Optimization

### Current

- ✅ Next.js with App Router (modern, optimized)
- ✅ Prisma ORM with automated query optimization
- ✅ CSS modules for smaller bundle size

### Future Improvements

- [ ] Add caching layer (Redis)
- [ ] Implement image optimization
- [ ] Add CDN for static assets
- [ ] Database query optimization
- [ ] API rate limiting

---

## Security Notes

### Current Implementation

- ✅ Framework-level protections (Next.js)
- ✅ Input validation on API routes
- ✅ Environment variables for sensitive data

### Recommendations for Production

- [ ] Add authentication (NextAuth.js or similar)
- [ ] Implement HTTPS (automatic with Vercel/Heroku)
- [ ] Add API middleware for rate limiting
- [ ] Regular dependency updates
- [ ] Input sanitization
- [ ] CORS configuration
- [ ] Database connection pooling

---

## Scaling Considerations

As user base grows:

1. **Database**
    - Use connection pooling (PgBouncer)
    - Add database read replicas
    - Implement caching strategy

2. **API**
    - Add API gateway/load balancer
    - Implement request caching
    - Use CDN for static content

3. **Infrastructure**
    - Horizontal scaling options
    - Database backup strategy
    - Monitoring and logging

---

## Monitoring & Logging

### Recommended Tools

- Sentry (error tracking)
- LogRocket (session replay)
- DataDog or New Relic (performance monitoring)
- Grafana (metrics visualization)

---

## Database Maintenance

### Regular Tasks

```bash
# Backup database
pg_dump database_name > backup.sql

# Restore from backup
psql database_name < backup.sql

# View database in Prisma Studio
npm run prisma:studio

# Create new migration after schema changes
npm run prisma:migrate -- --name description
```

---

## Troubleshooting Production Issues

### High CPU Usage

- Check slow queries with Prisma insights
- Optimize database indexes
- Review API response sizes

### Out of Memory

- Check for memory leaks with profiler
- Implement pagination for large datasets
- Add connection pooling

### Database Connection Issues

- Verify DATABASE_URL is correct
- Check firewall rules
- Monitor connection pool usage
- Check database uptime

---

## Version Management

Keep dependencies updated:

```bash
npm outdated              # Check for updates
npm update               # Update minor/patch versions
npm audit                # Check for vulnerabilities
npm audit fix            # Fix security issues

# For Next.js
npm update next react react-dom

# For Prisma
npm update @prisma/client prisma
```

---

## Rollback Procedure

If deployment goes wrong:

1. Previous working build is available in git history
2. Revert to last working commit:
    ```bash
    git revert <commit-hash>
    ```
3. Redeploy

---

## Support & Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Node.js Docs](https://nodejs.org/docs/)
