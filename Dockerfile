FROM node:16-alpine

WORKDIR /app

VOLUME [ "/app" ]

CMD [ "./scripts/dev.sh" ]