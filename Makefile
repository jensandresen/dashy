NAME=dashy
PLATFORM=linux/amd64

.PHONY: build
build: BUILDER=$(NAME)-builder
build:
	-docker buildx create --name $(BUILDER)
	docker buildx build --platform $(PLATFORM) --builder $(BUILDER) -t $(NAME) . --load
	docker buildx rm $(BUILDER)

deliver:
	echo "docker push $(NAME)"

cd: PLATFORM=linux/arm/7
cd: build deliver

az:
	az --version

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