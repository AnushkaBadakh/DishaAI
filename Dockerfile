# ==========================================
# Stage 1: Build React frontend
# ==========================================

FROM node:24-alpine AS frontend-build

WORKDIR /app/frontend

# Copy package files first
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm ci

# Copy frontend source code
COPY frontend/ ./

# Create production build
RUN npm run build


# ==========================================
# Stage 2: Backend + Nginx
# ==========================================

FROM python:3.12-slim

WORKDIR /app


# ==========================================
# Install Python dependencies
# ==========================================

COPY backend/requirements.txt ./backend/requirements.txt

RUN pip install --no-cache-dir -r backend/requirements.txt


# ==========================================
# Copy FastAPI application
# ==========================================

COPY backend/app ./backend/app


# ==========================================
# Copy React production build
# ==========================================

COPY --from=frontend-build /app/frontend/dist ./frontend/dist


# ==========================================
# Install Nginx + Supervisor
# ==========================================

RUN apt-get update && \
    apt-get install -y nginx supervisor && \
    rm -rf /var/lib/apt/lists/*


# ==========================================
# Copy Nginx configuration
# ==========================================

COPY nginx.conf /etc/nginx/conf.d/default.conf


# ==========================================
# Copy Supervisor configuration
# ==========================================

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf


# ==========================================
# Expose application port
# ==========================================

EXPOSE 80


# ==========================================
# Start frontend + backend
# ==========================================

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]