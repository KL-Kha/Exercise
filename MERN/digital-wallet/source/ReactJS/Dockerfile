FROM node as build
RUN mkdir /ui
WORKDIR /ui
COPY package.json /ui/package.json
RUN yarn
COPY . /ui
RUN yarn build

FROM nginx:1.13.12-alpine
COPY --from=build /ui/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]