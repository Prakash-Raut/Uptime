FROM oven/bun:1

WORKDIR /app

# Copy only server first (better caching)
COPY apps/server/package.json apps/server/bun.lockb ./

# Install deps (bun is fast, but avoids copying whole repo)
RUN bun install

# Now copy full repo
COPY . /app

# Change directory into server
WORKDIR /app/apps/server

EXPOSE 3000

CMD ["bun", "run", "start"]
