FROM node:18

WORKDIR /usr/src/app

# wait-for-it 스크립트 추가
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# wait-for-it 스크립트를 사용하여 데이터베이스 연결 대기
# db:5432로 명시적으로 호스트와 포트를 지정
CMD ["/bin/sh", "-c", "/usr/wait-for-it.sh db:5432 --timeout=30 -- node index.js"] 