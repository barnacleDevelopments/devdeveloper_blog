FROM node:lts-alpine
RUN mkdir -p /home/node/devdeveloper_blog
WORKDIR /home/node/devdeveloper_blog
COPY ./package.json /home/node/devdeveloper_blog
RUN npm install
COPY . /home/node/devdeveloper_blog
EXPOSE 5000
CMD ["npm", "run", "server"]
