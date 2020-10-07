NAME=$(or ${CONTAINER_NAME},dashy)

.PHONY: build
build:
	docker build -t $(NAME) .

setup: build

run:
	-docker rm $(NAME)
	docker run -d \
		-p 20000:80 \
		--restart unless-stopped \
		--name $(NAME) \
		$(NAME)

teardown:
	-docker kill $(NAME)