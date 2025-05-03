# Database Migration Workflow

## Development Workflow

1. Make changes to `schema.prisma`
2. Run `npm run migrate:dev -- --name descriptive_name_of_changes`
3. Commit both schema changes and the generated migration files

## Production Deployment

1. When deploying to production, run `npm run migrate:deploy`
2. This applies pending migrations without generating new ones

## Quick Prototyping (Development Only)

For rapid iteration during development:
1. Make changes to `schema.prisma`
2. Run `npm run db:push` (skips migration history)
3. Once satisfied with the schema, create a proper migration

## Generating Prisma Client

After schema changes, regenerate the Prisma client:
`npm run generate`