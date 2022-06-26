npm exec prisma generate
echo "Waiting for postgres to start"
sleep 5
npm exec prisma migrate dev
npm run dev