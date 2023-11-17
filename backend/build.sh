docker build -t herds -f Dockerfile .
docker run -p 9990:9990 -p 8080:8080 -d herds
