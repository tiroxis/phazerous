FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN  npm install --production --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

#FROM node:18-alpine AS runner
FROM mariadb:11.0 AS runner

WORKDIR /app

ENV MARIADB_ROOT_PASSWORD=password

RUN apt-get update
#RUN apt-get install curl -y
#RUN curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

#RUN mkdir /run/mysqld
#RUN chmod -R 777 ./
#RUN apt-get update
##RUN apt-get install default-mysql-server default-mysql-client -y
#RUN apt-get autoremove && apt autoclean
#RUN apt-get clean packages



#ENV "MYSQL_ROOT_PASSWORD=phazerous" \
#     "MYSQL_DATABASE=phazerous" \
#     "MYSQL_USER=phazerous" \
#     "MYSQL_PASSWORD=phazerous"
#RUN apk add mariadb-client mariadb
#RUN mkdir /run/mysqld
#RUN mkdir ./data
#RUN ls -la /run/mysqld
#RUN mysqld -u root --datadir=./data #&> /dev/null &
#RUN ls -la /run/mysqld
RUN mariadb -u root -p password -h localhost -e "SELECT VERSION();"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN addgroup nextjs mysql


#RUN chown -R nextjs /run/mysqld
#RUN mkdir ./data
#RUN chown -R nextjs ./

#RUN mysql_install_db
# RUN chmod -R ./ 777
#VOLUME data
#VOLUME /run/mysqld/

#
# RUN /usr/bin/mariadbd-safe --datadir='./data' &> /dev/null &
#RUN mysql_upgrade -uphazerous root -pphazerous
# RUN /etc/init.d/mysql start
#RUN mysqld -u root --port=3306 --datadir=./data &> /dev/null &
#RUN mysql -u root -h localhost -e "SELECT VERSION();"
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs


#RUN mysql_install_db

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
